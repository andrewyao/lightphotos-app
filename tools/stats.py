#!/usr/bin/env python3
"""Print the site's analytics from D1.

Reads the events table written by functions/api/e.js and prints four things:
traffic per day, downloads per platform, the web app's load funnel, and what
people do once the app is running.

Queries go through `wrangler d1 execute`, which reuses the Cloudflare login
already needed to deploy. That avoids creating and storing an API token whose
only job would be reading these counts.

    python3 tools/stats.py               # last 30 days, production
    python3 tools/stats.py --days 7
    python3 tools/stats.py --local       # the local dev database
"""
import argparse
import json
import subprocess
import sys

DB = "lightphotos_analytics"

# Ordered, because the point of the funnel is the drop between steps.
FUNNEL = [
    ("app_page_view", "opened /app.html"),
    ("wasm_loaded", "wasm finished loading"),
    ("app_started", "app booted"),
    ("first_photo_rendered", "first photo on screen"),
]


def query(sql: str, local: bool) -> list[dict]:
    """Run one statement and return its rows."""
    cmd = [
        "npx", "wrangler", "d1", "execute", DB,
        "--local" if local else "--remote",
        "--json", "--command", sql,
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        sys.exit(f"wrangler failed:\n{proc.stderr.strip()}")
    try:
        payload = json.loads(proc.stdout)
    except json.JSONDecodeError:
        sys.exit(f"could not parse wrangler output:\n{proc.stdout.strip()}")
    # wrangler wraps results in a list, one entry per statement.
    if isinstance(payload, list) and payload:
        return payload[0].get("results", [])
    return payload.get("result", [{}])[0].get("results", [])


def table(title: str, headers: list[str], rows: list[list]) -> None:
    print(f"\n{title}")
    print("-" * len(title))
    if not rows:
        print("(nothing yet)")
        return
    cells = [headers] + [[str(c) for c in r] for r in rows]
    widths = [max(len(row[i]) for row in cells) for i in range(len(headers))]
    for i, row in enumerate(cells):
        print("  ".join(c.ljust(w) for c, w in zip(row, widths)).rstrip())
        if i == 0:
            print("  ".join("-" * w for w in widths))


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--days", type=int, default=30, help="window in days (default 30)")
    ap.add_argument("--local", action="store_true", help="read the local dev database")
    args = ap.parse_args()

    since = f"date('now', '-{args.days} day')"
    local = args.local

    rows = query(
        f"""SELECT day,
                   SUM(name IN ('page_view','app_page_view')) AS views,
                   COUNT(DISTINCT visitor_hash) AS visitors
            FROM events WHERE day >= {since}
            GROUP BY day ORDER BY day DESC""",
        local,
    )
    table(
        f"Traffic, last {args.days} days",
        ["day", "views", "visitors"],
        [[r["day"], r["views"], r["visitors"]] for r in rows],
    )

    rows = query(
        f"""SELECT json_extract(props, '$.platform') AS platform,
                   COUNT(*) AS total,
                   SUM(day >= {since}) AS recent
            FROM events WHERE name = 'download'
            GROUP BY platform ORDER BY total DESC""",
        local,
    )
    table(
        "Downloads by platform",
        ["platform", "all time", f"last {args.days}d"],
        [[r["platform"] or "unknown", r["total"], r["recent"]] for r in rows],
    )

    counts = {
        r["name"]: r["n"]
        for r in query(
            f"""SELECT name, COUNT(*) AS n FROM events
                WHERE day >= {since} GROUP BY name""",
            local,
        )
    }
    top = counts.get(FUNNEL[0][0], 0)
    funnel_rows = []
    for event, label in FUNNEL:
        n = counts.get(event, 0)
        share = f"{100 * n / top:.0f}%" if top else "-"
        funnel_rows.append([label, n, share])
    failed = counts.get("wasm_load_failed", 0)
    if failed:
        funnel_rows.append(["(load failed)", failed, ""])
    table(f"Web app progression (aggregate counts), last {args.days} days", ["step", "count", "of opens"], funnel_rows)

    # Everything the Rust side reports, minus the funnel steps already shown.
    shown = {e for e, _ in FUNNEL} | {"page_view", "download", "wasm_load_failed"}
    usage = [[k, v] for k, v in sorted(counts.items(), key=lambda kv: -kv[1]) if k not in shown]
    table(f"Other events, last {args.days} days", ["event", "count"], usage)

    for title, event, prop in [
        ("First photo timing (includes time choosing a folder)", "first_render_ms", "ms_bucket"),
        ("Develop usage", "develop_edit_applied", "edit_kind"),
        ("Decode failures", "decode_error", "reason"),
        ("Export failures", "export_failed", "reason"),
    ]:
        rows = query(
            f"""SELECT json_extract(props, '$.{prop}') AS category, COUNT(*) AS n
                FROM events WHERE day >= {since} AND name = '{event}'
                GROUP BY category ORDER BY n DESC""", local,
        )
        table(title, ["category", "count"], [[r["category"] or "unknown", r["n"]] for r in rows])

    rows = query(
        f"""SELECT referrer_host, COUNT(*) AS n FROM events
            WHERE day >= {since} AND referrer_host IS NOT NULL
            GROUP BY referrer_host ORDER BY n DESC LIMIT 15""",
        local,
    )
    table(
        f"Top referrers, last {args.days} days",
        ["host", "visits"],
        [[r["referrer_host"], r["n"]] for r in rows],
    )
    print()


if __name__ == "__main__":
    main()
