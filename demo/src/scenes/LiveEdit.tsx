import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { BrowserWindow, EditorWindow } from "../components/Chrome";
import { CodeBlock } from "../components/CodeView";
import { MeetingApp, type ChatMsg } from "../components/MeetingApp";
import { Copy } from "../components/Copy";
import { blink, fadeIn, typed } from "../anim";
import {
  A1,
  A2,
  DEMO_LINES,
  EDIT_LINE,
  EDIT_NEW,
  EDIT_OLD,
  EDIT_PREFIX,
  EDIT_SUFFIX,
  Q1,
  Q2,
  TRANSCRIPT_LINES,
} from "../demoCode";
import { code, fonts } from "../theme";

// Beats: backspace "concisely." 14-34 · type "like a pirate." 38-64 · save 74 ·
// toast 78 · type Q2 88-110 · send 114 · busy · pirate answer streams 134-192.
export const LiveEdit: React.FC = () => {
  const frame = useCurrentFrame();

  // The edited line: old string shrinks char-by-char, new one types in.
  const oldShown = Math.ceil(
    interpolate(frame, [14, 34], [EDIT_OLD.length, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const middle = frame < 36 ? EDIT_OLD.slice(0, oldShown) : typed(frame, 38, 64, EDIT_NEW);
  const lines = [...DEMO_LINES];
  lines[EDIT_LINE - 1] = EDIT_PREFIX + middle + EDIT_SUFFIX;

  const editing = frame >= 8 && frame < 72;
  const dirty = frame >= 14 && frame < 74;
  const saveFlash = interpolate(frame, [74, 76, 90], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logLines = [24, 100, 165]
    .filter((at) => frame >= at)
    .map((at, i) => ({ text: TRANSCRIPT_LINES[i + 3]!, opacity: fadeIn(frame, at, 6) }));

  const sent = frame >= 114;
  const streamed = typed(frame, 134, 192, A2);
  const messages: ChatMsg[] = [
    { role: "user", text: Q1 },
    { role: "assistant", text: A1 },
    ...(sent ? [{ role: "user", text: Q2 } as ChatMsg] : []),
    ...(frame >= 134 ? [{ role: "assistant", text: streamed, streaming: frame < 192 } as ChatMsg] : []),
  ];

  return (
    <Stage>
      <div style={{ display: "flex", gap: 24, marginTop: -50 }}>
        <div style={{ position: "relative" }}>
          <EditorWindow fileName="my-app/demo.tsx" dirty={dirty} width={640} height={580}>
            <CodeBlock
              lines={lines}
              fontSize={14}
              topLine={9}
              highlightLine={frame >= 8 ? EDIT_LINE : undefined}
              cursor={
                editing
                  ? { line: EDIT_LINE, at: (EDIT_PREFIX + middle).length, on: blink(frame) }
                  : null
              }
            />
          </EditorWindow>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 14,
              boxShadow: `inset 0 0 0 2px rgba(37,99,235,${saveFlash})`,
              pointerEvents: "none",
            }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <BrowserWindow url="localhost:3000" width={500} height={580}>
            <MeetingApp
              micLive
              logLines={logLines}
              messages={messages}
              typing={sent ? "" : typed(frame, 88, 110, Q2)}
              busy={frame >= 116 && frame < 192}
              busyFrame={frame}
            />
            <div
              style={{
                position: "absolute",
                right: 14,
                bottom: 14,
                opacity: fadeIn(frame, 78, 5) * (frame > 112 ? 0 : 1),
                background: "#12141c",
                color: code.string,
                fontFamily: fonts.mono,
                fontSize: 13,
                padding: "7px 12px",
                borderRadius: 8,
                border: "1px solid #2a2e3a",
              }}
            >
              ● reconnected — state intact
            </div>
          </BrowserWindow>
        </div>
      </div>
      <Copy
        text={
          <>
            Edit. Save. <span style={{ color: "#7ba6f7" }}>Live.</span>
          </>
        }
        delay={172}
        size={48}
      />
    </Stage>
  );
};
