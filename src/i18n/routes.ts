// SPDX-License-Identifier: MIT OR Apache-2.0
//
// getStaticPaths for the [...lang] route folder: one entry per language, with
// the optional segment left out for English so it stays at the site root.
import { langParam, locales, type Locale } from "./locales";

export function languagePaths() {
  return locales.map((lang) => ({ params: { lang: langParam(lang) }, props: { lang } }));
}

export type LanguageProps = { lang: Locale };
