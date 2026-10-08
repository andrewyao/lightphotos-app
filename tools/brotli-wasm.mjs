// Writes a max-quality brotli copy next to each wasm file in dist/app/, which
// functions/app/[file].js serves to browsers that accept br. Cloudflare's own
// on-the-fly brotli uses a faster level and comes out ~1 MB bigger.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { brotliCompressSync, constants } from "node:zlib";

const dir = "dist/app";

for (const name of readdirSync(dir).filter((n) => n.endsWith(".wasm"))) {
  const input = readFileSync(join(dir, name));
  const output = brotliCompressSync(input, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
      [constants.BROTLI_PARAM_LGWIN]: constants.BROTLI_MAX_WINDOW_BITS,
      [constants.BROTLI_PARAM_SIZE_HINT]: input.length,
    },
  });
  writeFileSync(join(dir, `${name}.br`), output);
  console.log(`${name}: ${input.length} -> ${output.length} bytes`);
}
