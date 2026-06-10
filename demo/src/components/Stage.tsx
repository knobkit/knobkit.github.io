import React from "react";
import { AbsoluteFill } from "remotion";
import { stage } from "../theme";

// Dark "developer habitat" backdrop with a soft brand-blue glow.
export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 80% 70% at 50% 30%, ${stage.bgGlow} 0%, ${stage.bg} 70%)`,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </AbsoluteFill>
);
