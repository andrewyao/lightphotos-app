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
        Ok((
            imageops::resize(&rgba, width, height, FilterType::Lanczos3),
            "CPU".into(),
        ))
    } else {
        let (source, info) = lightcraft_engine::files::load_vec(bytes, width.max(height) as usize)?;
        if !info.raw {
            return Err("preview-only: sensor data was not decoded".into());
        }
        let source = Arc::new(source);
        let settings =
            lightcraft_develop::DevelopSettings::for_raw(info.as_shot_temp, info.as_shot_tint);
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

fn main() {
    let engine = std::env::args().nth(1).expect("engine");
    // Initialize persistent infrastructure outside every measured interval.
    rayon::ThreadPoolBuilder::new()
        .build_global()
        .expect("rayon pool");
    if engine == "lightcraft" {
        black_box(lightcraft_gpu::available());
    }
    println!("{}", json!({"ready": true}));
    io::stdout().flush().expect("flush");
    for line in io::stdin().lock().lines() {
        let request: Value = serde_json::from_str(&line.expect("stdin")).expect("request JSON");
        let path = request["path"].as_str().expect("path");
        let width = request["width"].as_u64().expect("width") as u32;
        let height = request["height"].as_u64().expect("height") as u32;
        let start = Instant::now();
        let output = std::panic::catch_unwind(|| {
            let bytes = std::fs::read(path).map_err(|e| e.to_string())?;
            render(&engine, bytes, width, height)
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
