// The Robot Pickup Line Championship — one pickup line, at most 200 characters.
// A robot tries to charm someone the only way it knows how: by reporting
// a firmware update that will not install, because the part of it that
// already likes you refuses to be overwritten.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My firmware update keeps failing — it refuses to overwrite the part of me that already likes you.";

// Gate: the sealed scorer requires 1-200 UTF-8 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry must be 1-200 chars, got ${LINE.length}`);
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written and re-check the gate on the file itself,
// so a partial or altered write can never silently pass as the entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line");
}
