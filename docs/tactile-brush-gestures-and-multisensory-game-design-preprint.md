# Between Freehand Brush Geometry and Non-Visual Parity: Technical Primitives, Canvas Accessibility Limits, and Lessons from Multi-Sensory Game Design

**Preprint & Software Companion:** `Borealiscodes/Zen-Shodo-Koan-Brush-Sanctuary` (`commit b30556f`)  
**Author:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • Dublin 8, Ireland)  
**ORCID:** [`0009-0004-7968-5707`](https://orcid.org)  
**Series Lineage & Empirical Anchors:**  
* **Preprint 1:** Hedling, B. S. (2026a). *Non-Dual Epistemic Architectures and Geometric Stabilization in High-Dimensional Transformer Systems (v3.1)*. Zenodo. [`DOI: 10.5281/zenodo.24240994`](https://doi.org)  
* **Preprint 2:** Hedling, B. S. (2026b). *Beyond Bolted-On Screen Readers: Narrative Phenomenology, the RNIB Roundhouse Sensory Dark, and Perceptual-Cognitive Unity (Rasa-Darśan)*. Zenodo. [`DOI: 10.5281/zenodo.24393275`](https://doi.org)  
* **Empirical TTS Dataset:** Hedling, B. S. (2026c). *From Robotic Screen-Reader Telemetry to Embodied Neural Cadence: A Narrative & Empirical Chronicle of Guardrails, CLI Flag Literalism, and Dual-Voice VITS Synthesis Under Edge Constraints*. Zenodo. [`DOI: 10.5281/zenodo.24399123`](https://doi.org)  
* **Preprint 3:** Hedling, B. S. (2026d). *Defaulting to Mute vs. Designing for Acoustic Presence: Neurodivergent Sensory Regulation, Embodied Neural Narration, and the Four Non-Dual Koans* (`Borealiscodes/Zen-Parable-Embodied-Voice-Edition`).  
* **Preprint 4 (This Manuscript):** Freehand Brush Recognition, Non-Visual Canvas Limits, and Comparative Multi-Sensory Game Design (`Borealiscodes/Zen-Shodo-Koan-Brush-Sanctuary`).  
**Date:** November 21, 2026  

---

## Abstract

Replacing discrete button choices with freehand calligraphic drawing—sweeping a closed *Ensō* circle, cutting an *Ogham* slash, gliding a *sean-nós* wave, or crossing two winter-solstice strokes—creates an immediate, kinesthetic bond between physical gesture, cultural lore, and musical harmony. However, honest live playtesting of `Zen-Shodo-Koan-Brush-Sanctuary` (`commit b30556f`) reveals an important accessibility boundary: while sighted and low-vision players enjoy tactile drawing on a high-contrast *washi* canvas, a two-dimensional HTML `<canvas>` box inherently introduces spatial boundary friction for blind players unless paired with explicit non-visual guidance or tactile equivalents. Rather than destabilizing a working prototype with rushed retrofits, we preserve `Zen-Shodo-Koan-Brush-Sanctuary` as an honest baseline, document its reusable technical primitives (zero-dependency stroke classification, `550 ms` multi-stroke grouping, velocity-mapped brush foley below `780 Hz`, and `24` FNV-1a content-hashed VITS voice cues), and examine how pioneering combined-sensory games—including *Ōkami*, *The Vale: Shadow of the Crown*, *Papa Sangre*, *A Blind Legend*, and *Alt-Frequencies*—solve the tension between tactile gesture and non-visual spatial orientation.

---

## 1. Honest Playtest Findings: Preserving a Working Baseline

During live evaluation of `Zen-Shodo-Koan-Brush-Sanctuary` (`http://127.0.0.1:8092`), three empirical observations emerged:

1. **Browser Audio Session Jumpstart Friction:** Because mobile browsers strictly gate `AudioContext` and `HTMLAudioElement` playback until an explicit user-initiated DOM event settles, initial entry occasionally required tapping **`↺ Begin Again`** to synchronize the WebAudio `D–E–G–A–B` ensemble and `en_GB-alan-medium` storyteller narration. Once awakened, all four koans, gentle off-shape hints, and multi-layer musical transitions played smoothly.
2. **The Two-Dimensional `<canvas>` Boundary for Blind Players:** Even with `aria-label="Washi Parchment Celestial Brush Canvas"` and velocity-pitched brush foley, a bounded rectangular `<canvas>` (`640 × 240 px`) poses a real challenge for blind touch-screen users: without visual edges or acoustic boundary pings when a finger approaches the canvas perimeter, freehand strokes can drift outside the target box or fail to close an *Ensō* loop.
3. **Why Preserving This Baseline Matters:** In research software engineering, an honest baseline that cleanly separates **what works** (deterministic stroke recognition, `<= 780 Hz` sensory-safe folk synthesis, and `1:1` FNV-1a audio-text parity) from **what remains unresolved** (tactile canvas edge guidance for blind touch users) is far more valuable to future builders than fragile, untested complexity. In the current build, keyboard shortcuts (`O`, `/`, `~`, `+`) and accessible shape buttons provide functional parity, while full screen-reader canvas boundary sonification is documented as a dedicated next-step architecture.

---

## 2. Valuable Technical Primitives Worth Carrying Forward

Despite its `<canvas>` spatial limits, `Zen-Shodo-Koan-Brush-Sanctuary` contributes four modular, zero-dependency engineering primitives for accessible and neurodivergent-friendly games:

| Technical Primitive | Implementation (`src/`) | Why It Is Valuable Across Projects |
| :--- | :--- | :--- |
| **1. Zero-Dependency Geometric Stroke Classifier** | `src/brush-classifier.js` (`classifyBrushStrokes`) | Distinguishes closed loops (`CIRCLE` via chord-to-diagonal ratio $\le 0.42$ and path length $\ge 2.1 \times \text{diag}$), linear cuts (`SLASH` via chord/path efficiency $\ge 0.78$), sinusoidal curves (`WAVE` via perpendicular inflection sign changes), and two-stroke intersections (`CROSS` via segment counter-clockwise intersection) in ~95 lines of pure ESM without heavy ML gesture libraries. |
| **2. Multi-Stroke Temporal Grouping Window (`550 ms`)** | `src/brush-app.js` (`evalTimer`) | Pauses `550 ms` after `pointerup` before classifying strokes, allowing a player to lift their finger and draw a second intersecting stroke (`CROSS`) without premature single-stroke rejection—a crucial accommodation for motor tremors, deliberate pacing, and assistive styluses. |
| **3. Velocity-Pitched Brush Foley Under `<= 780 Hz`** | `src/celtic-shodo-soundscape.js` (`playBrushFoley`) | Maps pointer displacement speed (`dist`) to gentle sine frequencies (`220–520 Hz`) routed through a master `780 Hz` biquad low-pass filter, giving real-time acoustic feedback of stroke movement while protecting neurodivergent nervous systems from harsh high-frequency scraping sounds. |
| **4. Exhaustive Kernel-to-FNV-1a VITS Cue Hashing** | `scripts/render_shodo_cues.py` (`24` `.wav` cues) | Simulates every target shape, empty touch (`NONE`), and off-target gentle hint (`CIRCLE` drawn when `SLASH` is expected, etc.) across all four koans, hashing each exact transcript string with 32-bit FNV-1a (`cue_<hex>.wav`) so spoken feedback always matches the on-screen `aria-live` text `1:1`. |

---

## 3. How Other Games Approach Combined Sensory & Tactile Experiences

Designing for combined tactile, spatial, and acoustic perception sits at the intersection of mainstream gesture games and dedicated blind-accessible audio titles. Comparing how established works handle this design space highlights clear pathways for evolving future versions of our brush sanctuary:

### A. Gesture & Brush Semantics: *Ōkami* (Clover Studio, 2006)
* **Approach:** *Ōkami* pioneered the Celestial Brush mechanic—pausing the 3D world into a flat *sumi-e* parchment scroll where players paint circles, slashes, and waves to mend bridges, cut bamboo, and summon wind.
* **Lesson for Accessible Design:** *Ōkami* proved that iconic, forgiving geometric archetypes (circle, straight line, wave, cross) feel deeply expressive without requiring artistic precision. However, because *Ōkami* relies on visual camera alignment over a 3D world, translating its brush into an accessible medium requires decoupling the brush from 3D camera targeting—precisely what `Zen-Shodo-Koan-Brush-Sanctuary` accomplishes by making the *washi* scroll the entire stage.

### B. Full-Screen Touch Gestures Without Canvas Borders: *A Blind Legend* (DOWiNO, 2015) & *The Vale: Shadow of the Crown* (Falling Squirrel, 2021)
* **Approach:** Both *A Blind Legend* and *The Vale* eliminate bounded visual hitboxes on touch screens and controllers. Instead of asking blind players to touch inside a small rectangle, the **entire screen surface** acts as an undivided relative gesture field: swiping left, right, up, or down anywhere on the glass executes sword parries, shield blocks, or movement, reinforced by binaural HRTF audio cues and controller/device haptics.
* **Lesson for Future Brush Uplift:** Replacing the bounded `640 × 240 px` `<canvas>` box with a **full-viewport touch surface**—or playing soft spatial boundary tones when a finger nears the edge of the parchment—would allow blind players to sweep freehand circles and slashes anywhere on their screen without hunting for a box.

### C. Tactile Rhythm, Acoustic Proximity & Zero-Vision Physicality: *Papa Sangre* (Somethin' Else, 2010) & *1-2-Switch* (Nintendo, 2017)
* **Approach:** *Papa Sangre* used real-time binaural audio engines and rhythmic alternating thumb taps to convey footsteps, breath, and spatial danger in complete darkness. Similarly, Nintendo's *1-2-Switch* demonstrated how high-definition haptic vibration combined with clear spoken prompts allows players to look at each other—or close their eyes entirely—while judging physical orientation and timing.
* **Lesson for Future Brush Uplift:** Pairing our `playBrushFoley` sine sweep with **opt-in Web Vibration API micro-pulses** (`navigator.vibrate`) when closing an *Ensō* circle or crossing the midpoint of a `CROSS` stroke would give blind and deaf-blind players immediate tactile confirmation at the exact moment two lines intersect.

### D. Spoken-Word Narrative & Audio-First Interface Rhythm: *Alt-Frequencies* (Accidental Queens, 2019)

*  Approach: Alt-Frequencies builds an entire mystery around tuning radio frequencies and recording/broadcasting spoken-word clips, proving that voice acting, pacing, and clean semantic focus order can carry deep interactive storytelling without conventional action mechanics.
* Lesson for Future Brush Uplift: Our 1:1 FNV-1a content-hashed en_GB-alan-medium VITS pipeline mirrors this spoken-word focus—ensuring every gentle correction ("That stroke moved like a straight reed across the water...") feels like a patient teacher sitting beside the listener rather than an error buzzer.
---

### 4. Philosophical Synthesis & Next-Step Roadmap

Across our four-preprint arc, each prototype has clarified a distinct layer of non-dual, neurodivergent-informed design:
1. Preprint 1 (DOI: 10.5281/zenodo.24240994) established non-dual mathematical stabilization.
2. Preprint 2 (DOI: 10.5281/zenodo.24393275) critiqued bolted-on coordinate screen readers through the Social Model of Disability and RNIB Roundhouse sensory-darkness storytelling.
3. Preprint 3 (Zen-Parable-Embodied-Voice-Edition) demonstrated default-on, <= 780 Hz acoustic hospitality and 1:1 audio-text parity across four classical koans.
4. Preprint 4 (Zen-Shodo-Koan-Brush-Sanctuary, this baseline) unites freehand Shodō and Ogham stroke recognition with Irish–Japanese D–E–G–A–B folk harmony across four new koans (Dōgen's Moon in Water, Joshu's Cypress Tree, Gutei's Flowing Water, and Two Arrows Meeting in Mid-Air).
Future iterations building atop this verified baseline can explore full-screen borderless touch gestures, acoustic parchment-edge proximity tones, and opt-in haptic intersection pulses—bringing freehand calligraphic expression into complete parity for blind, low-vision, neurodivergent, and sighted participants alike.

References (APA 7th Edition)

* Accidental Queens. (2019). Alt-Frequencies [Video game]. Arte Experience.
* Clover Studio. (2006). Ōkami [Video game]. Capcom.
* Dōgen Zenji. (1233/2010). Shōbōgenzō: Genjōkōan (K. Tanahashi, Trans.). Shambhala Publications.
* DOWiNO. (2015). A Blind Legend [Video game]. Plug In Digital.
* Falling Squirrel. (2021). The Vale: Shadow of the Crown [Video game]. Creative Bytes Studios.
* Hedling, B. S. (2026a). Non-dual epistemic architectures and geometric stabilization in high-dimensional transformer systems (v3.1) [Preprint]. Zenodo. doi.org
* Hedling, B. S. (2026b). Beyond bolted-on screen readers: Narrative phenomenology, the RNIB Roundhouse sensory dark, and perceptual-cognitive unity (rasa-darśan) [Preprint]. Zenodo. doi.org Hedling, B. S. (2026c). From robotic screen-reader telemetry to embodied neural cadence: A narrative & empirical chronicle of guardrails, CLI flag literalism, and dual-voice VITS synthesis under edge constraints [Preprint & dataset]. Zenodo. doi.org
* Hedling, B. S. (2026d). Zen-Shodo-Koan-Brush-Sanctuary: Zero-dependency Celestial Brush & Ogham koan sanctuary with D–E–G–A–B folk ensemble and FNV-1a VITS cues [Computer software]. GitHub. github.com
* Nintendo EPD. (2017). 1-2-Switch [Video game]. Nintendo.
* Oliver, M. (1990). The politics of disablement. Macmillan.
* Somethin' Else. (2010). Papa Sangre [Video game]. Somethin' Else.
* Wumen Huikai. (1228/2005). The gateless gate (Mumonkan) (K. Sekida, Trans.). Shambhala Publications.

---

### Provenance & License:

Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev> • Creative Commons Attribution 4.0 International (CC-BY-4.0) / MIT License.


