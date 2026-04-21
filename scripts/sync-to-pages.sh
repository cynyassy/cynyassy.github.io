#!/bin/bash

set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="/Users/Shishu/workspace/github.com/cynyassy/cynyassy.github.io"

if [ ! -d "$TARGET_DIR/.git" ]; then
  echo "Target repo not found at: $TARGET_DIR"
  echo "Make sure cynyassy.github.io is cloned locally before syncing."
  exit 1
fi

rsync -av \
  --delete \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "dist" \
  --exclude ".DS_Store" \
  "$SOURCE_DIR/" \
  "$TARGET_DIR/"

echo
echo "Synced source project into:"
echo "  $TARGET_DIR"
echo
echo "Next steps:"
echo "  1. cd \"$TARGET_DIR\""
echo "  2. git status"
echo "  3. git add . && git commit -m \"Your message\" && git push origin main"
