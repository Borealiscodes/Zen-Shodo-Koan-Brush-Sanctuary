import { classifyBrushStrokes } from "./brush-classifier.js";
import { SHODO_KOANS } from "./shodo-koans-data.js";
import { createShodoSanctuaryState, applyBrushGesture, buildShodoReceipt } from "./shodo-kernel.js";
import { createCelticShodoSoundscape } from "./celtic-shodo-soundscape.js";
function fnv1a32(str) {
const bytes = new TextEncoder().encode(String(str || ""));
let h = 0x811c9dc5;
for (let i = 0; i < bytes.length; i += 1) {
h ^= bytes[i];
h = Math.imul(h, 0x01000193) >>> 0;
}
return h.toString(16).padStart(8, "0");
}
function formatKoanIntro(k) {
if (!k || Array.isArray(k)) return "";
return k.title + ". " + k.koan + " " + k.sceneOpening;
}
export function initShodoBrushApp() {
const soundscape = createCelticShodoSoundscape();
const hudStageEl = document.getElementById("hud-stage");
const resetBtn = document.getElementById("btn-reset");
const clearCanvasBtn = document.getElementById("btn-clear-canvas");
const koanTitleEl = document.getElementById("koan-title");
const koanQuoteEl = document.getElementById("koan-quote");
const storyVoiceEl = document.getElementById("storyteller-voice");
const canvasEl = document.getElementById("washi-canvas");
const shapeDeckEl = document.getElementById("shape-deck");
const parallelCritiqueEl = document.getElementById("parallel-critique");
const receiptBtn = document.getElementById("btn-receipt");
const receiptBox = document.getElementById("receipt-output");
let state = createShodoSanctuaryState();
let lastSpokenSeq = -1;
let hasStartedIntro = false;
let spokenLinesQueue = [formatKoanIntro(state.koan)];
let strokes = [];
let currentStroke = [];
let isDrawing = false;
let evalTimer = null;
const cuePlayer = typeof Audio !== "undefined" ? new Audio() : null;
if (cuePlayer) cuePlayer.volume = 0.94;
const ensureAudioUnmuted = () => {
try {
if (soundscape.isMuted()) {
soundscape.toggleMute();
soundscape.syncLayers(state);
}
} catch (_) {}
};
const speakLines = (lines) => {
if (typeof window === "undefined") return;
if (cuePlayer) {
cuePlayer.pause();
cuePlayer.onended = null;
}
if ("speechSynthesis" in window) window.speechSynthesis.cancel();
const list = (Array.isArray(lines) ? lines : [lines]).map((s) => String(s || "").trim()).filter(Boolean);
if (list.length === 0) return;
const fallbackSpeech = (startIdx = 0) => {
if (!("speechSynthesis" in window)) return;
const utter = new SpeechSynthesisUtterance(list.slice(startIdx).join(" "));
utter.rate = 0.86;
utter.pitch = 0.95;
window.speechSynthesis.speak(utter);
};
if (cuePlayer) {
const playAt = (idx) => {
if (idx >= list.length) return;
        cuePlayer.src = "audio/cue_" + fnv1a32(list.at(idx)) + ".wav";
cuePlayer.onended = () => {
if (idx + 1 < list.length) playAt(idx + 1);
};
        cuePlayer.play()
.then(() => {
hasStartedIntro = true;
})
.catch(() => {});
};
playAt(0);
return;
}
fallbackSpeech(0);
};
const redrawCanvas = () => {
if (!canvasEl) return;
const ctx = canvasEl.getContext("2d");
if (!ctx) return;
ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
ctx.strokeStyle = "#f4efe6";
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = "round";
const all = isDrawing ? [...strokes, currentStroke] : strokes;
for (const s of all) {
if (s.length < 2) continue;
ctx.beginPath();
ctx.moveTo(s.at(0).x, (0).y);
for (let i = 1; i < s.length; i += 1) {
ctx.lineTo(s.at(i).x, s.at(i).y);
}
ctx.stroke();
}
};
const submitShape = (shape) => {
ensureAudioUnmuted();
hasStartedIntro = true;
const prevStage = state.stageIndex;
state = applyBrushGesture(state, shape);
const raw = String(state.narration || "").trim();
if (state.stageIndex !== prevStage) {
const resolutionPart = raw.includes(" — ") ? raw.split(" — ").at(0).trim() + "." : raw;
const nextIntro = formatKoanIntro(state.koan);
spokenLinesQueue = [resolutionPart, nextIntro];
strokes = [];
redrawCanvas();
} else {
spokenLinesQueue = [raw];
if (shape === state.koan.targetShape) {
strokes = [];
redrawCanvas();
}
}
soundscape.playCue(state.acousticCue);
soundscape.syncLayers(state);
renderSanctuary();
};
const renderShapeButtons = () => {
if (!shapeDeckEl) return;
shapeDeckEl.innerHTML = "";
const shapes = [
{ id: "CIRCLE", label: "〇 Draw Circle / Ensō (O)", key: "O" },
{ id: "SLASH", label: "ᚁ Draw Slash / Ogham (/)", key: "/" },
{ id: "WAVE", label: "〰 Draw Wave / Mizu (~)", key: "~" },
{ id: "CROSS", label: "✦ Draw Cross / Solstice (+)", key: "+" },
];
for (const sh of shapes) {
const btn = document.createElement("button");
btn.type = "button";
btn.className = "gesture-btn";
btn.textContent = sh.label;
btn.addEventListener("click", (ev) => {
ev.stopPropagation();
submitShape();
});
shapeDeckEl.appendChild(btn);
}
};
const renderSanctuary = () => {
if (hudStageEl) {
hudStageEl.textContent =
"Koan " + (state.stageIndex + 1) + " of 4 • Celtic–Japanese Folk Layers: " + state.harmonicLayers + "/4";
}
if (koanTitleEl) koanTitleEl.textContent = state.koan.title;
if (koanQuoteEl) koanQuoteEl.textContent = state.koan.koan;
if (parallelCritiqueEl) parallelCritiqueEl.textContent = state.koan.parallelCritique;
const displayNarration = spokenLinesQueue.join(" ");
if (storyVoiceEl && storyVoiceEl.textContent !== displayNarration) {
storyVoiceEl.textContent = displayNarration;
}
if (state.narrationSeq !== lastSpokenSeq) {
lastSpokenSeq = state.narrationSeq;
speakLines(spokenLinesQueue);
}
};
if (canvasEl) {
const getPos = (ev) => {
const rect = canvasEl.getBoundingClientRect();
const scaleX = canvasEl.width / (rect.width || 1);
const scaleY = canvasEl.height / (rect.height || 1);
return {
x: (ev.clientX - rect.left) * scaleX,
y: (ev.clientY - ) * scaleY,
};
};
canvasEl.addEventListener("pointerdown", (ev) => {
ev.preventDefault();
ensureAudioUnmuted();
hasStartedIntro = true;
if (evalTimer) clearTimeout(evalTimer);
isDrawing = true;
currentStroke = [getPos(ev)];
redrawCanvas();
});
canvasEl.addEventListener("pointermove", (ev) => {
if (!isDrawing) return;
ev.preventDefault();
const pt = getPos(ev);
const prev = (-1);
const dist = prev ? Math.hypot(pt.x - prev.x, pt.y - prev.y) : 1;
currentStroke.push(pt);
soundscape.playBrushFoley(dist);
redrawCanvas();
});
const endStroke = () => {
if (!isDrawing) return;
isDrawing = false;
if (currentStroke.length >= 3) {
strokes.push(currentStroke);
if (strokes.length > 2) strokes = strokes.slice(-2);
}
currentStroke = [];
redrawCanvas();
// Wait 550ms to allow a second stroke if drawing a CROSS
evalTimer = setTimeout(() => {
const detected = classifyBrushStrokes(strokes);
submitShape(detected);
strokes = [];
redrawCanvas();
}, 550);
};
canvasEl.addEventListener("pointerup", endStroke);
canvasEl.addEventListener("pointercancel", endStroke);
}
renderShapeButtons();
renderSanctuary();
ensureAudioUnmuted();
window.addEventListener("pointerdown", () => {
ensureAudioUnmuted();
if (!hasStartedIntro) {
hasStartedIntro = true;
speakLines(spokenLinesQueue);
}
}, { once: true });
window.addEventListener("keydown", (ev) => {
if (ev.key === "o" || ev.key === "O") submitShape("CIRCLE");
else if (ev.key === "/") { ev.preventDefault(); submitShape("SLASH"); }
else if (ev.key === "~" || ev.key === "`") submitShape("WAVE");
else if (ev.key === "+" || ev.key === "=") submitShape("CROSS");
});
clearCanvasBtn?.addEventListener("click", () => {
strokes = [];
currentStroke = [];
redrawCanvas();
});
resetBtn?.addEventListener("click", () => {
ensureAudioUnmuted();
hasStartedIntro = true;
strokes = [];
currentStroke = [];
redrawCanvas();
state = createShodoSanctuaryState();
lastSpokenSeq = -1;
spokenLinesQueue = [formatKoanIntro(state.koan)];
soundscape.syncLayers(state);
renderSanctuary();
});
receiptBtn?.addEventListener("click", () => {
if (receiptBox) receiptBox.value = buildShodoReceipt(state);
});
}
if (typeof document !== "undefined") {
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", initShodoBrushApp);
} else {
initShodoBrushApp();
}
}
