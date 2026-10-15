"""Comparable RAW-to-display endpoints in persistent workers, with uncached image results."""
import argparse
import datetime
import hashlib
import json
import os
from pathlib import Path
import random
import select
import statistics
import subprocess

root = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument("--trials", type=int, default=5)
args = parser.parse_args()
assert args.trials > 0
samples = json.loads((root / "samples.json").read_text())
reference = json.loads((root / "results/latest.json").read_text())
dimensions = {}
for sample in samples:
    path = root / "samples" / sample["file"]
    assert hashlib.sha256(path.read_bytes()).hexdigest() == sample["sha256"]
    native = next(r for r in reference["records"] if r["file"] == sample["file"] and r["engine"] == "coreimage")
    width, height = native["width"], native["height"]
    scale = min(1, 2560 / max(width, height))
    dimensions[sample["file"]] = (int(width * scale), int(height * scale))

workers = {}
logs = {}
records = {(s["file"], e): [] for s in samples for e in ["apple", "rawler", "lightcraft"]}
def receive(worker):
    if not select.select([worker.stdout], [], [], 180)[0]:
        raise RuntimeError("worker timed out")
    line = worker.stdout.readline()
    if not line:
        raise RuntimeError(f"worker exited: {worker.poll()}")
    return json.loads(line)

def trial(sample, engine, save=False):
    path = root / "samples" / sample["file"]
    # Identical warm-storage condition for every request, outside the timed interval.
    path.read_bytes()
    width, height = dimensions[sample["file"]]
    request = {"path": str(path), "width": width, "height": height}
    if save:
        request["save"] = str(root / "rasters" / (sample["file"] + "." + engine + ".rgba"))
    worker = workers[engine]
    worker.stdin.write(json.dumps(request) + "\n")
    worker.stdin.flush()
    result = receive(worker)
    if result["status"] == "ok":
        assert (result["width"], result["height"]) == (width, height)
        assert result["bytes"] == width * height * 4
        assert result["checksum"] > 0
    return result

try:
    (root / "rasters").mkdir(exist_ok=True)
    for engine in ["apple", "rawler", "lightcraft"]:
        command = [str(root / "apple-display-bench")] if engine == "apple" else [
            str(root / "rust/target/release/display-bench"), engine]
        logs[engine] = open(root / "results" / (engine + "-display.stderr.log"), "w")
        worker = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            stderr=logs[engine], text=True, bufsize=1)
        workers[engine] = worker
        assert receive(worker)["ready"]
    # A discarded pass of every file per engine warms model/shader paths. Retain its output
    # rasters for inspection, but never reuse a developed image for a measured request.
    warmups = []
    for sample in samples:
        for engine in workers:
            result = trial(sample, engine, save=True)
            warmups.append({"file": sample["file"], "engine": engine, "result": result})
        print("warmed", sample["file"], flush=True)
    rng = random.Random(20261015)
    for round_id in range(args.trials):
        jobs = [(s, e) for s in samples for e in workers]
        rng.shuffle(jobs)
        for sample, engine in jobs:
            records[(sample["file"], engine)].append(trial(sample, engine))
        print("finished round", round_id + 1, flush=True)
    rows = []
    for sample in samples:
        for engine in workers:
            trials = records[(sample["file"], engine)]
            good = [t for t in trials if t["status"] == "ok"]
            row = {"file": sample["file"], "engine": engine, "trials": trials,
                "successes": len(good), "attempts": args.trials,
                "width": dimensions[sample["file"]][0], "height": dimensions[sample["file"]][1]}
            if good:
                row["median_ms"] = statistics.median(t["total_ms"] for t in good)
                row["min_ms"] = min(t["total_ms"] for t in good)
                row["max_ms"] = max(t["total_ms"] for t in good)
            rows.append(row)
    common = [s["file"] for s in samples if all(
        next(r for r in rows if r["file"] == s["file"] and r["engine"] == e)["successes"] == args.trials for e in workers)]
    totals = {e: sum(r["median_ms"] for r in rows if r["engine"] == e and r["file"] in common) for e in workers}
    report = {"date": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "hardware": reference["hardware"], "platform": reference["platform"],
        "method": "persistent workers; discarded warmup per file; randomized sequential rounds; warm-file open to completed sRGB RGBA8, 2560 px long edge; no developed-image cache",
        "rayon_num_threads": os.environ.get("RAYON_NUM_THREADS", "default"),
        "common_files": common, "common_sum_of_medians_ms": totals, "warmups": warmups, "records": rows}
    for name in ["lightphotos", "lightcraft"]:
        report[name + "_commit"] = subprocess.check_output(["git", "-C", str(root.parents[2] / name), "rev-parse", "HEAD"], text=True).strip()
    (root / "results/display-2560.json").write_text(json.dumps(report, indent=2) + "\n")
    for row in rows:
        print(row["file"], row["engine"], row["successes"], round(row.get("median_ms", 0), 1))
    print("Common-file sums of medians:", totals, flush=True)
finally:
    for worker in workers.values():
        worker.stdin.close()
        try:
            worker.wait(timeout=10)
        except subprocess.TimeoutExpired:
            worker.kill()
    for log in logs.values():
        log.close()
