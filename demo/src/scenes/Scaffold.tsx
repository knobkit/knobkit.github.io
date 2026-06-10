import React from "react";
import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { TerminalWindow } from "../components/Chrome";
import { Copy } from "../components/Copy";
import { blink, fadeIn, typed } from "../anim";

const CMD = "npm create knobkit@latest my-app";

// Output reproduced from packages/create-knobkit/index.js.
const OUTPUT: { text: string; at: number; dim?: boolean }[] = [
  { text: "", at: 76 },
  { text: "  Created my-app (serve) in my-app", at: 76 },
  { text: "", at: 82 },
  { text: "  Next steps:", at: 82 },
  { text: "    cd my-app", at: 88 },
  { text: "    npm install", at: 94 },
  { text: "    npm run dev", at: 100 },
];

export const Scaffold: React.FC = () => {
  const frame = useCurrentFrame();
  const cmd = typed(frame, 8, 50, CMD);
  const answer = typed(frame, 62, 72, "serve");
  const typing = frame < 54;
  const answering = frame >= 56 && frame < 76;

  return (
    <Stage>
      <TerminalWindow title="my-machine — zsh" width={940} height={480}>
        <div>
          <span style={{ color: "#5fb0fc" }}>~ $ </span>
          <span>{cmd}</span>
          {typing && blink(frame) && <span style={{ borderLeft: "2px solid #d6dae3", marginLeft: 1 }} />}
        </div>
        <div style={{ opacity: fadeIn(frame, 56, 5), minHeight: "1.65em" }}>
          <span style={{ color: "#7d8595" }}>Runtime — mount (browser) or serve (node)? (mount) </span>
          <span>{answer}</span>
          {answering && blink(frame) && <span style={{ borderLeft: "2px solid #d6dae3", marginLeft: 1 }} />}
        </div>
        {OUTPUT.map((l, i) => (
          <div key={i} style={{ opacity: fadeIn(frame, l.at, 6), color: l.dim ? "#7d8595" : undefined, minHeight: "1.65em" }}>
            {l.text || " "}
          </div>
        ))}
      </TerminalWindow>
      <Copy text="One command to start" delay={92} />
    </Stage>
  );
};
