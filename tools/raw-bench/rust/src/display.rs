//! Persistent RAW-to-display worker. One input line, one fresh decode, one output line.
use image::{
    DynamicImage, RgbaImage,
    imageops::{self, FilterType},
};
use serde_json::{Value, json};
use std::{
    hint::black_box,
    io::{self, BufRead, Write},
    sync::Arc,
    time::Instant,
};

fn orient(image: DynamicImage, code: u16) -> DynamicImage {
    match code {
        2 => image.fliph(),
        3 => image.rotate180(),
        4 => image.flipv(),
        5 => image.rotate90().fliph(),
        6 => image.rotate90(),
        7 => image.rotate270().fliph(),
        8 => image.rotate270(),
        _ => image,
    }
}

fn render(
    engine: &str,
    bytes: Vec<u8>,
    width: u32,
    height: u32,
    full_resolution: bool,
    matched_detail: bool,
) -> Result<(RgbaImage, String), String> {
    if engine == "rawler" {
        let source = rawler::rawsource::RawSource::new_from_shared_vec(Arc::new(bytes));
        let params = Default::default();
        let raw = rawler::decode(&source, &params).map_err(|e| e.to_string())?;
        let orientation = rawler::get_decoder(&source)
            .ok()
            .and_then(|decoder| decoder.raw_metadata(&source, &params).ok())
            .and_then(|m| m.exif.orientation)
            .unwrap_or(1);
        let image = rawler::imgop::develop::RawDevelop::default()
            .develop_intermediate(&raw)
            .map_err(|e| e.to_string())?
            .to_dynamic_image()
            .ok_or("no developed image")?;
        let rgba = orient(image, orientation).into_rgba8();
        let rgba = if rgba.dimensions() == (width, height) {
            rgba
        } else {
            imageops::resize(&rgba, width, height, FilterType::Lanczos3)
        };
        Ok((rgba, "CPU".into()))
    } else {
        // A full-resolution request must never select the loader's binned preview path.
        let max_edge = if full_resolution {
            usize::MAX
        } else {
            width.max(height) as usize
        };
        let (source, info) = lightcraft_engine::files::load_vec(bytes, max_edge)?;
        if !info.raw {
            return Err("preview-only: sensor data was not decoded".into());
        }
        let source = Arc::new(source);
        let mut settings =
            lightcraft_develop::DevelopSettings::for_raw(info.as_shot_temp, info.as_shot_tint);
        if matched_detail {
            settings.detail.sharpen_amount = 0.0;
            settings.detail.nr_color = 0.0;
            settings.detail.nr_luminance = 0.0;
        }
        let request = lightcraft_pipeline::RenderRequest::fit(width as usize, height as usize);
        let (rendered, backend) =
            match lightcraft_gpu::try_render(&source, &info, &settings, &request, None) {
                Ok(rendered) => (
                    rendered,
                    lightcraft_gpu::adapter_name().unwrap_or("GPU".into()),
                ),
                Err(reason) => (
                    lightcraft_pipeline::render(&source, &info, &settings, &request),
                    format!("CPU ({reason:?})"),
                ),
            };
        let image = rendered.image;
        let rgba = RgbaImage::from_raw(
            image.width as u32,
            image.height as u32,
            image.data.into_iter().flatten().collect(),
        )
        .ok_or("invalid raster")?;
        let rgba = if rgba.dimensions() == (width, height) {
            rgba
        } else {
            imageops::resize(&rgba, width, height, FilterType::Lanczos3)
        };
        Ok((rgba, backend))
    }
}

