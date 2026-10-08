// SPDX-License-Identifier: MIT OR Apache-2.0
//
// Post synthetic input to the frontmost app, the way a person would: the
// pointer glides to each target rather than jumping. record.sh compiles this once.
//
//   input <window-id> move <x> <y> [ms]
//   input <window-id> click <x> <y> [mods] [clicks]
//   input <window-id> drag <x1> <y1> <x2> <y2> [ms]
//   input <window-id> scroll <dy>              pixels at the pointer; negative scrolls down
//   input <window-id> key <keycode> [mods]
//   input <window-id> type <text>
//
// x, y are points from the window's top-left. mods is a comma list of cmd,
// shift, alt, ctrl, or "-" for none.
import CoreGraphics
import Foundation

func fail(_ why: String = "") -> Never {
    FileHandle.standardError.write("input: bad arguments \(why)\n".data(using: .utf8)!)
    exit(2)
}

let args = Array(CommandLine.arguments.dropFirst())
guard args.count >= 2, let wid = Int(args[0]) else { fail() }
let src = CGEventSource(stateID: .hidSystemState)

func origin() -> CGPoint {
    let info = CGWindowListCopyWindowInfo(.optionIncludingWindow, CGWindowID(wid)) as? [[String: Any]] ?? []
    guard let b = info.first?[kCGWindowBounds as String] as? [String: Double] else { fail("no window \(wid)") }
    return CGPoint(x: b["X"] ?? 0, y: b["Y"] ?? 0)
}

func point(_ x: String, _ y: String) -> CGPoint {
    guard let x = Double(x), let y = Double(y) else { fail("\(x) \(y)") }
    let o = origin()
    return CGPoint(x: o.x + x, y: o.y + y)
}

func flags(_ s: String?) -> CGEventFlags {
    var f: CGEventFlags = []
    for m in (s ?? "-").split(separator: ",") {
        switch m {
        case "cmd": f.insert(.maskCommand)
        case "shift": f.insert(.maskShift)
        case "alt": f.insert(.maskAlternate)
        case "ctrl": f.insert(.maskControl)
        case "-": break
        default: fail("modifier \(m)")
        }
    }
    return f
}

func current() -> CGPoint { CGEvent(source: nil)?.location ?? .zero }

func post(_ type: CGEventType, _ p: CGPoint, _ f: CGEventFlags = [], clicks: Int = 1) {
    let e = CGEvent(mouseEventSource: src, mouseType: type, mouseCursorPosition: p, mouseButton: .left)
    e?.flags = f
    e?.setIntegerValueField(.mouseEventClickState, value: Int64(clicks))
    e?.post(tap: .cghidEventTap)
}

/// Ease the pointer from where it is to `to` over `ms`, as `type` events.
func glide(to: CGPoint, ms: Double, type: CGEventType = .mouseMoved) {
    let from = current()
    let steps = max(1, Int(ms / 8))
    for i in 1...steps {
        let t = Double(i) / Double(steps)
        let k = t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2
        post(type, CGPoint(x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k))
        usleep(8_000)
    }
}

func distanceMs(_ to: CGPoint) -> Double {
    let from = current()
    return min(650, max(220, hypot(to.x - from.x, to.y - from.y) * 0.9))
}

switch args[1] {
case "move":
    guard args.count >= 4 else { fail() }
    let p = point(args[2], args[3])
    glide(to: p, ms: args.count > 4 ? Double(args[4]) ?? 300 : distanceMs(p))
case "click":
    guard args.count >= 4 else { fail() }
    let p = point(args[2], args[3])
    let f = flags(args.count > 4 ? args[4] : nil)
    let clicks = args.count > 5 ? Int(args[5]) ?? 1 : 1
    glide(to: p, ms: distanceMs(p))
    usleep(60_000)
    for n in 1...clicks {
        post(.leftMouseDown, p, f, clicks: n)
        usleep(40_000)
        post(.leftMouseUp, p, f, clicks: n)
        usleep(40_000)
    }
case "drag":
    guard args.count >= 6 else { fail() }
    let a = point(args[2], args[3]), b = point(args[4], args[5])
    glide(to: a, ms: distanceMs(a))
    usleep(80_000)
    post(.leftMouseDown, a)
    usleep(60_000)
    glide(to: b, ms: args.count > 6 ? Double(args[6]) ?? 600 : 600, type: .leftMouseDragged)
    usleep(60_000)
    post(.leftMouseUp, b)
case "scroll":
    guard args.count >= 3, let dy = Double(args[2]) else { fail() }
    let steps = 24
    for _ in 0..<steps {
        let e = CGEvent(scrollWheelEvent2Source: src, units: .pixel, wheelCount: 1,
                        wheel1: Int32(dy / Double(steps)), wheel2: 0, wheel3: 0)
        e?.location = current()
        e?.post(tap: .cghidEventTap)
        usleep(12_000)
    }
case "key":
    guard args.count >= 3, let code = CGKeyCode(args[2]) else { fail() }
    var f = flags(args.count > 3 ? args[3] : nil)
    // A real arrow key carries these; some apps ignore an arrow without them.
    if (123...126).contains(code) { f.formUnion([.maskNumericPad, .maskSecondaryFn]) }
    for down in [true, false] {
        let e = CGEvent(keyboardEventSource: src, virtualKey: code, keyDown: down)
        e?.flags = f
        e?.post(tap: .cghidEventTap)
        usleep(12_000)
    }
case "type":
    guard args.count >= 3 else { fail() }
    for ch in args[2...].joined(separator: " ").utf16 {
        for down in [true, false] {
            let e = CGEvent(keyboardEventSource: src, virtualKey: 0, keyDown: down)
            var c = ch
            e?.keyboardSetUnicodeString(stringLength: 1, unicodeString: &c)
            e?.post(tap: .cghidEventTap)
        }
        usleep(45_000)
    }
default:
    fail(args[1])
}
