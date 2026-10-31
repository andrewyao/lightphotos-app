// SPDX-License-Identifier: MIT OR Apache-2.0
//
// The site's languages. English lives at the root (/downloads.html) so every
// existing URL keeps working; each other language lives under its own prefix
// (/de/downloads.html). The blogs index is translated; the posts are English in
// every language but are served under each prefix so the header stays localized.
export const locales = ["en", "zh-CN", "zh-TW", "de", "fr", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Canonical origin, for the absolute URLs hreflang requires.
export const SITE = "https://lightphotos.app";

export const localeInfo: Record<Locale, { slug: string; htmlLang: string; name: string }> = {
  en: { slug: "en", htmlLang: "en", name: "English" },
  "zh-CN": { slug: "zh-cn", htmlLang: "zh-CN", name: "简体中文" },
  "zh-TW": { slug: "zh-tw", htmlLang: "zh-TW", name: "繁體中文" },
  de: { slug: "de", htmlLang: "de", name: "Deutsch" },
  fr: { slug: "fr", htmlLang: "fr", name: "Français" },
  ja: { slug: "ja", htmlLang: "ja", name: "日本語" },
  ko: { slug: "ko", htmlLang: "ko", name: "한국어" },
};

// Value for the optional [...lang] route segment: undefined for English.
export function langParam(locale: Locale): string | undefined {
  return locale === defaultLocale ? undefined : localeInfo[locale].slug;
}

export function localeFromParam(param: string | undefined): Locale {
  if (param === undefined) return defaultLocale;
  const found = locales.find((l) => localeInfo[l].slug === param);
  if (!found) throw new Error(`Unknown locale segment: ${param}`);
  return found;
}

// `path` is the English path: "/", "/downloads.html", "/docs/adjust.html".
// A language's home is "/de", not "/de/": build.format "file" writes it as
// de.html, which Pages serves at /de just as it serves downloads.html at
// /downloads.
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  const prefix = `/${localeInfo[locale].slug}`;
  return path === "/" ? prefix : `${prefix}${path}`;
}

// The web app's URL for a page in `locale`. The app reads `?lang=` and opens in
// that language; English adds nothing, so the app falls back to the browser's
// own language.
export function webAppHref(locale: Locale): string {
  return locale === defaultLocale ? "/app.html" : `/app.html?lang=${localeInfo[locale].htmlLang}`;
}

// Rewrites site-internal links in rendered prose so translators can write the
// same hrefs the English pages use. Only pages that exist in every language are
// touched; links to the web app get the page's `?lang=`, and external links stay
// as written.
const INTERNAL_LINK = /href="(\/(?:docs\/[a-z0-9-]+|docs|blogs\/[a-z0-9-]+|blogs|privacy|terms|downloads)\.html)"/g;
const WEB_APP_LINK = /href="\/app\.html"/g;

export function localizeLinks(html: string, locale: Locale): string {
  if (locale === defaultLocale) return html;
  return html
    .replace(INTERNAL_LINK, (_m, path: string) => `href="${localePath(locale, path)}"`)
    .replace(WEB_APP_LINK, `href="${webAppHref(locale)}"`);
}

// Absolute URL as the site serves it: Cloudflare Pages 308s /x.html to /x, so
// the extensionless form is the canonical one.
export function canonicalUrl(locale: Locale, path: string): string {
  return SITE + localePath(locale, path).replace(/\.html$/, "");
}
