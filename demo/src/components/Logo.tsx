import React from "react";

// design/logo.svg — "K-Tile": app-icon tile; the k's pivot is a knob cap.
export const Logo: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="4" y="4" width="56" height="56" rx="14" fill="#2563eb" />
    <g stroke="#ffffff" strokeWidth="7" strokeLinecap="round">
      <line x1="23" y1="16" x2="23" y2="48" />
      <line x1="23" y1="33" x2="42" y2="18" />
      <line x1="23" y1="33" x2="42" y2="46" />
    </g>
    <circle cx="23" cy="33" r="6.5" fill="#ffffff" />
    <circle cx="23" cy="33" r="2.8" fill="#1d4ed8" />
  </svg>
);
