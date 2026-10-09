# desktop-bench

Black-box timing of a Mac photo app, the numbers behind
[Two Rust photo apps on the Mac](../../src/pages/blogs/two-rust-photo-apps-on-the-mac.astro).
It only looks at the window, so it times LightPhotos and LightCraft the same way.

```sh
tools/desktop-bench/bench.sh lightphotos /path/to/LightPhotos.app 5
tools/desktop-bench/bench.sh lightcraft  /path/to/LightCraft.app  5
```

Each run:

1. Copies the first 20 `.ARW` files (by name) from `$PHOTOS` (default
   `~/Desktop/Photos/100MSDCF`) into a new temp folder, so no cache has seen
   them. The app gets a new temp `HOME` too, so it starts with default
   settings and doesn't restore a view from the last run. LightCraft also gets
   a new library (`--library <tmp> --no-demo`).
2. Launches the app on that folder with `open -n`, and records when its window
   appears.
3. Sizes the window to 1600×1000 points and waits for the grid to settle.
4. Selects the first thumbnail (untimed), then double-clicks it (timed) to open
   it.
5. Presses → eight times, waiting for the window to settle after each press.
6. Reads the app's physical footprint with `footprint`, then quits it.

A step's clock starts just before the click or key is posted. The window is
captured every 150 ms, and the step is done once the window has stopped
changing for 3 s. Two times are recorded:

- **first**: the first capture that differs from the window before the input,
  i.e. the app reacted.
- **final**: the first capture of the frame the window settled on, i.e. the
  app finished.

Every capture takes about 0.23 s, so nothing can measure below about 0.35 s.
Compare the two apps with each other, not with a stopwatch.

Results are appended as JSON lines to `results/<time>-<app>.jsonl`. The last
frame of each step is saved under `$TMPDIR/desktop-bench-frames/`; look at them
to confirm that each step ended where it should.

Requirements: macOS, Xcode command line tools (`swiftc` builds `winid.swift`
and `input.swift` on first use), and Screen Recording and Accessibility
permission for the terminal. The script posts real clicks and keys, so leave
the mouse and keyboard alone while it runs.

The first thumbnail's position (`FIRST_X`, `FIRST_Y` in `bench.sh`) was read
off each app's default layout at 1600×1000 points. Check it again after either
app's layout changes.

`WIN_W` and `WIN_H` override the window size, and `FIRST_X`/`FIRST_Y` the
click point. On a display at 1× scale, a 1600×1000 window shows a 24 MP RAW
smaller than its 1616 px embedded JPEG, so no RAW develop happens. The October 9
numbers used the whole 4K screen:

```sh
WIN_W=3840 WIN_H=2000 tools/desktop-bench/bench.sh lightphotos /path/LightPhotos.app 5
```
