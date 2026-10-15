"""Run isolated trials and retain every outcome, including decoder failures."""
import argparse
import datetime
import hashlib
import json
from pathlib import Path
import platform
import os
import statistics
import subprocess

root = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument("--trials", type=int, default=5)
parser.add_argument("--engines", nargs="+", choices=["imageio", "coreimage", "rawler", "lightcraft"],
                    default=["imageio", "coreimage", "rawler", "lightcraft"])
parser.add_argument("--append", action="store_true")
args = parser.parse_args()
if args.trials < 1:
    parser.error("--trials must be positive")
samples = json.loads((root / "samples.json").read_text())
records = json.loads((root / "results/latest.json").read_text())["records"] if args.append else []
for sample in samples:
    path = root / "samples" / sample["file"]
    if hashlib.sha256(path.read_bytes()).hexdigest() != sample["sha256"]:
        raise RuntimeError(f"hash mismatch: {path}")
    for engine in args.engines:
        trials = []
        for _ in range(args.trials):
            command = [str(root / "imageio-bench"), str(path), engine] if engine in ["imageio", "coreimage"] else [
                str(root / "rust/target/release/raw-engine-bench"), engine, str(path)]
            try:
                proc = subprocess.run(command, capture_output=True, text=True, timeout=180)
                result = json.loads(proc.stdout.strip().splitlines()[-1]) if proc.returncode == 0 else {
                    "status": "process_error", "exit_code": proc.returncode, "error": proc.stderr[-2000:]}
            except subprocess.TimeoutExpired:
                result = {"status": "timeout"}
            except (ValueError, IndexError) as e:
                result = {"status": "invalid_output", "error": str(e)}
            trials.append(result)
        successes = [t["measurement"] for t in trials if t["status"] == "ok"]
        row = {"file": sample["file"], "engine": engine, "trials": trials,
               "successes": len(successes), "attempts": args.trials}
        if successes:
            row["median_total_ms"] = statistics.median(t["total_ms"] for t in successes)
            row["width"], row["height"] = successes[0]["width"], successes[0]["height"]
            if "decode_ms" in successes[0]:
                row["median_decode_ms"] = statistics.median(t["decode_ms"] for t in successes)
        records = [r for r in records if (r["file"], r["engine"]) != (sample["file"], engine)]
        records.append(row)
        print(sample["file"], engine, f'{len(successes)}/{args.trials}',
              round(row.get("median_total_ms", 0), 1), flush=True)
        report = {"date": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  "platform": platform.platform(), "hardware": "Mac mini, Apple M4, 10 CPU cores, 16 GB RAM",
                  "rayon_num_threads": os.environ.get("RAYON_NUM_THREADS", "default"),
                  "method": "fresh process; warm file URL for ImageIO, in-memory input for Rust; full-size output at different RGB stages",
                  "records": records}
        for name, repo in [("lightphotos", "lightphotos"), ("lightcraft", "lightcraft")]:
            report[name + "_commit"] = subprocess.check_output([
                "git", "-C", str(root.parents[2] / repo), "rev-parse", "HEAD"], text=True).strip()
        (root / "results/latest.json").write_text(json.dumps(report, indent=2) + "\n")
