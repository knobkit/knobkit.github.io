# knobkit.github.io

The knobkit marketing site, served by GitHub Pages at <https://knobkit.github.io>.

## Layout

- `mocks/` — four design directions for the landing page (open `mocks/index.html` to flip
  through them; each has a light/dark toggle, `#dark`/`#light` hash forces a mode). The real
  `index.html` gets built from the winning direction.
- `playground/` + `assets/` — the live playground, a static `knobkit build` of
  [`examples/playground`](https://github.com/knobkit/knobkit/tree/main/examples/playground).
  `knobkit build` emits absolute `/assets/…` URLs (no `base` option yet), so the hashed assets
  live at the site root and `playground/index.html` works from its subpath.
- `demo/` — Remotion source for the demo video (see `demo/README.md` for preview/render
  commands, host and Docker).
- `demo.mp4` / `demo.gif` — the rendered demo. The MP4 is embedded by the landing page; the
  GIF is hot-linked by the main repo's README.

## Rebuilding

After a knobkit release (versions are lockstep):

```bash
# playground — from a checkout of knobkit/knobkit at the release tag
pnpm -F knobkit build && pnpm -F knobkit-example-playground build
cp examples/playground/dist/index.html <site>/playground/index.html
rm -rf <site>/assets && cp -R examples/playground/dist/assets <site>/assets

# demo — from <site>/demo
npm run render:mp4 && npm run render:gif
cp out/demo.mp4 out/demo.gif <site>/
```
