import json
import re
import subprocess
import sys
from pathlib import Path
LEXICON = [
("Tōrō", "TOH-roh"),
("Bonshō", "BON-shoh"),
("Shakuhachi", "shah-koo-HAH-chee"),
("Taiko", "TY-koh"),
("Mumonkan", "moo-MON-kahn"),
("Dōgen", "DOH-gen"),
("Genjōkōan", "gen-JOH-koh-ahn"),
("Ensō", "EN-soh"),
("Ogham", "OH-am"),
("Brú na Bóinne", "BROO nah BOY-nyuh"),
("sean-nós", "SHAN-nohs"),
("Bodhrán", "BOW-rahn"),
("Uilleann", "ILL-un"),
("Joshu", "JOH-shoo"),
("Gutei", "GOO-tay"),
]
def normalize(text: str) -> str:
out = str(text or "")
for term, spoken in LEXICON:
out = re.sub(rf"(?<![\w]){re.escape(term)}(?![\w])", spoken, out)
return out
def fnv1a_32(text: str) -> str:
h = 0x811c9dc5
for b in text.encode("utf-8"):
h ^= b
h = (h * 0x01000193) & 0xffffffff
return f"{h:08x}"
def extract_all_cues() -> list[dict]:
js_extract = """
import { SHODO_KOANS } from './src/shodo-koans-data.js';
import { createShodoSanctuaryState, applyBrushGesture } from './src/shodo-kernel.js';
const texts = new Set();
SHODO_KOANS.forEach((k) => texts.add(${k.title}. ${k.koan} ${k.sceneOpening}));
const shapes = ['NONE', 'CIRCLE', 'SLASH', 'WAVE', 'CROSS'];
let cur = createShodoSanctuaryState();
for (let stage = 0; stage < SHODO_KOANS.length; stage += 1) {
for (const sh of shapes) {
const next = applyBrushGesture(cur, sh);
const raw = String(next.narration || '').trim();
if (next.stageIndex !== cur.stageIndex && raw.includes(' — ')) {
texts.add(raw.split(' — ').at(0).trim() + '.');
} else if (raw) {
texts.add(raw);
}
}
cur = applyBrushGesture(cur, SHODO_KOANS.at(stage).targetShape);
}
console.log(JSON.stringify(Array.from(texts)));
"""
raw = subprocess.check_output(["node", "--input-type=module", "-e", js_extract], text=True)
lines = json.loads(raw)
return [{"id": f"cue_{fnv1a_32(line)}", "text": line} for line in lines]
def main(model_path: str, out_dir: Path, length_scale: str = "1.28") -> None:
cues = extract_all_cues()
out_dir.mkdir(parents=True, exist_ok=True)
for old in out_dir.glob("*.wav"):
old.unlink()
for cue in cues:
wav_file = out_dir / f"{cue['id']}.wav"
spoken = normalize(cue["text"]).strip() + "\n"
subprocess.run(
[sys.executable, "-m", "piper", "--model", model_path, "--data-dir", ".", "--length-scale", length_scale, "--sentence-silence", "0.50", "--output_file", str(wav_file)],
input=spoken.encode("utf-8"),
check=True,
)
print(f"Rendered {len(cues)} content-hashed Shodo & Ogham cues into {out_dir}")
if name == "main":
args = list(sys.argv)
main(args.pop(1), Path(args.pop(1)), args.pop(1) if len(sys.argv) > 1 else "1.28")
