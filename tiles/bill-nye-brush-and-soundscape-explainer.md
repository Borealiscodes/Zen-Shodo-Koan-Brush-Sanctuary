# How Does Your Computer Know You Just Drew a Circle—and Turn It Into Music?

**Plain-Language Explainer Tile (Altitude A7)**  
**Companion Software:** `Borealiscodes/Zen-Shodo-Koan-Brush-Sanctuary` (`commit b30556f`)  
**Author:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • Dublin 8, Ireland)  
**Date:** November 21, 2026  

---

## Wait—How Can a Web Page Tell a Circle Apart From a Wave Without Any AI?

When you drag your finger or mouse across the dark *washi* parchment in **Zen Shodō & Ogham Koan Brush Sanctuary**, your browser isn't sending your drawing to a giant cloud supercomputer. Instead, it drops a trail of tiny breadcrumbs—`(x, y)` dot coordinates—and asks **four super-simple geometry questions** in less than a thousandth of a second!

### 1. Did Two Separate Lines Cross Each Other? (`CROSS`)
* **The Math Trick:** Before checking anything else, the code looks at your last two strokes. Imagine laying two twigs on the table: if one twig starts on one side of the second twig and ends on the other side (and vice versa), they cross!
* **The `550 ms` Patience Timer:** Because drawing a cross takes **two** strokes, the sanctuary waits **550 milliseconds** (just over half a second) after you lift your finger before judging your drawing. That way, you never get interrupted halfway through!

### 2. Did Your Brush Come Back Home to Where It Started? (`CIRCLE` / *Ensō*)
* **The Math Trick:** Compare two distances:
  1. **Total Path Length:** How far your brush actually traveled along the whole curve.
  2. **Start-to-End Gap (Chord):** The straight-line distance from where you touched down to where you lifted up.
* If you walked a big loop (`path length` is more than twice the width of your drawing) and ended up right back near your starting spot (`gap` is tiny), **boom—that's an *Ensō* circle!**

### 3. Did Your Stroke Wiggle Back and Forth Across an Invisible Line? (`WAVE` / *Mizu*)
* **The Math Trick:** Picture stretching a tight rubber band straight from your starting dot to your ending dot.
* As your brush moves along, does it curve above the rubber band, cross over it, and curve below it? Every time your brush crosses that centerline, it counts a wiggle. One or more big wiggles = **a flowing *Mizu* / *sean-nós* wave!**

### 4. Did Your Brush Go Almost Completely Straight? (`SLASH` / *Ogham*)
* **The Math Trick:** If the straight-line distance from start to finish is **at least 78%** of the total path your brush traveled, your hand didn't wander—it cut straight like an *Ogham* stone notch. **That's a *Slash*!**

---

## Why Does the Music Sound Like Ireland AND Japan at the Same Time?

Ever wonder why an Irish tin whistle and a Japanese *shakuhachi* bamboo flute sound like old friends when played together?

They share the exact same **five-note pentatonic scale**: **`D – E – G – A – B`** (`293.66 Hz` to `493.88 Hz`). Because this five-note scale skips the tense "half-step" notes that clash when played together, every note harmonizes gently with every other note—zero sour chords, zero sudden jumps!

### The `<= 780 Hz` "Sensory Blanket"
In many video games, sound effects blast sharp, high-pitched frequencies (`2,000 Hz` to `8,000 Hz`) that feel like nails on a chalkboard—especially for neurodivergent ears.
* Our sanctuary routes **every single musical note and brush swish** through a digital **Low-Pass Filter set to `780 Hz`**.
* Think of a low-pass filter like closing a heavy wooden temple door halfway: all the warm, cozy bass and midrange notes (`D3` drones, soft *bodhrán* heartbeats, gentle flute breaths) roll smoothly into the room, while harsh, piercing high frequencies stay outside!

---

## How Does the Storyteller Voice Match the Screen 100% of the Time?

If you write out 24 different spoken lines and name them `sound1.wav`, `sound2.wav`, `sound3.wav`, it's super easy for the text and audio to get out of sync when you edit a sentence.

Instead, our sanctuary gives every sentence its own **digital fingerprint** using a tiny math recipe called **FNV-1a hashing**:
1. Take the exact sentence on screen—letter for letter, comma for comma.
2. Scramble its bytes into a unique 8-character code like **`cue_05cb8ddb.wav`**.
3. If you change even *one word* in the story, the fingerprint changes automatically—guaranteeing that the storyteller voice (`en_GB-alan-medium`) and the screen text never drift apart!

---

## Why Honest Baselines Matter in Science & Design

Even with all those neat tricks, live playtesting showed us something super important:
* **What works great:** Drawing shapes with a finger or mouse, hearing the brush swish in real time, and using keyboard keys (`O`, `/`, `~`, `+`) or buttons as accessible alternatives.
* **What still needs work for blind players:** A rectangular `<canvas>` box on a touch screen doesn't have physical raised edges! Without soft audio "wall pings" when a finger nears the edge of the box—or letting players draw anywhere across the whole screen—blind touch-screen players can easily drift outside the canvas.

Documenting **both** what works and what still needs solving turns a fun prototype into real, honest science that the next builder can carry forward!

---

**Provenance & License:**  
`Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>` • Creative Commons Attribution 4.0 International (`CC-BY-4.0`) / MIT License.
