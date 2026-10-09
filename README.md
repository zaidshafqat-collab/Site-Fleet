# Site Fleet

A polished Next.js App Router marketing site with a Three.js factory visualization, Tailwind CSS, shadcn-style UI primitives, Jest/React Testing Library, and GitHub Pages static deployment.

## Requirements
- Node.js 20+
- npm 10+

## Local development
```bash
npm ci
npm run dev
```

## Tests and build
```bash
npm test
npm run build
```

The production static export is generated in `out/`. The workflow in `.github/workflows/deploy.yml` runs tests and publishes this directory to GitHub Pages after pushes to `main`.

## GitHub Pages setup
1. Push the project to a GitHub repository on the `main` branch.
2. In repository Settings → Pages, set the source to **GitHub Actions**.
3. The workflow deploys the static export. If deploying to a project page (`owner.github.io/repository`), configure `basePath` and `assetPrefix` in `next.config.ts` to match the repository name.

## Notes
- The 3D canvas is interactive: drag to orbit, scroll/pinch to zoom, and click a station to emit its ID through `onStation`.
- A radial canvas texture generates the soft floor shadow locally without image assets.
- GitHub Pages is static hosting; API routes and server-only runtime features are intentionally not used.
