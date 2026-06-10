import { interpolate } from "remotion";

// Chars visible for a typewriter span running [start, end].
export const typed = (frame: number, start: number, end: number, text: string) =>
  text.slice(
    0,
    Math.floor(
      interpolate(frame, [start, end], [0, text.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

export const fadeIn = (frame: number, start: number, dur = 12) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Blinking cursor: ~0.5s period at 30fps.
export const blink = (frame: number) => Math.floor(frame / 16) % 2 === 0;

// Quick press: dip to 0.92 and back over 8 frames.
export const press = (frame: number, at: number) =>
  interpolate(frame, [at, at + 4, at + 8], [1, 0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
