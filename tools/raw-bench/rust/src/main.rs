use std::{hint::black_box, time::Instant};

fn bench(engine: &str, bytes: &[u8]) -> Result<serde_json::Value, String> {
    let start = Instant::now();
    if engine == "rawler" {
        let source = rawler::rawsource::RawSource::new_from_slice(bytes);
        let raw = rawler::decode(&source, &Default::default())
            .map_err(|e| format!("sensor decode: {e}"))?;
        let decode_ms = start.elapsed().as_secs_f64() * 1000.0;
        let rgb = rawler::imgop::develop::RawDevelop::default()
            .develop_intermediate(&raw)
            .map_err(|e| format!("develop: {e}"))?
            .to_dynamic_image()
            .ok_or("no RGB output")?;
        black_box(&rgb);
        Ok(
            serde_json::json!({"decode_ms": decode_ms, "total_ms": start.elapsed().as_secs_f64()*1000.0,
            "width": rgb.width(), "height": rgb.height(), "output": "default developed RGB"}),
        )
    } else {
        let raw = lightcraft_raw::decode(bytes).map_err(|e| format!("sensor decode: {e}"))?;
        let decode_ms = start.elapsed().as_secs_f64() * 1000.0;
        let rgb = raw
            .develop(lightcraft_raw::Method::Ahd)
            .map_err(|e| format!("develop: {e}"))?;
        black_box(&rgb);
        Ok(
            serde_json::json!({"decode_ms": decode_ms, "total_ms": start.elapsed().as_secs_f64()*1000.0,
            "width": rgb.width, "height": rgb.height, "output": "camera RGB, no white balance or display transform"}),
        )
    }
}

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let bytes = std::fs::read(&args[2]).expect("read sample");
    // One process per trial: failures and panics cannot stop the remaining corpus.
    let result = std::panic::catch_unwind(|| bench(&args[1], &bytes));
    let mut report = match result {
        Ok(Ok(v)) => serde_json::json!({"status": "ok", "measurement": v}),
        Ok(Err(e)) => serde_json::json!({"status": "error", "error": e}),
        Err(_) => serde_json::json!({"status": "panic"}),
    };
    if report["status"] != "ok" {
        let preview = std::panic::catch_unwind(|| {
            if args[1] == "lightcraft" {
                lightcraft_raw::embedded_preview(&bytes).is_some()
            } else {
                let source = rawler::rawsource::RawSource::new_from_slice(&bytes);
                rawler::get_decoder(&source)
                    .ok()
                    .and_then(|decoder| {
                        decoder
                            .full_image(&source, &Default::default())
                            .ok()
                            .flatten()
                    })
                    .is_some()
            }
        });
        report["embedded_preview_available"] = serde_json::json!(preview.unwrap_or(false));
    }
    println!("{report}");
}
