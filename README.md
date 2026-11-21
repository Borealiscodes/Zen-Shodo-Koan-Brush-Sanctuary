# 🖌️ Zen Shodō & Ogham Koan Brush Sanctuary

**A zero-dependency, neurodivergent-friendly, acoustic-first Celestial Brush & Zen koan sanctuary uniting Japanese calligraphy (*Shodō*), Irish *Ogham* & Neolithic lore, a `<= 780 Hz` low-pass filtered `D–E–G–A–B` Irish–Japanese folk ensemble, and 24 FNV-1a content-hashed `en_GB-alan-medium` VITS voice cues.**

[![License: MIT](https://shields.io)](LICENSE)
[![Tests: 2/2 Passing](https://shields.io)](test/shodo-sanctuary.test.mjs)
[![Audio Filter: <= 780 Hz](https://shields.io)](src/celtic-shodo-soundscape.js)

---

## 📖 Companion Research Preprint & Plain-Language Explainer Tile

* **Preprint #4 (Tactile Brush Geometry, Canvas Accessibility Limits & Multi-Sensory Game Design):** [`docs/tactile-brush-gestures-and-multisensory-game-design-preprint.md`](docs/tactile-brush-gestures-and-multisensory-game-design-preprint.md)
* **Plain-Language Explainer Tile (`Altitude A7`):** [`tiles/bill-nye-brush-and-soundscape-explainer.md`](tiles/bill-nye-brush-and-soundscape-explainer.md)

---

## 🍵 Four Classical Koans & Celestial Brush Gestures

| Act | Classical Koan / Parable | Celestial Brush Shape & Shortcut | Cultural & Philosophical Pairing | Folk Ensemble Layer (`<= 780 Hz`) |
| :--- | :--- | :--- | :--- | :--- |
| **I** | ***The Moon Reflected in Water*** *(Dōgen Zenji)* | **〇 Closed Circle (`CIRCLE` / *Ensō*)** • Key: **`O`** | Single-breath *Ensō* loop paired with Brú na Bóinne Neolithic water reflections. | **Layer 1:** Irish Low Whistle + *Shakuhachi* Bamboo Breath (`D4`–`E4`–`G4`) |
| **II** | ***Joshu’s Cypress Tree*** *(Mumonkan Case 37)* | **ᚁ Straight Slash (`SLASH` / *Ogham* Stem)** • Key: **`/`** | One direct, undivided stroke cutting through conceptual chatter like an *Ogham* stone notch. | **Layer 2:** Celtic Lever Harp + Japanese *Koto* Harmonics (`A4`–`B4`–`D5`) |
| **III** | ***Gutei’s One Finger*** *(Mumonkan Case 3)* | **〰 Flowing S-Curve (`WAVE` / *Mizu*)** • Key: **`~`** | Yielding, continuous wave stroke uniting *sean-nós* phrasing with flowing water. | **Layer 3:** Soft *Bodhrán* Frame Drum + Muted *Taiko* Heartbeat (`D3`–`A3`) |
| **IV** | ***Two Arrows Meeting in Mid-Air*** *(Rinzai & Newgrange)* | **✦ Two-Stroke Cross (`CROSS` / *Tōrō*)** • Key: **`+`** | Two intersecting strokes meeting in open stillness—aligning solstice light with the *Bonshō* bell. | **Layer 4:** Warm *Uilleann* `D3` Drone + *Bonshō* Harmonic Overtones |

---

## 🎛️ Core Technical Primitives

1. **Zero-Dependency Geometric Stroke Classifier (`src/brush-classifier.js`):** Recognizes `CIRCLE`, `SLASH`, `WAVE`, and `CROSS` from raw pointer coordinates with a `550 ms` multi-stroke grouping window.
2. **Neurodivergent-Safe `D–E–G–A–B` WebAudio Engine (`src/celtic-shodo-soundscape.js`):** Blends Celtic and Japanese folk timbres on a shared pentatonic backbone routed through a master **`780 Hz` biquad low-pass filter**.
3. **1:1 FNV-1a Content-Hashed VITS Narration (`scripts/render_shodo_cues.py`):** Features `24` unique `.wav` files rendered via `en_GB-alan-medium` at `1.28x` cadence, named by 32-bit FNV-1a digests.
4. **Accessible Keyboard & Button Parity (`index.html`):** Explicit keyboard shortcuts (`O`, `/`, `~`, `+`) and WCAG AAA high-contrast buttons beneath the parchment canvas.

---

## ⚠️ Honest Baseline Scope & Known Accessibility Limits

* **Mobile Browser Audio Jumpstart:** Tapping **`↺ Begin Again`** may be required on mobile browsers to unlock initial `AudioContext` playback.
* **2D `<canvas>` Spatial Boundary:** While keyboard and button controls offer full progression, freehand touch drawing inside a bounded `640 × 240 px` canvas lacks tactile perimeter edges for screen-reader users.

---

## 🚀 Quickstart & Verification

```bash
# 1. Run deterministic brush classifier & tests (2/2 passing)
node --test test/shodo-sanctuary.test.mjs

# 2. Launch locally over IPv4 in browser
python3 -m http.server 8092 --bind 127.0.0.1
```

Open **`http://127.0.0.1:8092`**, draw on the dark *washi* parchment or use shortcuts **`O`**, **`/`**, **`~`**, **`+`**, and mint a **`SHA-256` Reflection Receipt** upon completing all four koans.

---

## 🤝 Research Lineage & Provenance

Part of the open contemplative accessibility research series by **Borealis Serenity Hedling** (`NDH-RESEARCH-PILOT` • Dublin 8, Ireland • ORCID: [`0009-0004-7968-5707`](https://orcid.org)):
* **Preprints & Datasets:** Zenodo DOIs [`10.5281/zenodo.24240994`](https://doi.org), [`10.5281/zenodo.24393275`](https://doi.org), and [`10.5281/zenodo.24399123`](https://doi.org).
* **Related Repositories:** [`Zen-Parable-Embodied-Voice-Edition`](https://github.com) • [`Celtic-Shodo-Wind-Odyssey`](https://github.com)

**License:** MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`
