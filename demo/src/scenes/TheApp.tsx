import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { BrowserWindow, EditorWindow } from "../components/Chrome";
import { CodeBlock } from "../components/CodeView";
import { MeetingApp, type ChatMsg } from "../components/MeetingApp";
import { Copy } from "../components/Copy";
import { fadeIn, press, typed } from "../anim";
import { A1, DEMO_LINES, Q1, TRANSCRIPT_LINES } from "../demoCode";

// Beats: slide 0-22 · go live 16 · scroll to handlers 28-58 · transcript lines
// 34/72/112 · type Q1 78-104 · send 108 · busy · answer streams 126-162.
export const TheApp: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = (from: number) =>
    interpolate(frame, [0, 22], [from, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
  const topLine = interpolate(frame, [28, 58], [1, 9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const logLines = [34, 72, 112]
    .filter((at) => frame >= at)
    .map((at, i) => ({ text: TRANSCRIPT_LINES[i]!, opacity: fadeIn(frame, at, 6) }));

  const sent = frame >= 108;
  const streamed = typed(frame, 126, 162, A1);
  const messages: ChatMsg[] = [
    ...(sent ? [{ role: "user", text: Q1 } as ChatMsg] : []),
    ...(frame >= 126 ? [{ role: "assistant", text: streamed, streaming: frame < 162 } as ChatMsg] : []),
  ];

  return (
    <Stage>
      <div style={{ display: "flex", gap: 24, marginTop: -50 }}>
        <div style={{ transform: `translateX(${slide(-420)}px)` }}>
          <EditorWindow fileName="my-app/demo.tsx" width={640} height={580}>
            <CodeBlock lines={DEMO_LINES} fontSize={14} topLine={topLine} />
          </EditorWindow>
        </div>
        <div style={{ transform: `translateX(${slide(420)}px)` }}>
          <BrowserWindow url="localhost:3000" width={500} height={580}>
            <MeetingApp
              micLive={frame >= 18}
              micScale={press(frame, 16)}
              logLines={logLines}
              messages={messages}
              typing={sent ? "" : typed(frame, 78, 104, Q1)}
              busy={frame >= 110 && frame < 162}
              busyFrame={frame}
            />
          </BrowserWindow>
        </div>
      </div>
      <Copy
        text={
          <>
            Three widgets. Two local models. <span style={{ color: "#7ba6f7" }}>One file.</span>
          </>
        }
        delay={132}
        size={40}
      />
    </Stage>
  );
};
