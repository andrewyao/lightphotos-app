"""Verify that the common GPU pass is neutral when off and applies both filters."""
import json
from pathlib import Path
import random
import select
import subprocess

root = Path(__file__).resolve().parent
dest = root / "rasters"
dest.mkdir(exist_ok=True)
width, height = 128, 96
rng = random.Random(17)
pixels = bytearray()
for y in range(height):
    for x in range(width):
        level = 85 if x < width // 2 else 165
        pixels.extend([max(0, min(255, level + rng.randint(-20, 20))) for _ in range(3)] + [255])
source = dest / "detail-check-input.rgba"
source.write_bytes(pixels)
worker = subprocess.Popen([str(root / "rust/target/release/display-bench"), "detail"],
    stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True, bufsize=1)
def receive():
    assert select.select([worker.stdout], [], [], 120)[0], "GPU worker timed out"
    return json.loads(worker.stdout.readline())
try:
    assert receive()["ready"]
    outputs = {}
    for label, sharpen, nr in [("off", 0, 0), ("sharpen", 40, 0), ("noise", 0, 25), ("both", 40, 25)]:
        path = dest / ("detail-check-" + label + ".rgba")
        worker.stdin.write(json.dumps({"path": str(source), "width": width, "height": height,
            "native_long": width, "sharpen_amount": sharpen, "nr_color": nr, "save": str(path)}) + "\n")
        worker.stdin.flush()
        result = receive()
        assert result["status"] == "ok", result
        assert "Metal" in result["backend"], result
        outputs[label] = path.read_bytes()
    difference = max(abs(a - b) for a, b in zip(outputs["off"], pixels))
    assert difference <= 3, f"Neutral pass changes the input by {difference} levels"
    for label in ["sharpen", "noise", "both"]:
        changed = sum(a != b for a, b in zip(outputs[label], outputs["off"]))
        assert changed > width * height // 4, f"{label} did not affect enough pixels"
        print(label, "changed bytes:", changed)
    assert outputs["both"] != outputs["sharpen"] and outputs["both"] != outputs["noise"]
    print("PASS: neutral color conversion, sharpening, color NR, combined filters, Metal backend")
finally:
    worker.stdin.close()
    worker.wait(timeout=10)
