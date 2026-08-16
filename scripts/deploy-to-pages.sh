#!/bin/bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$PROJECT_DIR"

echo "Building the portfolio..."
npm run build

echo
echo "Checking the pending change set..."
git diff --check

echo
echo "Git status:"
git status --short

echo
echo "Release preflight complete. Review the changes, then run:"
BRANCH="$(git branch --show-current)"
if [ -z "$BRANCH" ]; then
  BRANCH="main"
fi
echo "  git add ."
echo "  git commit -m \"Describe the portfolio update\""
echo "  git push origin $BRANCH"
