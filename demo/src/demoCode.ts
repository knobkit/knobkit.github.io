// examples/live-meeting-help/demo.tsx — condensed to fit the editor panel
// (long prompt strings folded into ask(), casts dropped); the widgets, events,
// and read/write/stream API shown are the real thing.
export const DEMO_LINES = [
  'import { knobkit, mic, log, chat } from "knobkit";',
  'import { pipeline, TextStreamer } from "@huggingface/transformers";',
  'import { ask } from "./prompt";',
  "",
  "const transcriber = await pipeline(",
  '  "automatic-speech-recognition", "onnx-community/whisper-base.en");',
  "const generate = await pipeline(",
  '  "text-generation", "onnx-community/Qwen2.5-0.5B-Instruct");',
  "",
  "const audio = mic({ every: 3000 });",
  "const transcript = log();",
  'const convo = chat({ placeholder: "Ask about the audio…" });',
  "",
  "const app = knobkit({",
  '  title: "Live meeting help",',
  "  widgets: [audio, transcript, convo],",
  "});",
  "",
  "app.on(audio.clip, async (samples) => {",
  "  const { text } = await transcriber(samples);",
  "  transcript.push(text.trim());",
  "});",
  "",
  "app.on(convo.sent, convo.busy(async ({ text }) => {",
  '  const system = "Answer concisely.";',
  "  const lines = await transcript.all();",
  '  convo.say({ role: "user", content: text });',
  '  convo.say({ role: "assistant", content: "" });',
  "  const streamer = new TextStreamer(generate.tokenizer,",
  "    { callback_function: (t) => convo.append(t) });",
  "  await generate(ask(system, lines, text), { streamer });",
  "}));",
  "",
  "app.serve();",
];

// The pirate edit: "Answer concisely." -> "Answer like a pirate."
export const EDIT_LINE = 25; // 1-based
export const EDIT_PREFIX = '  const system = "Answer ';
export const EDIT_OLD = "concisely.";
export const EDIT_NEW = "like a pirate.";
export const EDIT_SUFFIX = '";';

// What the meeting mic hears, ~3s clip at a time.
export const TRANSCRIPT_LINES = [
  "I think the beta is ready to ship.",
  "Marketing wants the demo video first.",
  "Fine — let's lock Friday for launch.",
  "Sarah will own the changelog.",
  "Backend needs one more migration.",
  "We'll run the migration tonight.",
];

export const Q1 = "What did we decide?";
export const A1 = "Ship Friday. Demo video first; Sarah owns the changelog.";
export const Q2 = "And the deadline?";
export const A2 = "Arrr — Friday be the launch, matey. The migration sails tonight!";
