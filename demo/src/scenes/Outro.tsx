import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { fadeIn } from "../anim";
import { brand, fonts, stage } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 200 } });

  return (
    <Stage>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, transform: `scale(${pop})` }}>
          <Logo size={96} />
          <div style={{ color: "#fff", fontFamily: fonts.sans, fontSize: 72, fontWeight: 750, letterSpacing: "-0.03em" }}>
            knobkit
          </div>
        </div>
        <div
          style={{
            opacity: fadeIn(frame, 16),
            background: stage.chrome,
            border: `1px solid ${brand.accent}`,
            boxShadow: `0 0 34px ${brand.accent}44`,
            borderRadius: 12,
            padding: "15px 30px",
            fontFamily: fonts.mono,
            fontSize: 27,
            color: "#e8ecf3",
          }}
        >
          <span style={{ color: "#5fb0fc" }}>$ </span>npm create knobkit@latest
        </div>
        <div style={{ opacity: fadeIn(frame, 28), color: "#9aa2b1", fontFamily: fonts.sans, fontSize: 21 }}>
          MIT · github.com/knobkit/knobkit
        </div>
      </div>
    </Stage>
  );
};