/// The same detail implementation, settings and working space for every engine.
/// Input is a completed sRGB buffer; no camera look or white-balance edit is added.
fn detail(
    bytes: Vec<u8>,
    width: u32,
    height: u32,
    request: &Value,
) -> Result<(RgbaImage, String), String> {
    let rgba = lightcraft_raster::Rgba8::from_bytes(width as usize, height as usize, &bytes)
        .ok_or("invalid detail input")?;
    let mut linear = rgba.to_linear();
    drop(rgba);
    drop(bytes);
    let matrix = lightcraft_color::REC2020
        .from_xyz()
        .mul(&lightcraft_color::SRGB.to_xyz())
        .to_f32();
    linear.map_in_place(|p| {
        std::array::from_fn(|i| matrix[i][0] * p[0] + matrix[i][1] * p[1] + matrix[i][2] * p[2])
    });
    let source = Arc::new(linear);
    let mut settings = lightcraft_develop::DevelopSettings::default();
    settings.profile.amount = 0.0;
    settings.detail.sharpen_amount = request["sharpen_amount"].as_f64().unwrap_or(40.0);
    settings.detail.nr_color = request["nr_color"].as_f64().unwrap_or(25.0);
    let mut info = lightcraft_pipeline::SourceInfo::default();
    info.native_long = request["native_long"].as_u64().map(|n| n as usize);
    let render_request = lightcraft_pipeline::RenderRequest::fit(width as usize, height as usize);
    // Refuse a fallback here: all three must use the same GPU detail backend.
    let rendered = lightcraft_gpu::try_render(&source, &info, &settings, &render_request, None)
        .map_err(|reason| format!("shared GPU detail unavailable: {reason:?}"))?;
    let image = rendered.image;
    let rgba = RgbaImage::from_raw(
        image.width as u32,
        image.height as u32,
        image.data.into_iter().flatten().collect(),
    )
    .ok_or("invalid detail output")?;
    Ok((rgba, lightcraft_gpu::adapter_name().unwrap_or("GPU".into())))
}

fn main() {
    let engine = std::env::args().nth(1).expect("engine");
    // Initialize persistent infrastructure outside every measured interval.
    rayon::ThreadPoolBuilder::new()
        .build_global()
        .expect("rayon pool");
    if engine == "lightcraft" || engine == "detail" {
        black_box(lightcraft_gpu::available());
    }
    println!("{}", json!({"ready": true}));
    io::stdout().flush().expect("flush");
    for line in io::stdin().lock().lines() {
        let request: Value = serde_json::from_str(&line.expect("stdin")).expect("request JSON");
        let path = request["path"].as_str().expect("path");
        let width = request["width"].as_u64().expect("width") as u32;
        let height = request["height"].as_u64().expect("height") as u32;
        let full_resolution = request["full_resolution"].as_bool().unwrap_or(false);
        let matched_detail = request["matched_detail"].as_bool().unwrap_or(false);
        // The bridge file is transport between languages, not part of the algorithm.
        // Its I/O is outside detail timing for all three engines, including LightCraft.
        let detail_bytes =
            (engine == "detail").then(|| std::fs::read(path).expect("read detail input"));
        let start = Instant::now();
        let output = std::panic::catch_unwind(|| {
            if let Some(bytes) = detail_bytes {
                detail(bytes, width, height, &request)
            } else {
                let bytes = std::fs::read(path).map_err(|e| e.to_string())?;
                render(
                    &engine,
                    bytes,
                    width,
                    height,
                    full_resolution,
                    matched_detail,
                )
            }
        });
        let elapsed = start.elapsed().as_secs_f64() * 1000.0;
        let result = match output {
            Ok(Ok((image, backend))) => {
                black_box(&image);
                let checksum = image
                    .as_raw()
                    .iter()
                    .fold(0u64, |sum, b| sum.wrapping_add(*b as u64));
                if let Some(path) = request["save"].as_str() {
                    std::fs::write(path, image.as_raw()).expect("save raster");
                }
                json!({"status":"ok", "total_ms":elapsed, "width":image.width(), "height":image.height(),
                    "bytes":image.as_raw().len(), "checksum":checksum, "backend":backend})
            }
            Ok(Err(error)) => json!({"status":"error", "error":error}),
            Err(_) => json!({"status":"panic"}),
        };
        println!("{result}");
        io::stdout().flush().expect("flush");
    }
}
