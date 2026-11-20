import test from "node:test";
import assert from "node:assert/strict";
import { classifyBrushStrokes } from "../src/brush-classifier.js";
import { createShodoSanctuaryState, applyBrushGesture, buildShodoReceipt } from "../src/shodo-kernel.js";
test("1. Brush classifier recognizes CIRCLE, SLASH, WAVE, and CROSS", () => {
const circle = [];
for (let i = 0; i <= 24; i += 1) {
const a = (i / 24) * Math.PI * 2;
circle.push({ x: 100 + Math.cos(a) * 50, y: 100 + Math.sin(a) * 50 });
}
assert.equal(classifyBrushStrokes([circle]), "CIRCLE");
const slash = [{ x: 20, y: 20 }, { x: 80, y: 80 }, { x: 140, y: 140 }];
assert.equal(classifyBrushStrokes([slash]), "SLASH");
const wave = [];
for (let i = 0; i <= 20; i += 1) {
wave.push({ x: 20 + i * 10, y: 100 + Math.sin((i / 20) * Math.PI * 2) * 35 });
}
assert.equal(classifyBrushStrokes([wave]), "WAVE");
const crossA = [{ x: 50, y: 100 }, { x: 150, y: 100 }];
const crossB = [{ x: 100, y: 50 }, { x: 100, y: 150 }];
assert.equal(classifyBrushStrokes([crossA, crossB]), "CROSS");
});
test("2. All four new koans progress via drawn shapes and mint deterministic receipt", () => {
let s = createShodoSanctuaryState();
s = applyBrushGesture(s, "SLASH"); // gentle hint on stage 0
assert.equal(s.stageIndex, 0);
s = applyBrushGesture(s, "CIRCLE");
assert.equal(s.stageIndex, 1);
s = applyBrushGesture(s, "SLASH");
assert.equal(s.stageIndex, 2);
s = applyBrushGesture(s, "WAVE");
assert.equal(s.stageIndex, 3);
s = applyBrushGesture(s, "CROSS");
assert.equal(s.completedCount, 4);
assert.equal(s.harmonicLayers, 4);
assert.match(buildShodoReceipt(s), /SHA-256: [0-9a-f]{64}/);
});
