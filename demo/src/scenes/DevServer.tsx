import React from "react";
import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { TerminalWindow } from "../components/Chrome";
import { Copy } from "../components/Copy";
import { blink, fadeIn, typed } from "../anim";
import { brand } from "../theme";

const CMD = "npx knobkit dev";

export const DevServer: React.FC = () => {
  const frame = useCurrentFrame();
  const cmd = typed(frame, 6, 28, CMD);
  const typing = frame < 32;

  return (
    <Stage>
      <TerminalWindow title="my-machine — zsh" width={940} height={480}>
        <div style={{ color: "#7d8595" }}>~/my-app $ npm install</div>
        <div style={{ color: "#7d8595" }}>added 58 packages in 4s</div>
        <div>
          <span style={{ color: "#5fb0fc" }}>~/my-app $ </span>
          <span>{cmd}</span>
          {typing && blink(frame) && <span style={{ borderLeft: "2px solid #d6dae3", marginLeft: 1 }} />}
        </div>
        <div style={{ minHeight: "1.65em" }}> </div>
        <div style={{ opacity: fadeIn(frame, 44, 6), fontSize: 22 }}>
          {"  "}
          <span style={{ color: "#ffffff", fontWeight: 700 }}>knobkit</span>
          {"  →  "}
          <span style={{ color: "#7ba6f7", textShadow: `0 0 22px ${brand.accent}88` }}>http://localhost:3000/</span>
        </div>
      </TerminalWindow>
      <Copy text="Dev server, instantly" delay={56} />
    </Stage>
  );
};
