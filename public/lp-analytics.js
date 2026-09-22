// The whole analytics client. Posts named events to /api/e on this same
// origin -- no third party, no cookies, nothing stored on the visitor's
// machine. See functions/api/e.js for what happens to them.
//
// Every path through here is wrapped so that a blocked, failing or missing
// endpoint changes nothing about how the page behaves. If this file were
// deleted tomorrow the site would carry on identically.
(function () {
  var ENDPOINT = "/api/e";

  // Honour both the old header-era signal and the newer one. Neither is
  // widely set, but someone who has gone to the trouble meant it.
  function optedOut() {
    try {
      return navigator.doNotTrack === "1" ||
             window.doNotTrack === "1" ||
             navigator.globalPrivacyControl === true;
    } catch (e) {
      return false;
    }
  }

  var off = optedOut();

  function send(name, props) {
    if (off) return;
    try {
      var payload = JSON.stringify({
        name: name,
        path: location.pathname,
        referrer: document.referrer || null,
        props: props || null,
      });

      // sendBeacon hands the request to the browser and returns, so a click
      // that immediately starts a download or a navigation cannot cancel it.
      if (navigator.sendBeacon) {
        var blob = new Blob([payload], { type: "application/json" });
        if (navigator.sendBeacon(ENDPOINT, blob)) return;
      }

      // Older Safari, or sendBeacon refusing because a queue is full.
      fetch(ENDPOINT, {
        method: "POST",
        body: payload,
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      }).catch(function () {});
    } catch (e) {}
  }

  // The one export. Callers -- inline page scripts, and the Rust side of the
  // web build through wasm-bindgen -- are expected to guard on its existence
  // rather than assume this file loaded.
  window.lpTrack = send;

  // app.html is the web app shell rather than a site page, and counting it
  // separately is what makes the "opened the app" vs "app actually booted"
  // funnel readable.
  //
  // The .html is stripped before comparing because Cloudflare Pages serves
  // /app.html at /app -- matching on the literal "/app.html" looks right
  // locally under `astro dev` and silently never matches in production.
  send(location.pathname.replace(/\.html$/, "") === "/app" ? "app_page_view" : "page_view");
})();
