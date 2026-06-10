import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "../components/Stage";
import { Copy } from "../components/Copy";
import { app, brand, code, fonts } from "../theme";

const Card: React.FC<{ label: string; index: number; children: React.ReactNode }> = ({ label, index, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 6 - index * 5, fps, config: { damping: 16, stiffness: 160 } });
  return (
    <div style={{ transform: `scale(${pop})`, display: "flex", flexDirection: "column", gap: 7, alignItems: "center" }}>
      <div
        style={{
          width: 252,
          height: 132,
          background: app.panel,
          border: `1px solid ${app.border}`,
          borderRadius: app.radius,
          boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
          padding: 14,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
      <div style={{ color: "#9aa2b1", fontFamily: fonts.mono, fontSize: 14 }}>{label}</div>
    </div>
  );
};

const Bubble: React.FC<{ mine?: boolean; at: number; children: React.ReactNode }> = ({ mine, at, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        opacity: o,
        alignSelf: mine ? "flex-end" : "flex-start",
        background: mine ? brand.accent : app.bg,
        color: mine ? "#fff" : app.text,
        border: mine ? "none" : `1px solid ${app.border}`,
        borderRadius: 9,
        padding: "5px 10px",
        fontSize: 12.5,
        fontFamily: fonts.sans,
      }}
    >
      {children}
    </div>
  );
};

const ChartMini: React.FC = () => {
  const frame = useCurrentFrame();
  const heights = [62, 88, 46, 74, 96];
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: "100%", padding: "0 8px" }}>
      {heights.map((h, i) => {
        const grown = interpolate(frame, [16 + i * 4, 40 + i * 4], [10, h], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return <div key={i} style={{ flex: 1, height: grown, background: brand.accent, opacity: 0.65 + i * 0.07, borderRadius: 4 }} />;
      })}
    </div>
  );
};

const TableMini: React.FC = () => (
  <div style={{ fontFamily: fonts.sans, fontSize: 12, color: app.text }}>
    <div style={{ display: "flex", fontWeight: 650, borderBottom: `2px solid ${app.border}`, paddingBottom: 5 }}>
      <span style={{ flex: 1.2 }}>city</span>
      <span style={{ flex: 1 }}>aqi</span>
      <span style={{ flex: 1 }}>trend</span>
    </div>
    {[
      ["Lisbon", "21", "▼"],
      ["Berlin", "34", "▲"],
      ["Austin", "48", "▼"],
      ["Tokyo", "29", "—"],
    ].map((r, i) => (
      <div key={i} style={{ display: "flex", padding: "4.5px 0", borderBottom: `1px solid ${app.border}`, color: app.muted }}>
        <span style={{ flex: 1.2, color: app.text }}>{r[0]}</span>
        <span style={{ flex: 1 }}>{r[1]}</span>
        <span style={{ flex: 1 }}>{r[2]}</span>
      </div>
    ))}
  </div>
);

const WebcamMini: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a1d26", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 54, height: 54, borderRadius: 27, background: "#2c3040" }} />
      <div style={{ position: "absolute", width: 96, height: 50, borderRadius: "50px 50px 0 0", background: "#2c3040", bottom: 0 }} />
      <div style={{ position: "absolute", top: 10, right: 12, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 9, height: 9, borderRadius: 5, background: "#dc2626", opacity: Math.floor(frame / 14) % 2 ? 0.25 : 1 }} />
        <span style={{ color: "#d6dae3", fontFamily: fonts.mono, fontSize: 11 }}>LIVE</span>
      </div>
    </div>
  );
};

const CodeMini: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: code.bg, padding: 14, fontFamily: fonts.mono, fontSize: 12.5, lineHeight: 1.7 }}>
    <div>
      <span style={{ color: code.keyword }}>const</span>
      <span style={{ color: code.text }}> editor = </span>
      <span style={{ color: code.func }}>code</span>
      <span style={{ color: code.punct }}>({"{"}</span>
    </div>
    <div>
      <span style={{ color: code.property }}>  language</span>
      <span style={{ color: code.punct }}>: </span>
      <span style={{ color: code.string }}>"python"</span>
      <span style={{ color: code.punct }}>,</span>
    </div>
    <div>
      <span style={{ color: code.property }}>  editable</span>
      <span style={{ color: code.punct }}>: </span>
      <span style={{ color: code.keyword }}>true</span>
      <span style={{ color: code.punct }}>,</span>
    </div>
    <div>
      <span style={{ color: code.punct }}>{"}"});</span>
    </div>
  </div>
);

const SliderMini: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = interpolate(frame, [18, 58], [22, 71], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, justifyContent: "center", height: "100%", fontFamily: fonts.sans }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: app.muted }}>
        <span>temperature</span>
        <span style={{ color: app.text, fontWeight: 600 }}>{(pct / 100).toFixed(2)}</span>
      </div>
      <div style={{ position: "relative", height: 6, background: app.bg, border: `1px solid ${app.border}`, borderRadius: 4 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: brand.accent, borderRadius: 4 }} />
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: -7,
            width: 18,
            height: 18,
            marginLeft: -9,
            borderRadius: 9,
            background: "#fff",
            border: `2px solid ${brand.accent}`,
          }}
        />
      </div>
      <div style={{ fontSize: 12.5, color: app.muted }}>
        model: <span style={{ color: app.text, fontWeight: 600 }}>whisper-base ▾</span>
      </div>
    </div>
  );
};

const GalleryMini: React.FC = () => {
  const frame = useCurrentFrame();
  const tones = ["#bfd3f7", "#9cb8ee", "#7ba6f7", "#5b8def", "#cfe0fb", "#88aef0"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, height: "100%" }}>
      {tones.map((t, i) => {
        const o = interpolate(frame, [14 + i * 4, 26 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <div key={i} style={{ background: t, borderRadius: 7, opacity: o }} />;
      })}
    </div>
  );
};

const ProgressMini: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = interpolate(frame, [14, 80], [8, 96], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", height: "100%", fontFamily: fonts.sans }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: app.muted }}>
        <span>loading weights…</span>
        <span style={{ color: app.text, fontWeight: 600 }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 10, background: app.bg, border: `1px solid ${app.border}`, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: brand.accent, borderRadius: 6 }} />
      </div>
      <div style={{ fontSize: 12, color: app.muted, fontFamily: fonts.mono }}>whisper-base.en · 145 MB</div>
    </div>
  );
};

export const Widgets: React.FC = () => (
  <Stage>
    <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: -34 }}>
      <div style={{ display: "flex", gap: 22 }}>
        <Card label="chat" index={0}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <Bubble mine at={10}>summarize the audio</Bubble>
            <Bubble at={26}>They locked Friday for launch…</Bubble>
          </div>
        </Card>
        <Card label="chart" index={1}>
          <ChartMini />
        </Card>
        <Card label="table" index={2}>
          <TableMini />
        </Card>
        <Card label="webcam" index={3}>
          <WebcamMini />
        </Card>
      </div>
      <div style={{ display: "flex", gap: 22 }}>
        <Card label="code" index={4}>
          <CodeMini />
        </Card>
        <Card label="slider · dropdown" index={5}>
          <SliderMini />
        </Card>
        <Card label="gallery" index={6}>
          <GalleryMini />
        </Card>
        <Card label="progress" index={7}>
          <ProgressMini />
        </Card>
      </div>
    </div>
    <Copy
      text={
        <>
          <span style={{ color: "#7ba6f7" }}>30+ widgets</span> — inputs, media, charts, code, layout.
        </>
      }
      delay={58}
      size={40}
    />
  </Stage>
);
