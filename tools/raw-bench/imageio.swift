import Foundation
import ImageIO
import CoreGraphics
import CoreImage

let url = URL(fileURLWithPath: CommandLine.arguments[1])
// Warm the file cache before timing. Apple's RAW readers require a URL for
// some containers: CreateWithData rejects otherwise supported Sony/Nikon files.
let bytes = try Data(contentsOf: url)
let start = DispatchTime.now().uptimeNanoseconds
func raster(_ image: CGImage) -> [String: Any] {
    guard let space = CGColorSpace(name: CGColorSpace.sRGB),
          let context = CGContext(data: nil, width: image.width, height: image.height,
              bitsPerComponent: 8, bytesPerRow: image.width * 4, space: space,
              bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else {
        return ["status": "error", "error": "could not create RGBA context"]
    }
    context.draw(image, in: CGRect(x: 0, y: 0, width: image.width, height: image.height))
    guard let data = context.data else { return ["status": "error", "error": "no raster"] }
    let firstByte = data.load(as: UInt8.self)
    return ["status": "ok", "measurement": [
        "total_ms": Double(DispatchTime.now().uptimeNanoseconds - start) / 1e6,
        "width": image.width, "height": image.height,
        "output": "sRGB RGBA8", "first_byte": firstByte
    ]]
}
func run() -> [String: Any] {
    if CommandLine.arguments.last == "coreimage" {
        guard let filter = CIRAWFilter(imageURL: url), let input = filter.outputImage,
              let space = CGColorSpace(name: CGColorSpace.sRGB),
              let image = CIContext(options: [.cacheIntermediates: false]).createCGImage(
                  input, from: input.extent, format: .RGBA8, colorSpace: space) else {
            return ["status": "error", "error": "Core Image could not develop RAW"]
        }
        return raster(image)
    }
    // CreateImageAtIndex requests the primary image, never CreateThumbnailAtIndex.
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil) else {
        return ["status": "error", "error": "ImageIO could not create source"]
    }
    guard let image = CGImageSourceCreateImageAtIndex(source, 0,
        [kCGImageSourceShouldCacheImmediately: true] as CFDictionary) else {
        return ["status": "error", "error": "ImageIO could not decode primary image",
                "source_status": CGImageSourceGetStatus(source).rawValue]
    }
    return raster(image)
}
let result = run()
print(String(data: try JSONSerialization.data(withJSONObject: result, options: [.sortedKeys]), encoding: .utf8)!)
