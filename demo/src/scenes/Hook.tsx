import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { fadeIn } from "../anim";
import { fonts } from "../theme";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const tagOpacity = fadeIn(frame, 14, 14);
  const tagY = interpolate(frame, [14, 28], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
        <div style={{ transform: `scale(${pop})` }}>
          <Logo size={150} />
        </div>
        <div
          style={{
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            color: "#fff",
            fontFamily: fonts.sans,
            fontSize: 52,
            fontWeight: 750,
            letterSpacing: "-0.02em",
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.18,
          }}
        >
          Create TypeScript webapps in <span style={{ color: "#7ba6f7" }}>minutes.</span>
          <br />
          Ship, host and share everywhere.
        </div>
      </div>
    </Stage>
  );
};
