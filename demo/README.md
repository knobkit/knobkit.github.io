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

# GIF for the README — derived from the MP4 via a two-pass palette (800×450, 12fps, ~4.8 MB)
docker compose run --rm render ffmpeg -i out/demo.mp4 -filter_complex \
  "fps=12,scale=800:-2:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle" \
  -y out/demo.gif
```

First run builds the image (~2 min). Output lands in `out/` on the host.

## Render (host fallback)

```bash
npm run render:mp4
npm run render:gif   # MP4 → GIF; needs ffmpeg on PATH (render:mp4 first)
```

## Tuning the GIF (budget: under 5 MB)

The GIF is a palette-quantized downscale of the MP4 — a two-pass palette (`stats_mode=diff` +
`paletteuse` with `diff_mode=rectangle`) is the big quality lever for the mostly-static scenes.
Levers, by impact: `scale` width (800 → 960 sharpens the editor text, ~+0.7 MB), `fps`
(12 → 10 shrinks), then `max_colors` (256 → 128). 800×450 @ 12fps lands ~4.8 MB.

## Layout

- `src/theme.ts` — design tokens lifted from knobkit's own CSS (`--pu-*`) and `design/logo.svg`
- `src/demoCode.ts` — the real `examples/live-meeting-help` app (condensed) shown in the editor scenes
- `src/scenes/` — Hook · Scaffold · DevServer · TheApp · LiveEdit · TwoTiers · Widgets · Outro
- `src/Root.tsx` — scene durations + 10-frame crossfades
