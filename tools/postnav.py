#!/usr/bin/env python3
"""Regenerate the Back/Next cards at the foot of every blog article.

Order is chronological, so Back is the older post and Next is the newer one.
The oldest article has no Back and the newest has no Next. Rerun it after
adding an article or changing a date.
"""
import html
import pathlib
import re
import sys

POSTS = sorted(pathlib.Path("src/pages/blogs").glob("*.astro"))
NAV = re.compile(r'\n[ \t]*<nav class="lp-article-nav".*?</nav>\n', re.S)
CLOSE = "    </article>\n"


def field(src, pattern, path, what):
    m = re.search(pattern, src, re.S)
    if not m:
        sys.exit("%s: no %s found" % (path.name, what))
    return " ".join(html.unescape(m.group(1)).split())


posts = []
for path in POSTS:
    src = NAV.sub("\n", path.read_text(encoding="utf-8"))
    posts.append({
        "path": path,
        "src": src,
        "url": "/blogs/%s.html" % path.stem,
        "date": field(src, r'<time datetime="([\d-]+)"', path, "date"),
        "title": field(src, r"<h1>(.*?)</h1>", path, "title"),
    })

posts.sort(key=lambda p: p["date"])

def card(post, direction, cls):
    return (
        '        <a class="%s" href="%s">\n'
        '          <span class="lp-article-nav-dir">%s</span>\n'
        '          <span class="lp-article-nav-title">%s</span>\n'
        '        </a>\n' % (cls, post["url"], direction, post["title"])
    )

changed = 0
for i, post in enumerate(posts):
    older = posts[i - 1] if i > 0 else None
    newer = posts[i + 1] if i < len(posts) - 1 else None
    if not older and not newer:
        continue

    nav = '\n      <nav class="lp-article-nav" aria-label="More posts">\n'
    if older:
        nav += card(older, "Back", "lp-article-nav-prev")
    if newer:
        nav += card(newer, "Next", "lp-article-nav-next")
    nav += "      </nav>\n"

    src = post["src"]
    if CLOSE not in src:
        sys.exit("%s: no </article> to anchor the nav to" % post["path"].name)
    updated = src.replace(CLOSE, nav + CLOSE, 1)
    if updated != post["path"].read_text(encoding="utf-8"):
        post["path"].write_text(updated, encoding="utf-8")
        changed += 1

    print("%-48s back=%-34s next=%s" % (
        post["path"].name,
        older["path"].stem if older else "-",
        newer["path"].stem if newer else "-",
    ))

print("\n%d file(s) updated" % changed)
