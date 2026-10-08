// Serves the app's wasm from the max-quality brotli copy that
// tools/brotli-wasm.mjs writes at build time. Pages can't serve a precompressed
// file as a static asset, and its on-the-fly brotli is ~1 MB bigger. Every
// other /app/ file, and any browser that doesn't accept br, falls through to
// the normal static asset.
export async function onRequestGet({ request, params, env, next }) {
  if (!params.file.endsWith(".wasm")) return next();
  if (!/\bbr\b/.test(request.headers.get("Accept-Encoding") ?? "")) return next();

  const url = new URL(request.url);
  url.pathname += ".br";
  const br = await env.ASSETS.fetch(url);
  if (!br.ok) return next();

  return new Response(br.body, {
    encodeBody: "manual",
    headers: {
      "Content-Type": "application/wasm",
      "Content-Encoding": "br",
      Vary: "Accept-Encoding",
      // The filename carries the build hash, so it never changes in place.
      "Cache-Control": "public, max-age=31536000, immutable",
      // public/_headers doesn't apply to Function responses.
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  });
}
