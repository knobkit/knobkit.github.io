import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, fonts } from "../theme";

// Persuasive copy overlay — the primary message carrier (the demo is silent).
export const Copy: React.FC<{
  text: React.ReactNode;
  delay?: number;
  size?: number;
  position?: "bottom" | "center";
}> = ({ text, delay = 0, size = 44, position = "bottom" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: position === "bottom" ? "flex-end" : "center",
        alignItems: "center",
        padding: 44,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${y}px)`,
          color: "#ffffff",
          fontFamily: fonts.sans,
          fontSize: size,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          textAlign: "center",
          textShadow: "0 2px 12px rgba(0,0,0,0.7)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: "#7ba6f7", textShadow: `0 0 24px ${brand.accent}66` }}>{children}</span>
);
