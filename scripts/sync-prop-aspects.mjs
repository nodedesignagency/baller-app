/**
 * Rewrites the `aspect` values in src/data/props.ts from the PNGs on disk, so
 * dropping in re-exported artwork does not need the ratios edited by hand.
 *
 *   node scripts/sync-prop-aspects.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = join(root, 'src/data/props.ts');

/** Reads width and height out of a PNG's IHDR chunk. */
function pngSize(path) {
  const buf = readFileSync(path);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error(`${path} is not a PNG`);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

let source = readFileSync(dataPath, 'utf8');
let changed = 0;

source = source.replace(
  /key: '([^']+)',(\s*)source: require\('([^']+)'\),([\s\S]*?)aspect: [\d.]+ \/ [\d.]+,/g,
  (match, key, gap, rel, middle) => {
    const { width, height } = pngSize(join(root, 'src/data', rel));
    const next = `key: '${key}',${gap}source: require('${rel}'),${middle}aspect: ${width} / ${height},`;
    if (next !== match) {
      changed += 1;
      console.log(`  ${key}: ${width} x ${height}`);
    }
    return next;
  }
);

writeFileSync(dataPath, source);
console.log(changed ? `Updated ${changed} prop(s).` : 'All aspects already match the artwork.');
