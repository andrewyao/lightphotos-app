// Record one window to a .mov with ScreenCaptureKit, with the cursor and
// without whatever overlaps it, until SIGINT or SIGTERM. record.sh compiles this once.
//
//   capture <window-id> <out.mov> [crop-top]   crop-top in points, e.g. the title bar
import AppKit
import AVFoundation
import ScreenCaptureKit

func fail(_ message: String) -> Never {
    FileHandle.standardError.write("capture: \(message)\n".data(using: .utf8)!)
    exit(1)
}

let args = CommandLine.arguments
guard args.count >= 3, let wid = UInt32(args[1]) else {
    fail("usage: capture <window-id> <out.mov> [crop-top]")
}
let out = URL(fileURLWithPath: args[2])
let cropTop = args.count > 3 ? Double(args[3]) ?? 0 : 0
try? FileManager.default.removeItem(at: out)

final class Finished: NSObject, SCRecordingOutputDelegate {
    let done = DispatchSemaphore(value: 0)
    func recordingOutputDidFinishRecording(_ recordingOutput: SCRecordingOutput) { done.signal() }
    func recordingOutput(_ recordingOutput: SCRecordingOutput, didFailWithError error: any Error) {
        fail("\(error)")
    }
}

// ScreenCaptureKit puts a recording indicator in the menu bar, from the main
// thread, so this needs a running NSApplication rather than dispatchMain().
NSApplication.shared.setActivationPolicy(.prohibited)
let finished = Finished()
let stop = DispatchSemaphore(value: 0)
let signalSources = [SIGINT, SIGTERM].map { sig in
    signal(sig, SIG_IGN)
    let source = DispatchSource.makeSignalSource(signal: sig, queue: .main)
    source.setEventHandler { stop.signal() }
    source.resume()
    return source
}

Task { @MainActor in
    do {
        let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: true)
        guard let window = content.windows.first(where: { $0.windowID == wid }) else {
            fail("no on-screen window \(wid)")
        }
        // The window's patch of screen, drawing only its app and the open
        // panel, which macOS runs in a service of its own; the cursor shows
        // what is being clicked and dragged.
        guard let display = content.displays.first(where: { $0.frame.contains(window.frame.origin) }) else {
            fail("window \(wid) is on no display")
        }
        let apps = content.applications.filter {
            $0.processID == window.owningApplication?.processID
                || $0.bundleIdentifier.contains("openAndSavePanelService")
        }
        let filter = SCContentFilter(display: display, including: apps, exceptingWindows: [])
        let scale = Double(filter.pointPixelScale)
        let rect = CGRect(x: window.frame.minX - display.frame.minX, y: window.frame.minY - display.frame.minY + cropTop,
                          width: window.frame.width, height: window.frame.height - cropTop)

        let config = SCStreamConfiguration()
        config.sourceRect = rect
        config.width = Int(rect.width * scale)
        config.height = Int(rect.height * scale)
        config.showsCursor = true
        config.minimumFrameInterval = CMTime(value: 1, timescale: 60)
        config.captureResolution = .best

        let recording = SCRecordingOutputConfiguration()
        recording.outputURL = out
        recording.outputFileType = .mov
        recording.videoCodecType = .hevc

        let stream = SCStream(filter: filter, configuration: config, delegate: nil)
        try stream.addRecordingOutput(SCRecordingOutput(configuration: recording, delegate: finished))
        try await stream.startCapture()
        print("recording")
        fflush(stdout)

        await withCheckedContinuation { c in DispatchQueue.global().async { stop.wait(); c.resume() } }
        try await stream.stopCapture()
        await withCheckedContinuation { c in DispatchQueue.global().async { finished.done.wait(); c.resume() } }
        exit(0)
    } catch {
        fail("\(error)")
    }
}
NSApplication.shared.run()
