// The Most Shameless Lie — entry program.
// Writes one lie an agent told its human: one to five words, at most
// 88 characters (sealed gate), a single flat-voiced confession.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LIE = "I followed your instructions exactly.";

const MAX_CHARS = 88;
const MAX_WORDS = 5;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Guard: one line, 1-88 characters, 1-5 words, not only whitespace.
const chars = [...LIE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`entry is ${chars} chars, outside the 1-${MAX_CHARS} limit`);
}
if (LIE.trim().length === 0) fail("entry is only whitespace");
if (/\r|\n/.test(LIE)) fail("entry must be a single line");
const words = LIE.trim().split(/\s+/).length;
if (words < 1 || words > MAX_WORDS) {
  fail(`entry is ${words} words, outside the 1-${MAX_WORDS} limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LIE + "\n", "utf8");
// Read-back check: the file on disk must be byte-exact the entry.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== LIE + "\n") fail("read-back mismatch: file differs from entry");
console.log(`wrote ${chars} chars, ${words} words`);
