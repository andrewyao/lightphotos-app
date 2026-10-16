#!/bin/zsh
# SPDX-License-Identifier: MIT OR Apache-2.0
#
# Black-box timing of a Mac photo app: launch it on a fresh copy of a folder of
# RAWs, open the first photo, step through eight more, and record when the
# window stops changing after each step. See README.md.
#
#   tools/desktop-bench/bench.sh lightphotos /path/LightPhotos.app [runs]
#   tools/desktop-bench/bench.sh lightcraft  /path/LightCraft.app  [runs]
#   tools/desktop-bench/bench.sh rapidraw    /path/RapidRAW.app    [runs]
set -euo pipefail
zmodload zsh/datetime

APP_KIND=${1:?usage: bench.sh <lightphotos|lightcraft|rapidraw> <App.app> [runs]}
APP=${2:?usage: bench.sh <lightphotos|lightcraft|rapidraw> <App.app> [runs]}
RUNS=${3:-5}
COUNT=${COUNT:-20}
NEXTS=${NEXTS:-8}
INTERVAL=${INTERVAL:-0.15}   # pause between captures
QUIET=${QUIET:-3.0}          # a step is done once the window is unchanged this long
TIMEOUT=${TIMEOUT:-90}
HERE=${0:A:h}
PHOTOS=${PHOTOS:-$HERE/../raw-bench/samples}
OUT=${OUT:-$HERE/results}
STAMP=$(date +%Y-%m-%dT%H%M%S)

# Both apps lay out for this window size; the first thumbnail's centre, in
# points from the window's top-left, depends on it.
WIN_W=${WIN_W:-1600} WIN_H=${WIN_H:-1000}
case $APP_KIND in
  lightphotos) FIRST_X=${FIRST_X:-324} FIRST_Y=${FIRST_Y:-244} ;;
  lightcraft)  FIRST_X=${FIRST_X:-160} FIRST_Y=${FIRST_Y:-180} ;;
  rapidraw)    FIRST_X=${FIRST_X:-466} FIRST_Y=${FIRST_Y:-271}
               # "Continue Session" on its welcome screen, which opens the grid.
               CONT_X=${CONT_X:-2143} CONT_Y=${CONT_Y:-1068} ;;
  *) echo "unknown app kind: $APP_KIND" >&2; exit 2 ;;
esac

for tool in winid input; do
  bin=${TMPDIR:-/tmp}/desktop-bench-$tool
  if [[ ! -x $bin || $HERE/$tool.swift -nt $bin ]]; then
    swiftc -O -o $bin $HERE/$tool.swift
  fi
done
WINID=${TMPDIR:-/tmp}/desktop-bench-winid
INPUT=${TMPDIR:-/tmp}/desktop-bench-input

BIN=$APP/Contents/MacOS/$(/usr/libexec/PlistBuddy -c 'Print :CFBundleExecutable' $APP/Contents/Info.plist)

SHOTS=${SHOTS:-${TMPDIR:-/tmp}/desktop-bench-frames/$STAMP-$APP_KIND}
mkdir -p $OUT $SHOTS
LOG=$OUT/$STAMP-$APP_KIND.jsonl
FRAMES=$(mktemp -d)
pid=""
trap '[[ -n $pid ]] && kill $pid 2>/dev/null; true' EXIT

# place <pid>: bring the app forward and give its window the benchmark size.
place() {
  osascript \
    -e "tell application \"System Events\" to set frontmost of (first process whose unix id is $1) to true" \
    -e "tell application \"System Events\" to tell window 1 of (first process whose unix id is $1) to set {position, size} to {{0, 40}, {$WIN_W, $WIN_H}}" \
    >/dev/null
}

snap() { screencapture -x -o -l $1 -t png $2 2>/dev/null && shasum $2 | cut -c1-40; }

# settle <pid> <t0> <name> [before-hash]: capture the window until it has not
# changed for $QUIET seconds. Prints two times in seconds from t0: the first
# capture that differs from <before-hash> (the app reacted), and the first
# capture of the final frame (the app finished). Fails if the final frame is
# still <before-hash>, i.e. the input did nothing. The final frame is kept in
# $SHOTS.
settle() {
  local pid=$1 t0=$2 name=$3 before=${4:-} id=$($WINID $1) hash prev="" since=0 first="" now f=$FRAMES/f.png
  while true; do
    hash=$(snap $id $f) || { id=$($WINID $pid); continue; }
    now=$EPOCHREALTIME
    [[ -z $first && $hash != $before ]] && first=$now
    if [[ $hash != $prev ]]; then
      prev=$hash; since=$now
    elif (( now - since >= QUIET )); then
      cp $f $SHOTS/$name.png
      [[ $hash == $before ]] && { echo "no change after $name" >&2; return 1; }
      printf '%.3f %.3f\n' $(( first - t0 )) $(( since - t0 ))
      return 0
    fi
    (( now - t0 > TIMEOUT )) && { echo "timeout: $name" >&2; return 1; }
    sleep $INTERVAL
  done
}

# Median time of one capture + hash: every number carries this much latency.
overhead() {
  local id=$($WINID $1) ts=() t
  for i in {1..10}; do
    t=$EPOCHREALTIME; snap $id $FRAMES/o.png >/dev/null; ts+=$(( EPOCHREALTIME - t ))
  done
  printf '%.3f\n' ${${(on)ts}[5]}
}

median() { printf '%s\n' $@ | sort -n | awk '{a[NR]=$1} END {print (NR%2 ? a[(NR+1)/2] : (a[NR/2]+a[NR/2+1])/2)}'; }

