# Camera RAW support benchmark

18 SHA-256-pinned CC0 files from [raw.pixls.us](https://raw.pixls.us/), covering
Sony ARW, Canon CR2 and CR3, Nikon NEF, Fujifilm Bayer and X-Trans RAF,
Panasonic RW2, Olympus ORF, Pentax PEF, Samsung SRW and DNG variants.
The manifest reuses the sample identities in LightCraft's
`xtask/src/main.rs`. It includes multiple compression modes from the same body;
these are samples, not a count of supported cameras. The originals total about
509 MB and are ignored by git.

## Run on macOS

Place the LightPhotos and LightCraft checkouts beside this repository. Set up
LightPhotos' vendored rawler with that project's setup script first if missing.
The benchmark links its patched rawler 0.8.0 and LightCraft's `lightcraft-raw`
directly, without changing either checkout.

```sh
python3 tools/raw-bench/download.py
cargo build --release --locked --manifest-path tools/raw-bench/rust/Cargo.toml
swiftc -O -module-cache-path /private/tmp/lightphotos-raw-swift-cache tools/raw-bench/imageio.swift -o tools/raw-bench/imageio-bench
python3 tools/raw-bench/run.py --trials 5
```

`results/latest.json` retains every trial, errors, output dimensions, medians,
OS, hardware description and source commit IDs. Update the hardware description
in `run.py` for a different machine. The source working trees can contain local
changes; commit IDs alone do not identify those changes. Cargo.lock pins this
harness's dependency resolution, which can differ from either app's lockfile.

## What is measured

- Five separate processes per file and engine, sequentially. No untimed warm-up
  run. Median of successful trials; failures remain in the report. No background
  downloads or builds during measurement. Normal Rayon thread selection.
- Inputs are read before timing. Rust consumes an in-memory buffer; ImageIO uses
  a file URL after a pre-read warms the OS file cache. This matches its normal
  file API: a memory-only ImageIO source rejected Sony/Nikon samples that the
  URL source decoded. The Apple interval includes opening and reading that
  warm file. No attempt to flush OS caches or measure cold storage.
- ImageIO: primary image at full resolution, followed by a forced draw into
  sRGB RGBA8. No thumbnail API, resizing, application cache or export encoding.
- Core Image: `CIRAWFilter` from a URL, a new CIContext, full-resolution sRGB
  RGBA8 rendering and a forced draw. Requires access to macOS GPU services;
  the restricted execution sandbox refused rendering even for valid files.
  The published Core Image trials ran outside that sandbox. Unlike the app,
  this fresh-process probe does not reuse a context across photos.
- rawler: sensor decode, then default `RawDevelop` through RGB16 conversion.
  This includes white balance, calibration and sRGB gamma. The interval includes
  RawSource's buffer copy. It excludes LightPhotos' extra corrections, denoise,
  preview selection and GPU editing pipeline.
- LightCraft: sensor decode, normalization, AHD demosaic (directional for
  X-Trans), opcodes and crop into floating-point camera RGB. White balance,
  display color, tone mapping, denoise and the rest of its engine are excluded.
- Rust sensor-decode time is recorded separately from the total. It is the
  narrower comparison between these libraries. Apple does not expose that
  intermediate stage through this ImageIO call.
- Each failed Rust trial also checks whether an embedded preview can be found.
  That check is outside the measurement and never changes a failure to a pass.
  LightCraft's check finds encoded bytes; rawler's check obtains a decoded image.

**The full API totals must not be used to compare engine or app speed.**
The initial blog comparison table was removed: the Apple probe includes context
initialization per process and a CGImage-to-bitmap draw absent from the app's
direct render. It also requests full resolution rather than display-size
processing. Combined with the different output stages below, this does not
reproduce normal app latency. The original diagnostic data is retained for
inspection, not as evidence that Apple RAW is slower.

**Total times are different workloads, not a speed ranking.** A pass means the
API returned a full-size raster without an error or panic. It does not prove
pixel correctness, camera-matching color, or working RAW editing in either app.
Known app-specific limits can remain even when its underlying library passes.
The benchmark reads source images only; it does not alter them.

The blog's dated public JSON is a snapshot. Rerunning this harness does not
automatically replace that published snapshot.

## Comparable RAW-to-display benchmark

The revised benchmark uses a common completed output instead of comparing
different intermediate stages:

```sh
cargo build --release --locked --manifest-path tools/raw-bench/rust/Cargo.toml --bin display-bench
swiftc -O -module-cache-path /private/tmp/lightphotos-raw-swift-cache tools/raw-bench/display.swift -o tools/raw-bench/apple-display-bench
python3 tools/raw-bench/display.py --trials 5
```

Run with macOS GPU access. All three persistent workers run with the same
permissions. Apple reuses one CIContext; LightCraft keeps its GPU device and
shader infrastructure; rawler keeps its Rayon pool. No developed-image cache or
LightCraft stage cache is used. A discarded pass over every file warms the
rendering infrastructure before five sequential rounds, with the file/engine
order shuffled deterministically each round. No other builds or downloads run
during measurements.

Each interval starts before opening the source and ends when a CPU-readable
sRGB RGBA8 buffer exists. The runner pre-reads the source outside the interval
to give every request warm OS file-cache conditions. File reading, allocations,
sensor decoding, development, resizing, output conversion and required GPU
readback are timed. IPC, process/context creation, checksum validation and
writing inspection rasters are excluded.

Target dimensions preserve the aspect ratio of the earlier full-size Apple
render, with a 2560-pixel long edge (no upscale for smaller originals). Each
engine must return exactly those dimensions and four bytes per pixel. The
final dimensions are normalized when the native path rounds or bins to a
different size. This may involve a small resize or upscale, and does not
establish equal image quality.

- Apple: CIRAWFilter's scaled decode, default processing, and a direct render
  into the output buffer. ImageIO is the fallback, as in LightPhotos.
- rawler: default RawDevelop, including as-shot white balance, calibration,
  sRGB encoding, RGB16-to-RGBA8 conversion, EXIF orientation and Lanczos resize.
  It uses LightPhotos' patched library, but does not include LightPhotos'
  additional brightness curve, denoise or app-specific preview logic. This is
  a library conversion time, not the complete LightPhotos non-Mac app path.
- LightCraft: its actual file loader and full display pipeline, with freshly
  imported RAW settings (as-shot white balance, sharpening 40, color noise
  reduction 25), camera color/look processing and preview binning. It attempts
  the GPU path and records the backend or CPU fallback reason. A preview-only
  source is refused as a RAW decode, even if the app could show its JPEG.

This is a comparison of native/default RAW-to-display paths with the same
output contract, not identical processing algorithms or quality. It excludes
the GUI, photo browsing, thumbnail shortcuts and export encoding. In particular,
denoise and sharpening defaults differ between engines.

`results/display-2560.json` retains the discarded warm-ups, every measured trial,
dimensions, output checksums, backends, medians and ranges. The runner saves
warm-up RGBA buffers in the ignored `rasters/` directory for visual inspection.
The fair shared-set total is the sum of per-file medians for only files all
three decoded successfully in every round. An all-files total is incomplete
when any file fails; missing work must not be scored as zero milliseconds.
