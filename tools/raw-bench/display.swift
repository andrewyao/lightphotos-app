import Foundation
import CoreImage
import ImageIO
import CoreGraphics

// Kept alive for the worker's lifetime, as in LightPhotos' decode thread.
let context = CIContext(options: [.cacheIntermediates: false])
let space = CGColorSpace(name: CGColorSpace.sRGB)!
func render(_ request: [String: Any]) -> [String: Any] {
    let path = request["path"] as! String
    let width = request["width"] as! Int
    let height = request["height"] as! Int
    let url = URL(fileURLWithPath: path)
    let start = DispatchTime.now().uptimeNanoseconds
    var output = [UInt8](repeating: 0, count: width * height * 4)
    var route = "Core Image"
    if let filter = CIRAWFilter(imageURL: url) {
        let size = filter.nativeSize
        filter.scaleFactor = min(1, Float(max(width, height)) / Float(max(size.width, size.height)))
        guard let image = filter.outputImage else { return ["status": "error", "error": "no RAW output"] }
        let extent = image.extent
        let aligned = image.transformed(by: CGAffineTransform(translationX: -extent.minX, y: -extent.minY))
            .transformed(by: CGAffineTransform(scaleX: Double(width) / extent.width, y: Double(height) / extent.height))
        output.withUnsafeMutableBytes { buffer in
            context.render(aligned, toBitmap: buffer.baseAddress!, rowBytes: width * 4,
                bounds: CGRect(x: 0, y: 0, width: width, height: height), format: .RGBA8, colorSpace: space)
        }
    } else {
        route = "ImageIO fallback"
        guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
              let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
            return ["status": "error", "error": "Apple RAW rejected the file"]
        }
        let ok = output.withUnsafeMutableBytes { buffer -> Bool in
            guard let bitmap = CGContext(data: buffer.baseAddress, width: width, height: height,
                bitsPerComponent: 8, bytesPerRow: width * 4, space: space,
                bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return false }
            bitmap.interpolationQuality = .high
            bitmap.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
            return true
        }
        if !ok { return ["status": "error", "error": "no bitmap context"] }
    }
    let elapsed = Double(DispatchTime.now().uptimeNanoseconds - start) / 1e6
    let checksum = output.reduce(UInt64(0)) { $0 &+ UInt64($1) }
    if let save = request["save"] as? String { try! Data(output).write(to: URL(fileURLWithPath: save)) }
    return ["status": "ok", "total_ms": elapsed, "width": width, "height": height,
        "bytes": output.count, "checksum": checksum, "backend": route]
}
print("{\"ready\":true}")
fflush(stdout)
while let line = readLine() {
    autoreleasepool {
        do {
            let request = try JSONSerialization.jsonObject(with: Data(line.utf8)) as! [String: Any]
            let result = render(request)
            print(String(data: try JSONSerialization.data(withJSONObject: result, options: [.sortedKeys]), encoding: .utf8)!)
            fflush(stdout)
        } catch {
            print("{\"status\":\"error\",\"error\":\"invalid request\"}")
            fflush(stdout)
        }
    }
}
