/**
• src/celtic-shodo-soundscape.js — <= 780 Hz Low-Pass Filtered D-E-G-A-B Folk Ensemble & Brush Foley
*/
const DEGAB_NOTES = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33]; // D4, E4, G4, A4, B4, D5
export function createCelticShodoSoundscape() {
let muted = true;
let ctx = null;
let masterFilter = null;
let masterGain = null;
let droneTimer = null;
let layers = 1;
let step = 0;
const ensureAudio = () => {
if (!ctx && typeof window !== "undefined") {
const Ctor = window.AudioContext || window.webkitAudioContext;
if (!Ctor) return null;
ctx = new Ctor();
masterFilter = ctx.createBiquadFilter();
masterFilter.type = "lowpass";
masterFilter.frequency.setValueAtTime(780, ctx.currentTime);
masterGain = ctx.createGain();
masterGain.gain.setValueAtTime(0.085, ctx.currentTime);
masterFilter.connect(masterGain);
masterGain.connect(ctx.destination);
}
if (ctx && ctx.state === "suspended") ctx.resume();
return ctx;
};
const playTone = (freq, type, peak, attack, release, pan = 0) => {
if (muted) return;
const c = ensureAudio();
if (!c) return;
const now = c.currentTime;
const osc = c.createOscillator();
const gain = c.createGain();
osc.type = type;
osc.frequency.setValueAtTime(freq, now);
gain.gain.setValueAtTime(0.0001, now);
gain.gain.linearRampToValueAtTime(peak, now + attack);
gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);
if (typeof c.createStereoPanner === "function") {
const panner = c.createStereoPanner();
panner.pan.setValueAtTime(pan, now);
osc.connect(gain);
gain.connect(panner);
panner.connect(masterFilter);
} else {
osc.connect(gain);
gain.connect(masterFilter);
}
osc.start(now);
osc.stop(now + attack + release + 0.05);
};
const startEnsemble = () => {
if (droneTimer || typeof window === "undefined") return;
droneTimer = window.setInterval(() => {
if (muted || !ctx) return;
const note = DEGAB_NOTES[step % DEGAB_NOTES.length];
// Layer 1: Low Whistle & Shakuhachi breath
playTone(note, "sine", 0.045, 0.18, 1.3, -0.25);
// Layer 2: Lever Harp & Koto pluck
if (layers >= 2 && step % 2 === 0) {
playTone(DEGAB_NOTES[(step + 2) % DEGAB_NOTES.length], "triangle", 0.038, 0.04, 0.9, 0.35);
}
// Layer 3: Soft Bodhran & Taiko pulse
if (layers >= 3 && step % 4 === 0) {
playTone(73.42, "sine", 0.075, 0.03, 0.65, 0);
}
// Layer 4: Uilleann D3 Drone
if (layers >= 4 && step % 4 === 0) {
playTone(146.83, "sine", 0.05, 0.3, 2.2, 0);
}
step += 1;
}, 950);
};
return {
isMuted: () => muted,
toggleMute: () => {
muted = !muted;
if (!muted) {
ensureAudio();
startEnsemble();
} else if (droneTimer && typeof window !== "undefined") {
window.clearInterval(droneTimer);
droneTimer = null;
}
return muted;
},
syncLayers: (state) => {
layers = state.harmonicLayers || 1;
},
playBrushFoley: (speed = 1) => {
const freq = Math.min(520, Math.max(220, 240 + speed * 30));
playTone(freq, "sine", 0.025, 0.02, 0.14, 0);
},
playCue: (cue) => {
if (cue === "GENTLE_HINT") {
playTone(293.66, "sine", 0.045, 0.06, 0.7, 0);
} else if (cue && cue.startsWith("LAYER_")) {
playTone(440.00, "sine", 0.065, 0.08, 1.4, -0.2);
setTimeout(() => playTone(587.33, "sine", 0.065, 0.08, 1.6, 0.2), 200);
} else if (cue === "SANCTUARY_COMPLETE") {
[293.66, 392.00, 440.00, 587.33].forEach((f, i) => {
setTimeout(() => playTone(f, "sine", 0.07, 0.08, 2.2, 0), i * 220);
});
}
},
};
}
