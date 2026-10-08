#!/bin/zsh
# SPDX-License-Identifier: MIT OR Apache-2.0
#
# Record the home page demo: launch LightPhotos on its home page, open a fresh
# copy of a folder of photos, play the STEPS below with real clicks and keys,
# record the window, and write public/demo.mp4 and public/demo-poster.jpg.
#
#   tools/demo-video/record.sh <photos-folder> [LightPhotos.app]
#
# The folder's photos are taken in name order. STEPS expects 16 of them, with
# the 5th to 8th alike: they are stacked before recording starts, and the demo
# compares them. The app must have stacks and Compare (newer than 0.1.0).
set -euo pipefail
zmodload zsh/datetime

PHOTOS=${1:?usage: record.sh <photos-folder> [LightPhotos.app]}
APP=${2:-/Applications/LightPhotos.app}
NAME=${NAME:-Travel}         # the folder name the app shows
POSTER_AT=${POSTER_AT:-6}    # seconds into the video
HERE=${0:A:h}
SITE=${HERE:h:h}
OUT=${OUT:-$SITE/public}
RAW=${RAW:-}                 # keep the uncut recording here, to check the cut spans

# The window's content area in points. The recording is twice this on a Retina
# display and is scaled to 1920x1200; a smaller window gives bigger thumbnails.
WIN_W=1440 WIN_H=900
TITLE_H=32

# The demo, one step per line:
#   wait <s> | key <name> [mods] | type <text> | click <x> <y> [mods] [clicks]
#   move <x> <y> | drag <x1> <y1> <x2> <y2> [ms] | scroll <dy> | cut | uncut
# x, y are points from the content area's top-left; mods is cmd,shift,... or -.
# The video leaves out everything between cut and uncut: the folder picker
# shows the recording machine's own files.
STEPS=(
  'wait 1.2'
  'click 806 463'                          # Open Folder
  'cut'  'wait 1.5'
  'type /'  'wait 1.0'  'type @FOLDER@'  'wait 0.6'
  'key return'  'wait 1.0'  'key return'
  'wait 0.3'  'uncut'
  'wait 1.4'
  # Browse in the Loupe, past the stack, to the moon bridge.
  'click 324 212'  'wait 0.5'  'key e'  'wait 1.2'
  'key right'  'wait 0.9'  'key right'  'wait 0.9'  'key right'  'wait 0.9'
  'key right'  'wait 0.7'  'key right'  'wait 0.7'  'key right'  'wait 1.0'
  # Develop it: Exposure, Highlights, Whites, Shadows, Blacks, Contrast.
  'move 1200 500'  'scroll -200'  'wait 0.4'
  'drag 1221 417 1227 417 300'  'wait 0.15'
  'drag 1221 529 1153 529 400'  'wait 0.15'
  'drag 1221 641 1243 641 300'  'wait 0.15'
  'drag 1221 585 1281 585 400'  'wait 0.15'
  'drag 1221 697 1191 697 300'  'wait 0.15'
  'drag 1221 473 1259 473 300'  'wait 0.6'
  # Hand the keys back to the photo, rate it, and step back to the stack.
  'key escape'  'wait 0.2'  'key 5'  'wait 0.7'
  # The orchid stack: compare its four frames at 100%.
  'key left'  'wait 0.6'  'key left'  'wait 0.6'  'key c'  'wait 2.2'
  'click 1188 235'  'wait 0.9'
  'click 862 560'  'wait 0.9'
  'click 779 708'  'wait 0.6'               # five stars on the third frame
  'click 1157 383'  'wait 0.9'               # reject the second
  # Close Compare, then the Grid's Adjustments, which follow from the Loupe.
  'click 1415 186'  'wait 0.4'  'key g'  'wait 0.6'  'click 1415 60'  'wait 0.8'
  # Rate and label in the Grid.
  'click 324 212'  'wait 0.4'  'key 5'  'wait 0.3'  'key 6'
  'wait 0.5'  'key right'  'wait 0.3'  'key 4'
  'wait 0.5'  'key right'  'wait 0.3'  'key 3'
  'wait 0.5'  'key right'  'wait 0.3'  'key 5'  'wait 0.3'  'key 8'
  'wait 0.8'
  # Keep four stars and up, and export them.
  'click 542 90'  'wait 1.0'
  'key a cmd'  'wait 0.6'
  'key e cmd,shift'  'wait 1.2'
  'key return'
  'wait 4.0'
)

# macOS virtual key codes for the key names STEPS uses.
typeset -A KEYCODE=(
  0 29  1 18  2 19  3 20  4 21  5 23  6 22  7 26  8 28  9 25
  a 0  c 8  e 14  g 5  space 49  return 36  escape 53
  left 123  right 124  down 125  up 126
)

