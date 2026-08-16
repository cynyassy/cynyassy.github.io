# Shashank / Cynyassy Portfolio

The live portfolio for Shashank Sharma / Cynyassy: a static, multi-page React site presenting product education, storytelling, design, growth, simulations, and technical builds.

Live site: <https://cynyassy.github.io>

## Architecture

- **React 18 + TypeScript** for the interface.
- **Vite** builds separate static entry points for the homepage and every case study.
- **Tailwind CSS and page-specific CSS** support the editorial visual system.
- **GitHub Pages** deploys the generated `dist` directory through GitHub Actions.
- The portfolio itself has no backend or runtime data store. External product links point to the independently deployed projects they describe.

## Pages

- Homepage: `index.html`
- AlgoTest: `projects/algotest.html`
- Brew Tracker: `projects/coffee-tools.html`
- Cynyassy: `projects/cynyassy.html`
- Perspectives: `projects/perspectives.html`
- Other Projects: `projects/other-projects.html`
- Work With Me: `projects/work-with-me.html`

## Development

This repository is the single source of truth. Run:

```bash
source ~/.nvm/nvm.sh
nvm use
npm install
npm run dev
```

Use Node `22.18.0`, defined in `.nvmrc` and the deployment workflow.

For release instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## Quality Checks

```bash
npm run build
npm run release:check
```

Pull requests to `main` run the production build. Pushing to `main` builds and deploys the site to GitHub Pages.

## Repository Hygiene

- `node_modules/` and `dist/` are generated and ignored.
- `.portfolio-memory/` is optional local working context, not release documentation.
- Older components and assets remain until they receive a dedicated cleanup pass; do not remove them opportunistically while changing portfolio content.
