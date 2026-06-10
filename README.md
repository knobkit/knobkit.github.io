# knobkit.github.io

The knobkit marketing site, served by GitHub Pages at <https://knobkit.dev>.

## Layout

- `index.html` — the landing page: minimal hero (copy left, demo video right), the live
  playground full-width below. Self-contained HTML/CSS/JS, light/dark via system preference
  plus a toggle. Preview locally with `python3 -m http.server` from the repo root (the
  playground iframe and video need HTTP, not file://).
- `playground-src/` — the playground source (moved here from the main repo's
  `examples/playground`); depends on the published `knobkit` from npm, so the public
  playground always matches the version users install.
- `playground/` + `assets/` — the deployed playground, a static `knobkit build` of
  `playground-src/`. `knobkit build` emits absolute `/assets/…` URLs (no `base` option yet),
  so the hashed assets live at the site root and `playground/index.html` works from its subpath.
- `demo/` — Remotion source for the demo video (see `demo/README.md` for preview/render
  commands, host and Docker).
- `demo.mp4` / `demo.gif` — the rendered demo. The MP4 is embedded by the landing page; the
  GIF is hot-linked by the main repo's README.
- `.github/workflows/pages.yml` — deploys the repo as-is to GitHub Pages on push to `main`
  (set Pages source to "GitHub Actions" in the repo settings).

When the playground is rebuilt, bump the `?v=N` query on the `/playground/` iframe in
`index.html` so cached copies of the old `playground/index.html` (with stale asset hashes)
can't serve a blank embed.

## Rebuilding

After a knobkit release (versions are lockstep):

```bash
# playground — from playground-src/ (bump the knobkit dep to the new version first)
npm install && npm run build
cp dist/index.html ../playground/index.html
rm -rf ../assets && cp -R dist/assets ../assets

# demo — from <site>/demo
npm run render:mp4 && npm run render:gif
cp out/demo.mp4 out/demo.gif <site>/
```