for tool in capture:$HERE/capture.swift input:$HERE/input.swift winid:$HERE/../desktop-bench/winid.swift; do
  bin=${TMPDIR:-/tmp}/demo-video-${tool%%:*} src=${tool#*:}
  if [[ ! -x $bin || $src -nt $bin ]]; then
    swiftc -O -o $bin $src
  fi
done
CAPTURE=${TMPDIR:-/tmp}/demo-video-capture
INPUT=${TMPDIR:-/tmp}/demo-video-input
WINID=${TMPDIR:-/tmp}/demo-video-winid

BIN=$APP/Contents/MacOS/$(/usr/libexec/PlistBuddy -c 'Print :CFBundleExecutable' $APP/Contents/Info.plist)
WORK=$(mktemp -d)
pid="" rec=""
trap '[[ -n $rec ]] && kill $rec 2>/dev/null; [[ -n $pid ]] && kill $pid 2>/dev/null; rm -rf $WORK' EXIT
STEPS=("${(@)STEPS//@FOLDER@/${${WORK}#/}/$NAME}")

# Fresh photos (LightPhotos keeps ratings, stacks and thumbnails beside them)
# and a fresh HOME, so the app starts from defaults with nothing rated.
mkdir $WORK/$NAME $WORK/home
find $PHOTOS -maxdepth 1 -type f ! -name '.*' ! -name '*.xmp' | sort | while read -r p; do cp $p $WORK/$NAME/; done
(( $(ls $WORK/$NAME | wc -l) == 16 )) || { echo "STEPS expects 16 photos in $PHOTOS" >&2; exit 1; }

# Stack the four alike frames, and draw every thumbnail ahead of time, with
# the app's own headless driver.
print -l "size $WIN_W $WIN_H" idle 'click-cell 4' 'click-cell 7 shift' 'key cmd+g' idle quit > $WORK/stack.txt
(cd $WORK && HOME=$WORK/home $BIN --drive stack.txt --drive-out $WORK/drive $NAME > /dev/null 2>&1)
ls $WORK/$NAME/.lightphotos/groups/*.json > /dev/null || { echo "stacking failed" >&2; exit 1; }
rm -rf $WORK/home $WORK/drive && mkdir $WORK/home

# Through LaunchServices, as Finder would: a binary started from a shell
# doesn't become the active app, so its window never takes keys.
open -n --env HOME=$WORK/home -a $APP
while [[ -z $pid ]]; do pid=$(pgrep -n -f "^$BIN" || true); done
while [[ -z $($WINID $pid) ]]; do sleep 0.05; done
osascript -e "tell application \"System Events\" to tell window 1 of (first process whose unix id is $pid) to set size to {$WIN_W, $(( WIN_H + TITLE_H ))}" >/dev/null
id=$($WINID $pid)
sleep 1.5

$CAPTURE $id $WORK/raw.mov $TITLE_H > $WORK/capture.log &
rec=$!
until grep -q recording $WORK/capture.log 2>/dev/null; do
  kill -0 $rec 2>/dev/null || { echo "capture failed; is Screen Recording allowed for this terminal?" >&2; exit 1; }
  sleep 0.05
done
start=$EPOCHREALTIME

# Starting the capture hands focus to whichever app was behind LightPhotos, so
# bring it forward now. Its first click only activates the window, so click
# the empty top bar, where a click does nothing.
osascript -e "tell application \"System Events\" to set frontmost of (first process whose unix id is $pid) to true" >/dev/null
$INPUT $id click 900 $(( 14 + TITLE_H ))

cuts=()
for step in $STEPS; do
  set -- ${=step}
  case $1 in
    wait)   sleep $2 ;;
    key)    $INPUT $id key ${KEYCODE[$2]:?unknown key $2} ${3:--} ;;
    type)   $INPUT $id type ${step#type } ;;
    click)  $INPUT $id click $2 $(( $3 + TITLE_H )) ${4:--} ${5:-1} ;;
    move)   $INPUT $id move $2 $(( $3 + TITLE_H )) ;;
    drag)   $INPUT $id drag $2 $(( $3 + TITLE_H )) $4 $(( $5 + TITLE_H )) ${6:-600} ;;
    scroll) $INPUT $id scroll $2 ;;
    cut|uncut) cuts+=$(( EPOCHREALTIME - start )) ;;
    *)      echo "unknown step: $step" >&2; exit 2 ;;
  esac
done

kill -INT $rec; wait $rec; rec=""
kill $pid; pid=""
[[ -n $RAW ]] && cp $WORK/raw.mov $RAW

# Drop each cut span, then H.264 for every browser, 30 fps, moov atom first so
# it starts playing early.
keep=1
for a b in $cuts; do keep+="*not(between(t,$a,$b))"; done
ffmpeg -v error -y -i $WORK/raw.mov -an \
  -vf "fps=30,select='$keep',setpts=N/30/TB,scale=1920:1200:flags=lanczos,format=yuv420p" \
  -c:v libx264 -profile:v high -preset veryslow -crf ${CRF:-26} -movflags +faststart \
  $OUT/demo.mp4
ffmpeg -v error -y -ss $POSTER_AT -i $OUT/demo.mp4 -frames:v 1 -q:v 3 $OUT/demo-poster.jpg

printf 'wrote %s (%s KB, %.1f s) and %s\n' $OUT/demo.mp4 $(( $(stat -f %z $OUT/demo.mp4) / 1024 )) \
  $(ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT/demo.mp4) $OUT/demo-poster.jpg
