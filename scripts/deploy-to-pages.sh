#!/bin/bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="/Users/Shishu/workspace/github.com/cynyassy/cynyassy.github.io"

"$PROJECT_DIR/scripts/sync-to-pages.sh"

echo
echo "Git status for Pages repo:"
git -C "$TARGET_DIR" status --short
