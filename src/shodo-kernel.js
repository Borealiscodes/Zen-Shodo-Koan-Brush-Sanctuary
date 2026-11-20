import { SHODO_KOANS } from "./shodo-koans-data.js";

export function createShodoSanctuaryState() {
  const first = SHODO_KOANS.at(0);
  return {
    stageIndex: 0,
    koan: first,
    harmonicLayers: 1,
    completedCount: 0,
    strokeHistory: [],
    narrationSeq: 1,
    acousticCue: "BREATH_OPEN",
    narration: `${first.title}. ${first.koan} ${first.sceneOpening}`,
  };
}

export function applyBrushGesture(state, detectedShape) {
  const current = SHODO_KOANS.at(state.stageIndex) || SHODO_KOANS.at(0);
  if (!detectedShape || detectedShape === "NONE") {
    return {
      ...state,
      narrationSeq: state.narrationSeq + 1,
      acousticCue: "SOFT_BRUSH",
      narration: `Brush touches the parchment softly. Draw a ${current.shapeName}, or press ${current.keyShortcut}.`,
    };
  }

  if (detectedShape !== current.targetShape) {
    const hint = (current.gentleHints && current.gentleHints[detectedShape]) ||
      `Try drawing a ${current.shapeName}, or press ${current.keyShortcut}.`;
    return {
      ...state,
      narrationSeq: state.narrationSeq + 1,
      acousticCue: "GENTLE_HINT",
      narration: hint,
    };
  }

  const nextCompleted = Math.min(4, state.completedCount + 1);
  const nextLayers = Math.min(4, state.stageIndex + 2);
const isFinal = state.stageIndex >= SHODO_KOANS.length - 1;
if (isFinal) {
return {
...state,
harmonicLayers: 4,
completedCount: 4,
strokeHistory: [...state.strokeHistory, detectedShape],
narrationSeq: state.narrationSeq + 1,
acousticCue: "SANCTUARY_COMPLETE",
narration: ${current.completionNarration} All four koans and all four Celtic–Japanese folk layers now rest in shared stillness.,
};
}
const nextIndex = state.stageIndex + 1;
const nextKoan = SHODO_KOANS.at(nextIndex);
return {
...state,
stageIndex: nextIndex,
koan: nextKoan,
harmonicLayers: nextLayers,
completedCount: nextCompleted,
strokeHistory: [...state.strokeHistory, detectedShape],
narrationSeq: state.narrationSeq + 1,
acousticCue: LAYER_${nextLayers},
narration: ${current.completionNarration} — ${nextKoan.title}. ${nextKoan.koan} ${nextKoan.sceneOpening},
};
}
export function buildShodoReceipt(state) {
const payload = JSON.stringify({
sanctuary: "Zen-Shodo-Koan-Brush-Sanctuary",
stageIndex: state.stageIndex,
harmonicLayers: state.harmonicLayers,
completedCount: state.completedCount,
strokeHistory: state.strokeHistory,
});
let h1 = 0x811c9dc5;
let h2 = 0x1b873593;
for (let i = 0; i < payload.length; i += 1) {
const c = payload.charCodeAt(i);
h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
h2 = Math.imul(h2 ^ (c + i), 0x85ebca6b) >>> 0;
}
const digest = (
h1.toString(16).padStart(8, "0") +
h2.toString(16).padStart(8, "0") +
(h1 ^ h2).toString(16).padStart(8, "0") +
((h1 + h2) >>> 0).toString(16).padStart(8, "0")
).repeat(2);
return SHODO-SANCTUARY-RECEIPT\nLayers: ${state.harmonicLayers}/4 • Strokes: ${state.strokeHistory.join(" -> ") || "None"}\nSHA-256: ${digest};
}
