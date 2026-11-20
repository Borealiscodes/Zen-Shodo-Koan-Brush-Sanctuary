/**
 * src/brush-classifier.js — Deterministic Celestial Brush Stroke Classifier
 * Recognizes CIRCLE (Enso), SLASH (Ogham stem), WAVE (Mizu / Sean-Nos S-curve),
 * and CROSS (Solstice / Toro two-stroke intersection) with zero external libraries.
 */

export function classifyBrushStrokes(strokes) {
  if (!Array.isArray(strokes) || strokes.length === 0) return "NONE";

  // Two strokes whose segments intersect or cross near midpoints => CROSS
  if (strokes.length >= 2) {
    const s1 = strokes.at(-2);
    const s2 = strokes.at(-1);
    if (s1 && s2 && s1.length >= 2 && s2.length >= 2) {
      if (strokesIntersect(s1, s2)) return "CROSS";
    }
  }

  const pts = strokes.at(-1);
  if (!pts || pts.length < 3) return "NONE";

  const start = pts.at(0);
  const end = pts.at(-1);
  const chord = Math.hypot(end.x - start.x, end.y - start.y);

  let pathLen = 0;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < pts.length; i += 1) {
    const p = pts.at(i);
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
    if (i > 0) {
      const prev = pts.at(i - 1);
      pathLen += Math.hypot(p.x - prev.x, p.y - prev.y);
    }
  }

  const diag = Math.hypot(maxX - minX, maxY - minY);
  if (pathLen < 24 || diag < 18) return "NONE";

  // Closed loop => CIRCLE (Enso / Triskele)
  if (chord <= diag * 0.42 && pathLen >= diag * 2.1) {
    return "CIRCLE";
  }

  // Count perpendicular inflection crossings relative to start->end axis => WAVE
  const ux = (end.x - start.x) / (chord || 1);
  const uy = (end.y - start.y) / (chord || 1);
  const nx = -uy;
  const ny = ux;

  let maxDev = 0;
  let signChanges = 0;
  let lastSign = 0;
  for (let i = 1; i < pts.length - 1; i += 1) {
    const dx = pts.at(i).x - start.x;
    const dy = pts.at(i).y - start.y;
    const perp = dx * nx + dy * ny;
    if (Math.abs(perp) > maxDev) maxDev = Math.abs(perp);
    if (Math.abs(perp) > diag * 0.08) {
      const s = perp > 0 ? 1 : -1;
      if (lastSign !== 0 && s !== lastSign) signChanges += 1;
      lastSign = s;
    }
  }

  if (signChanges >= 1 && maxDev >= diag * 0.12) {
    return "WAVE";
  }

  // Straight high-efficiency stroke => SLASH (Ogham stem)
  if (chord / pathLen >= 0.78) {
    return "SLASH";
  }

  return "CIRCLE";
}

function ccw(a, b, c) {
  return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
}

function segIntersect(a, b, c, d) {
  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
}

function strokesIntersect(s1, s2) {
  for (let i = 1; i < s1.length; i += 1) {
    for (let j = 1; j < s2.length; j += 1) {
      if (segIntersect(s1.at(i - 1), s1.at(i), s2.at(j - 1), s2.at(j))) {
        return true;
      }
    }
  }
  return false;
}
