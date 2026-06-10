import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Stage";
import { Copy } from "../components/Copy";
import { fadeIn } from "../anim";
import { code, fonts, stage } from "../theme";

const SWAP_AT = 42;

const Pill: React.FC<{ label: string; sub: string; at: number }> = ({ label, sub, at }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        opacity: fadeIn(frame, at, 10),
        transform: `translateY(${interpolate(frame, [at, at + 10], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        background: stage.chrome,
        border: `1px solid ${stage.chromeBorder}`,
        borderRadius: 12,
        padding: "14px 22px",
        fontFamily: fonts.sans,
        textAlign: "center",
      }}
    >
      <div style={{ color: "#fff", fontSize: 21, fontWeight: 650 }}>{label}</div>
      <div style={{ color: "#9aa2b1", fontSize: 16, marginTop: 3 }}>{sub}</div>
    </div>
  );
};

export const TwoTiers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const outGone = interpolate(frame, [SWAP_AT, SWAP_AT + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const inPop = spring({ frame: frame - SWAP_AT - 6, fps, config: { damping: 200 } });

  const mono = (color: string): React.CSSProperties => ({ fontFamily: fonts.mono, fontSize: 52, color });
  const swapped: React.CSSProperties = { position: "absolute", left: 0, top: 0, display: "inline-block", whiteSpace: "pre" };

  return (
    <Stage>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44, marginTop: -40 }}>
        <div
          style={{
            background: stage.terminalBg,
            border: `1px solid ${stage.chromeBorder}`,
            borderRadius: 16,
            padding: "38px 56px",
            boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
            display: "flex",
            whiteSpace: "pre",
          }}
        >
          <span style={mono(code.text)}>app.</span>
          <span style={{ position: "relative", display: "inline-block" }}>
            {/* invisible widest variant reserves the card width through the swap */}
            <span style={{ ...mono(code.text), visibility: "hidden" }}>mount("#root");</span>
            <span style={{ ...swapped, opacity: 1 - outGone, transform: `translateY(${-26 * outGone}px)` }}>
              <span style={mono(code.func)}>serve</span>
              <span style={mono(code.punct)}>();</span>
            </span>
            <span style={{ ...swapped, opacity: inPop, transform: `translateY(${26 * (1 - inPop)}px)` }}>
              <span style={mono(code.func)}>mount</span>
              <span style={mono(code.punct)}>(</span>
              <span style={mono(code.string)}>"#root"</span>
              <span style={mono(code.punct)}>);</span>
            </span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <Pill label="serve — handlers on Node" sub="secrets, big models — the server stays stateless" at={14} />
          <Pill label="mount — all in the browser" sub="same file; the models run client-side" at={SWAP_AT + 10} />
        </div>
      </div>
      <Copy
        text={
          <>
            In the browser instead? <span style={{ color: "#7ba6f7" }}>Swap one line.</span>
          </>
        }
        delay={SWAP_AT + 18}
        size={42}
      />
    </Stage>
  );
};
