import React from "react";
import { app, brand, fonts } from "../theme";

export type ChatMsg = { role: "user" | "assistant"; text: string; streaming?: boolean };

// Faithful recreation of the live-meeting-help example as the knobkit client
// renders it: mic toggle (Go live / ● Live), log widget, chat with busy bar.
export const MeetingApp: React.FC<{
  micLive: boolean;
  micScale?: number;
  logLines: { text: string; opacity: number }[];
  messages: ChatMsg[];
  typing: string; // current text in the chat input
  busy: boolean;
  busyFrame: number; // drives the indeterminate bar
}> = ({ micLive, micScale = 1, logLines, messages, typing, busy, busyFrame }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: app.bg,
      display: "flex",
      justifyContent: "center",
      paddingTop: 18,
      fontFamily: fonts.sans,
    }}
  >
    <div
      style={{
        width: 452,
        height: "fit-content",
        background: app.panel,
        border: `1px solid ${app.border}`,
        borderRadius: app.radius,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 10px 28px rgba(0,0,0,0.05)",
        padding: "18px 20px 20px",
        color: app.text,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 650, letterSpacing: "-0.01em" }}>Live meeting help</div>
      <div style={{ fontSize: 12.5, color: app.muted, margin: "3px 0 14px" }}>
        The mic streams ~3s clips; ask the analyst about the audio.
      </div>

      <div
        style={{
          display: "inline-block",
          background: micLive ? "#dc2626" : brand.accent,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          padding: "8px 16px",
          borderRadius: 9,
          transform: `scale(${micScale})`,
          marginBottom: 12,
        }}
      >
        {micLive ? "● Live" : "Go live"}
      </div>

      <div
        style={{
          background: app.bg,
          border: `1px solid ${app.border}`,
          borderRadius: 9,
          padding: "8px 12px",
          fontSize: 13,
          lineHeight: 1.55,
          minHeight: 92,
          marginBottom: 12,
          color: app.text,
        }}
      >
        {logLines.length === 0 && <span style={{ color: app.muted }}>(transcript)</span>}
        {logLines.slice(-4).map((l, i) => (
          <div key={i} style={{ opacity: l.opacity }}>
            {l.text}
          </div>
        ))}
      </div>

      <div style={{ border: `1px solid ${app.border}`, borderRadius: 9, overflow: "hidden" }}>
        <div style={{ height: 3, background: app.bg, position: "relative", overflow: "hidden" }}>
          {busy && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "35%",
                left: `${((busyFrame * 6) % 145) - 40}%`,
                background: brand.accent,
                borderRadius: 2,
              }}
            />
          )}
        </div>
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8, minHeight: 120 }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: 330,
                background: m.role === "user" ? brand.accent : app.bg,
                color: m.role === "user" ? "#fff" : app.text,
                border: m.role === "user" ? "none" : `1px solid ${app.border}`,
                borderRadius: 10,
                padding: "7px 11px",
                fontSize: 13.5,
                lineHeight: 1.45,
              }}
            >
              {m.text}
              {m.streaming && <span style={{ borderLeft: `2px solid ${app.muted}`, marginLeft: 2 }} />}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: `1px solid ${app.border}`,
            padding: "9px 12px",
            fontSize: 13.5,
            color: typing ? app.text : app.muted,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ flex: 1 }}>
            {typing || "Ask about the audio…"}
            {typing && <span style={{ borderLeft: `1.5px solid ${app.text}`, marginLeft: 1 }} />}
          </span>
          <span style={{ color: brand.accent, fontWeight: 700 }}>➤</span>
        </div>
      </div>
    </div>
  </div>
);
