import React from "react";
import { code, fonts } from "../theme";

type Tok = { text: string; color: string };

const KEYWORDS = new Set(["import", "from", "const", "async", "await", "return", "export"]);

// Tiny deterministic highlighter — enough for the demo.tsx we display.
export const tokenize = (line: string): Tok[] => {
  const toks: Tok[] = [];
  const re =
    /(`(?:[^`\\]|\\.)*`?|"(?:[^"\\]|\\.)*"?|\/\/.*$|\$\{|[A-Za-z_$][\w$]*|\d+|\s+|.)/g;
  let m: RegExpExecArray | null;
  let prev = "";
  while ((m = re.exec(line))) {
    const t = m[0];
    let color = code.punct;
    if (t.startsWith("`") || t.startsWith('"')) color = code.string;
    else if (t.startsWith("//")) color = code.comment;
    else if (/^\s+$/.test(t)) color = code.text;
    else if (KEYWORDS.has(t)) color = code.keyword;
    else if (/^[A-Za-z_$]/.test(t)) {
      const rest = line.slice(re.lastIndex);
      if (rest.startsWith("(")) color = code.func;
      else if (prev === ".") color = code.property;
      else color = code.text;
    }
    toks.push({ text: t, color });
    if (!/^\s+$/.test(t)) prev = t;
  }
  return toks;
};

export const CodeLine: React.FC<{
  n: number;
  line: string;
  fontSize: number;
  highlighted?: boolean;
  cursorAt?: number | null; // char index the cursor sits after; null = no cursor
  cursorOn?: boolean;
}> = ({ n, line, fontSize, highlighted = false, cursorAt = null, cursorOn = true }) => {
  const shown = cursorAt === null ? line : line.slice(0, cursorAt);
  return (
    <div
      style={{
        display: "flex",
        fontFamily: fonts.mono,
        fontSize,
        lineHeight: 1.55,
        background: highlighted ? code.highlight : "transparent",
        padding: "0 18px",
        whiteSpace: "pre",
      }}
    >
      <span style={{ color: code.lineNo, width: fontSize * 1.7, flex: "0 0 auto", userSelect: "none" }}>{n}</span>
      <span>
        {tokenize(shown).map((t, i) => (
          <span key={i} style={{ color: t.color }}>
            {t.text}
          </span>
        ))}
        {cursorAt !== null && cursorOn && (
          <span style={{ borderLeft: `2px solid #d6dae3`, marginLeft: 1 }} />
        )}
      </span>
    </div>
  );
};

export const CodeBlock: React.FC<{
  lines: string[];
  fontSize?: number;
  highlightLine?: number; // 1-based
  cursor?: { line: number; at: number; on: boolean } | null;
  topLine?: number; // 1-based, fractional — scrolls the viewport
}> = ({ lines, fontSize = 17, highlightLine, cursor = null, topLine = 1 }) => (
  <div style={{ transform: `translateY(${-(topLine - 1) * fontSize * 1.55}px)` }}>
    {lines.map((l, i) => (
      <CodeLine
        key={i}
        n={i + 1}
        line={l}
        fontSize={fontSize}
        highlighted={highlightLine === i + 1}
        cursorAt={cursor && cursor.line === i + 1 ? cursor.at : null}
        cursorOn={cursor?.on ?? true}
      />
    ))}
  </div>
);
