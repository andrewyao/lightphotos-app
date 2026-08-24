#!/usr/bin/env bash
# SPDX-License-Identifier: MIT OR Apache-2.0

# Assembles index.html, downloads.html, blogs.html and docs.html from the
# shared partials/ (head boilerplate, site nav, footer) plus one
# per-page partials/body-*.html, so the <head> boilerplate and the
# <header class="lp-site-header"> nav don't have to be hand-edited in all
# four files every time either changes. Run this, review the diff, commit
# the rendered HTML — this repo still has no other build tooling and none
# is being added; same "build then commit rendered output" spirit as the
# sibling lightphotos repo's scripts/deploy-web.sh, just for the nav
# instead of the wasm bundle.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PARTIALS="$ROOT/partials"

render_head() {
  local title="$1" desc="$2"
  sed -e "s|__TITLE__|${title}|" -e "s|__DESCRIPTION__|${desc}|" "$PARTIALS/head.html"
}

render_nav() {
  # $1/$2/$3: "active" or "" for the downloads/blogs/docs nav links, in
  # that order. The "Open LightPhotos in Browser" link never carries
  # lp-active (app.html has no nav of its own to link back from), so it
  # has no placeholder at all.
  local dl_attr="" bl_attr="" dc_attr=""
  [[ "$1" == "active" ]] && dl_attr=' class="lp-active"'
  [[ "$2" == "active" ]] && bl_attr=' class="lp-active"'
  [[ "$3" == "active" ]] && dc_attr=' class="lp-active"'
  sed \
    -e "s|__ACTIVE_DOWNLOADS__|${dl_attr}|" \
    -e "s|__ACTIVE_BLOGS__|${bl_attr}|" \
    -e "s|__ACTIVE_DOCS__|${dc_attr}|" \
    "$PARTIALS/nav.html"
}

build_page() {
  local out="$1" title="$2" desc="$3" body="$4" dl="$5" bl="$6" dc="$7"
  echo "==> Building $out"
  {
    render_head "$title" "$desc"
    render_nav "$dl" "$bl" "$dc"
    cat "$PARTIALS/$body"
    cat "$PARTIALS/footer.html"
  } > "$ROOT/$out"
}

echo "==> Assembling site pages from partials/"

build_page "index.html" \
  "LightPhotos — Every photo, seen in its best light" \
  "LightPhotos — a fast, private photo editor that runs in your browser or as a desktop app." \
  "body-index.html" "" "" ""

build_page "downloads.html" \
  "Download LightPhotos" \
  "Download LightPhotos — under construction. Details to be determined." \
  "body-downloads.html" "active" "" ""

build_page "blogs.html" \
  "LightPhotos Blog" \
  "LightPhotos Blog — under construction. Details to be determined." \
  "body-blogs.html" "" "active" ""

build_page "docs.html" \
  "LightPhotos Documentation" \
  "LightPhotos Documentation — under construction. Details to be determined." \
  "body-docs.html" "" "" "active"

echo "==> Done. Review the diff before committing:"
echo "    cd $ROOT && git diff -- index.html downloads.html blogs.html docs.html"
