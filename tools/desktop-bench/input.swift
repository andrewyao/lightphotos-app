// Post synthetic input to the frontmost app. bench.sh compiles this once.
//
//   input click <window-id> <x> <y> [clicks]   x, y in points from the window's top-left
//   input key <virtual-keycode>                e.g. 124 for the right arrow
import CoreGraphics
import Foundation

func fail() -> Never {
    FileHandle.standardError.write("usage: input click <window-id> <x> <y> [clicks] | input key <keycode>\n".data(using: .utf8)!)
    exit(2)
}

let args = CommandLine.arguments
let src = CGEventSource(stateID: .hidSystemState)
guard args.count >= 3 else { fail() }
switch args[1] {
case "click":
    guard args.count >= 5, let wid = Int(args[2]), let x = Double(args[3]), let y = Double(args[4]) else { fail() }
    let clicks = args.count > 5 ? Int(args[5]) ?? 1 : 1
    let info = CGWindowListCopyWindowInfo(.optionIncludingWindow, CGWindowID(wid)) as? [[String: Any]] ?? []
    guard let b = info.first?[kCGWindowBounds as String] as? [String: Double] else { exit(1) }
    let p = CGPoint(x: (b["X"] ?? 0) + x, y: (b["Y"] ?? 0) + y)
    CGEvent(mouseEventSource: src, mouseType: .mouseMoved, mouseCursorPosition: p, mouseButton: .left)?
        .post(tap: .cghidEventTap)
    usleep(50_000)
    for n in 1...clicks {
        for type in [CGEventType.leftMouseDown, .leftMouseUp] {
            let e = CGEvent(mouseEventSource: src, mouseType: type, mouseCursorPosition: p, mouseButton: .left)
            e?.setIntegerValueField(.mouseEventClickState, value: Int64(n))
            e?.post(tap: .cghidEventTap)
        }
        usleep(30_000)
    }
case "key":
    guard let code = CGKeyCode(args[2]) else { fail() }
    for down in [true, false] {
        let e = CGEvent(keyboardEventSource: src, virtualKey: code, keyDown: down)
        // A real arrow key carries these; some apps ignore an arrow without them.
        if (123...126).contains(code) { e?.flags = [.maskNumericPad, .maskSecondaryFn] }
        e?.post(tap: .cghidEventTap)
        usleep(10_000)
    }
default:
    fail()
}