footprint_mb() {
  footprint $(printf -- '-p %s ' $@) 2>/dev/null | awk '{ for (i = 1; i < NF; i++) if ($i == "Footprint:") {
      v = $(i+1); u = $(i+2); if (u ~ /GB/) v *= 1024; else if (u ~ /KB/) v /= 1024; t += v } }
    END { printf "%.0f\n", t }'
}

# lc_sort_by_name: send library.sort over LightCraft's control port, retrying
# until the server is up.
LC_PORT=${LC_PORT:-7981}
lc_sort_by_name() {
  local req='{"id":1,"method":"engine.execute","params":{"command":"library.sort","params":{"key":"fileName","ascending":true}}}'
  until print -r -- $req | nc -w 2 127.0.0.1 $LC_PORT 2>/dev/null | grep -q '"ok":true'; do sleep 0.05; done
}

# A webview app (RapidRAW is Tauri on WKWebView) draws its UI in WebKit helper
# processes that launchd starts, not the app, so they are not its children.
# Count the ones that appeared since the app launched.
webkit_pids() { { pgrep -f '^/System/Library/Frameworks/WebKit.framework/' || true; } | sort; }

setopt extendedglob
RAW_FILES=($PHOTOS/*.(#i)(arw|cr2|cr3|dng|nef|orf|pef|raf|rw2|srw)(.))

for run in $(seq 1 $RUNS); do
  # Fresh photos (LightPhotos caches thumbnails beside them), a fresh library,
  # and a fresh HOME so neither app restores settings or views from a past run.
  WORK=$(mktemp -d)
  mkdir $WORK/photos $WORK/home
  for p in ${${(o)RAW_FILES}[1,$COUNT]}; do cp $p $WORK/photos/; done

  case $APP_KIND in
    lightphotos) args=($WORK/photos) ;;
    lightcraft)  args=(--library $WORK/library --no-demo --control $LC_PORT $WORK/photos) ;;
    rapidraw)    # No folder argument: it reopens the last folder in its settings.
      args=()
      conf=$WORK/home/Library/Application\ Support/io.github.CyberTimon.RapidRAW
      mkdir -p $conf
      echo "{\"lastRootPath\":\"$WORK/photos\"${RAPIDRAW_SETTINGS:+,$RAPIDRAW_SETTINGS}}" > $conf/settings.json ;;
  esac
  webkit_before=$(webkit_pids)
  # Through LaunchServices, as Finder would: a binary started from a shell
  # doesn't become the active app, so its window never takes keys.
  t0=$EPOCHREALTIME
  open -n --env HOME=$WORK/home --stderr $WORK/stderr.log -a $APP --args $args
  pid=""
  while [[ -z $pid ]]; do pid=$(pgrep -n -f "^$BIN" || true); done
  while [[ -z $($WINID $pid) ]]; do sleep 0.01; done
  window=$(printf '%.3f' $(( EPOCHREALTIME - t0 )))
  # LightCraft sorts by capture date; sort it by file name, as the other apps
  # do, so every app opens the same photo and steps through the same ones.
  [[ $APP_KIND == lightcraft ]] && lc_sort_by_name
  place $pid
  grid=$(settle $pid $t0 grid); grid=${grid#* }
  id=$($WINID $pid)
  if [[ $APP_KIND == rapidraw ]]; then
    # RapidRAW starts on a welcome screen. grid_s adds the time from the
    # Continue click to the settled grid onto the time the welcome screen took
    # to settle, leaving out the quiet wait between them. The click is posted
    # twice because the first may only activate the window.
    before=$(snap $id $FRAMES/b.png)
    t=$EPOCHREALTIME; $INPUT click $id $CONT_X $CONT_Y 1; sleep 0.3; $INPUT click $id $CONT_X $CONT_Y 1
    r=$(settle $pid $t continue $before)
    grid=$(printf '%.3f' $(( grid + ${r#* } )))
  fi
  # Untimed: a window launched from a shell may not be key yet, and its first
  # click only activates it. Selecting the first photo is harmless in both apps.
  $INPUT click $id $FIRST_X $FIRST_Y 1
  sleep 1

  before=$(snap $id $FRAMES/b.png)
  t=$EPOCHREALTIME; $INPUT click $id $FIRST_X $FIRST_Y 2
  r=$(settle $pid $t open $before); open_first=${r% *} open=${r#* }

  nexts=() next_firsts=()
  for i in $(seq 1 $NEXTS); do
    before=$(snap $id $FRAMES/b.png)
    t=$EPOCHREALTIME; $INPUT key 124
    r=$(settle $pid $t next$i $before); next_firsts+=${r% *} nexts+=${r#* }
  done
  helpers=($(comm -13 <(echo $webkit_before) <(webkit_pids)))
  mem=$(footprint_mb $pid $helpers)
  oh=$(overhead $pid)
  kill $pid; while kill -0 $pid 2>/dev/null; do sleep 0.1; done; pid=""

  echo "{\"app\":\"$APP_KIND\",\"run\":$run,\"window_s\":$window,\"grid_s\":$grid,\"open_first_s\":$open_first,\"open_s\":$open,\"next_median_first_s\":$(median $next_firsts),\"next_median_s\":$(median $nexts),\"next_first_s\":[${(j:,:)next_firsts}],\"next_s\":[${(j:,:)nexts}],\"footprint_mb\":$mem,\"webkit_helpers\":${#helpers},\"capture_overhead_s\":$oh}" | tee -a $LOG
  rm -rf $WORK
done
rm -rf $FRAMES
echo "wrote $LOG; last frame of each step in $SHOTS"
