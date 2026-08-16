# Portfolio Development and Deployment

## Source of Truth

This repository is the only editable source for the portfolio and the site deployed at <https://cynyassy.github.io>.

Do not edit or sync from the legacy local folder at:

```text
/Users/Shishu/workspace/github.com/cynyassy/cynyassy_portfolio/Interactive_Portfolio_Design
```

It is retained only as a local archive of earlier work.

## Local Development

```bash
cd "/Users/Shishu/workspace/github.com/cynyassy/cynyassy.github.io"
source ~/.nvm/nvm.sh
nvm use
npm install
npm run dev -- --host 127.0.0.1
```

Open <http://127.0.0.1:5173/>. Use the project pages under `/projects/` to check each case study.

## Release Workflow

Before publishing, run the production preflight:

```bash
npm run release:check
```

This builds the Vite multi-page site and checks the pending Git diff for whitespace errors. If it passes:

```bash
git status
git add .
git commit -m "Describe the portfolio update"
git push origin main
```

Pushing `main` runs GitHub Actions, which installs dependencies with `npm ci`, builds `dist`, and deploys it to GitHub Pages.

## Branches

Use a branch for substantial or experimental work:

```bash
git switch -c codex/short-description
```

Push the branch and open a pull request to receive the same build verification without deploying. Merge to `main` only after visual QA.

## Verification Checklist

- `npm run release:check` succeeds.
- Check the homepage and relevant project page at desktop and mobile widths.
- Confirm changed external links and `mailto:` links.
- Confirm the latest GitHub Actions run is green after pushing `main`.
- Hard-refresh <https://cynyassy.github.io> after deployment.

## Project Layout

- `src/app/`: homepage and shared components.
- `src/algotest/`, `src/coffee-tools/`, `src/cynyassy/`, `src/perspectives/`: major case-study pages.
- `src/other-projects/`, `src/work-with-me/`: supporting pages.
- `src/styles/`: shared and page-specific styles.
- `src/assets/`: portfolio images and proof artifacts.
- `projects/*.html`: Vite multi-page entry documents.
- `.github/workflows/deploy.yml`: build and GitHub Pages deployment.

## Maintenance Rule

Update this guide and `README.md` whenever the release workflow or source-of-truth decision changes. Keep local notes in `.portfolio-memory/` if useful, but do not rely on ignored files as the only record of a delivery-critical decision.
