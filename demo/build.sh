#!/bin/sh
# Rebuilds src/demo/ from Hodi's own components: run it when a component of hodi:sdk changes.
# Needs a clone of Hodi with its dependencies installed (npm ci), and Playwright with Chromium.
#   HODI_DIR=../hodi sh demo/build.sh
set -eu
docs=$(cd "$(dirname "$0")/.." && pwd)
hodi=$(cd "${HODI_DIR:?Set HODI_DIR to a clone of Hodi}" && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work" "$hodi/web/docs-demo"' EXIT

# The demo imports Hodi's components by their path in web/src, so it is built from inside Hodi's web folder.
cp -R "$docs/demo" "$hodi/web/docs-demo"
cd "$hodi"
DEMO_OUT="$work/demo" npx vite build --config web/docs-demo/vite.config.ts
PLAY_OUT="$work/play" npx vite build --config web/docs-demo/play.config.ts

DEMO_OUT="$work/demo" CAPTURE_OUT="$work/capture.json" node "$docs/demo/capture.cjs"
node "$docs/demo/write.mjs" "$work" "$docs/src/demo"
# The content cache holds pages built with the old files' names.
rm -rf "$docs/node_modules/.astro"
