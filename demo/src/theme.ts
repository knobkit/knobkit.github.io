// Design tokens lifted from the knobkit source so the demo matches the product.
// Accent + app palette: packages/knobkit/src/client/styles.css (:root --pu-*).
// Logo: design/logo.svg (K-Tile).

export const brand = {
  accent: "#2563eb",
  accentPress: "#1d4ed8",
};

// The knobkit app's own light UI — used inside the browser window.
export const app = {
  bg: "#f6f7f9",
  panel: "#ffffff",
  border: "#e3e6ea",
  text: "#1c1f23",
  muted: "#6b7280",
  radius: 12,
};

// The demo's dark "developer habitat" backdrop + chrome.
export const stage = {
  bg: "#0f1117",
  bgGlow: "#16203a",
  chrome: "#1b1e27",
  chromeBorder: "#2a2e3a",
  chromeText: "#9aa2b1",
  terminalBg: "#12141c",
};

// Editor syntax palette (One Dark-ish).
export const code = {
  bg: "#12141c",
  text: "#abb2bf",
  keyword: "#c678dd",
  string: "#98c379",
  func: "#61afef",
  property: "#e06c75",
  comment: "#5c6370",
  punct: "#8b93a3",
  lineNo: "#3d4452",
  highlight: "rgba(37, 99, 235, 0.18)",
};

export const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: '"SF Mono", "JetBrains Mono", Menlo, Consolas, "Liberation Mono", monospace',
};
