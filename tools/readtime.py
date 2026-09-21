#!/usr/bin/env python3
"""Regenerate the author and reading-time byline on every blog article.

Counts the words a reader actually reads (article body, no markup, no SVG
labels) and inserts or updates the byline directly after the dek. Rerun it
whenever article text changes.
"""
import html
import pathlib
import re
import sys

AUTHOR = "Andrew Yao"
WPM = 225
POSTS = sorted(pathlib.Path("src/pages/blogs").glob("*.astro"))

BYLINE = re.compile(r'[ \t]*<p class="lp-article-byline">.*?</p>\n', re.S)
DEK = re.compile(r'([ \t]*<p class="lp-article-dek">.*?</p>\n)', re.S)


def body_words(src: str) -> int:
    body = re.search(r"<article\b.*?</article>", src, re.S)
    if not body:
        return 0
    text = body.group(0)
    text = re.sub(r"<svg\b.*?</svg>", " ", text, flags=re.S)
    text = re.sub(r"<[^>]+>", " ", text)
    return len(html.unescape(text).split())


changed = []
for path in POSTS:
    src = path.read_text(encoding="utf-8")
    minutes = max(1, -(-body_words(src) // WPM))
    byline = (
        '        <p class="lp-article-byline">%s &middot; %d min read</p>\n'
        % (AUTHOR, minutes)
    )
    updated = BYLINE.sub("", src)
    if not DEK.search(updated):
        sys.exit("%s: no dek to anchor the byline to" % path.name)
    updated = DEK.sub(lambda m: m.group(1) + byline, updated, count=1)
    if updated != src:
        path.write_text(updated, encoding="utf-8")
        changed.append(path.name)
    print("%-48s %4d words  %2d min" % (path.name, body_words(src), minutes))

print("\n%d file(s) updated" % len(changed))
