// SPDX-License-Identifier: MIT OR Apache-2.0
import type { Locale } from "../locales";
import { en, type UI } from "./en";
import zhCN from "./zh-CN";
import zhTW from "./zh-TW";
import de from "./de";
import fr from "./fr";
import ja from "./ja";
import ko from "./ko";

export type { UI };

const dictionaries: Record<Locale, UI> = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  de,
  fr,
  ja,
  ko,
};

export function ui(locale: Locale): UI {
  return dictionaries[locale];
}

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);
}
