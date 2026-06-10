import React from "react";
import { app, fonts, stage } from "../theme";

const TrafficLights: React.FC = () => (
  <div style={{ display: "flex", gap: 8 }}>
    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
      <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
    ))}
  </div>
);

const frame: React.CSSProperties = {
  borderRadius: 14,
  border: `1px solid ${stage.chromeBorder}`,
  overflow: "hidden",
  boxShadow: "0 24px 70px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.4)",
  display: "flex",
  flexDirection: "column",
};

const bar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "10px 14px",
  background: stage.chrome,
  borderBottom: `1px solid ${stage.chromeBorder}`,
  flex: "0 0 auto",
};

export const TerminalWindow: React.FC<{
  title?: string;
  width: number;
  height: number;
  children: React.ReactNode;
}> = ({ title = "zsh", width, height, children }) => (
  <div style={{ ...frame, width, height, background: stage.terminalBg }}>
    <div style={bar}>
      <TrafficLights />
      <div style={{ color: stage.chromeText, fontFamily: fonts.sans, fontSize: 14, flex: 1, textAlign: "center", marginRight: 50 }}>
        {title}
      </div>
    </div>
    <div style={{ flex: 1, padding: "20px 24px", fontFamily: fonts.mono, fontSize: 19, lineHeight: 1.65, color: "#d6dae3" }}>
      {children}
    </div>
  </div>
);

export const BrowserWindow: React.FC<{
  url: string;
  width: number;
  height: number;
  children: React.ReactNode;
}> = ({ url, width, height, children }) => (
  <div style={{ ...frame, width, height, background: app.bg }}>
    <div style={bar}>
      <TrafficLights />
      <div
        style={{
          flex: 1,
          background: "#11131a",
          border: `1px solid ${stage.chromeBorder}`,
          borderRadius: 8,
          padding: "5px 14px",
          color: stage.chromeText,
          fontFamily: fonts.sans,
          fontSize: 14,
          textAlign: "center",
        }}
      >
        {url}
      </div>
    </div>
    <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>{children}</div>
  </div>
);

export const EditorWindow: React.FC<{
  fileName: string;
  dirty?: boolean;
  width: number;
  height: number;
  children: React.ReactNode;
}> = ({ fileName, dirty = false, width, height, children }) => (
  <div style={{ ...frame, width, height, background: stage.terminalBg }}>
    <div style={bar}>
      <TrafficLights />
      <div style={{ color: stage.chromeText, fontFamily: fonts.sans, fontSize: 14, flex: 1, textAlign: "center", marginRight: 50 }}>
        {dirty ? "● " : ""}
        {fileName}
      </div>
    </div>
    <div style={{ flex: 1, padding: "16px 0", overflow: "hidden", position: "relative" }}>{children}</div>
  </div>
);
