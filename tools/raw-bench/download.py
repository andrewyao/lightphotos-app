"""Fetch pinned CC0 samples; originals stay out of git."""
import hashlib
import json
from pathlib import Path
import urllib.request
import argparse
from concurrent.futures import ThreadPoolExecutor

root = Path(__file__).resolve().parent
dest = root / "samples"
dest.mkdir(exist_ok=True)
def download(sample):
    path = dest / sample["file"]
    if path.exists() and hashlib.sha256(path.read_bytes()).hexdigest() == sample["sha256"]:
        print("cached", path.name, flush=True)
        return
    print("fetch", path.name, flush=True)
    request = urllib.request.Request(sample["url"], headers={"User-Agent": "LightPhotos-RAW-benchmark/1.0"})
    with urllib.request.urlopen(request, timeout=180) as response:
        data = response.read()
    digest = hashlib.sha256(data).hexdigest()
    if digest != sample["sha256"]:
        raise RuntimeError(f"{path.name}: SHA-256 mismatch: {digest}")
    temporary = path.with_suffix(path.suffix + ".partial")
    temporary.write_bytes(data)
    temporary.replace(path)

parser = argparse.ArgumentParser()
parser.add_argument("--jobs", type=int, default=2)
parser.add_argument("--reverse", action="store_true")
args = parser.parse_args()
samples = json.loads((root / "samples.json").read_text())
if args.reverse:
    samples.reverse()
with ThreadPoolExecutor(max_workers=args.jobs) as pool:
    list(pool.map(download, samples))
