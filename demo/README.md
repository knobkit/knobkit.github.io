# knobkit demo video

Remotion source for the knobkit marketing MP4 and README GIF. One composition (`Demo`,
1280×720 @ 30fps, ~30s), rendered twice. Silent by design — persuasive copy overlays carry
the message.

## Preview (host)

```bash
npm install
npm run dev          # Remotion Studio at http://localhost:3000
```

## Render (Docker — recommended; ships Chromium deps + ffmpeg)

```bash
# MP4 for the marketing page → out/demo.mp4
docker compose run --rm render

# GIF for the README → out/demo.gif (640×360, ~10fps)
docker compose run --rm render \
  npx remotion render Demo out/demo.gif --codec=gif --every-nth-frame=3 --scale=0.5
```

First run builds the image (~2 min). Output lands in `out/` on the host.

## Render (host fallback)

```bash
npm run render:mp4
npm run render:gif
```

## If the GIF is too big (>10 MB)

In order of impact: raise `--every-nth-frame` to 4, drop `--scale` to 0.4, or palette-optimize
with system ffmpeg:

```bash
ffmpeg -i out/demo.gif -vf "palettegen=max_colors=128" -y palette.png
ffmpeg -i out/demo.gif -i palette.png -lavfi "paletteuse=dither=bayer" -y out/demo-optimized.gif
```

## Layout

- `src/theme.ts` — design tokens lifted from knobkit's own CSS (`--pu-*`) and `design/logo.svg`
- `src/demoCode.ts` — the real `examples/live-meeting-help` app (condensed) shown in the editor scenes
- `src/scenes/` — Hook · Scaffold · DevServer · TheApp · LiveEdit · TwoTiers · Widgets · Outro
- `src/Root.tsx` — scene durations + 10-frame crossfades
