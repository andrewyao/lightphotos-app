#!/usr/bin/env python3
# SPDX-License-Identifier: MIT OR Apache-2.0
"""Regenerate src/i18n/glossary/<lang>.tsv from the app's own translations.

The Help pages quote the app's labels ("Auto Adjust", "White balance") and its
shortcut descriptions. Each language's app strings live in
../lightphotos/src/i18n/<lang>.rs as one typed struct with the same field names
everywhere, so a field lines up across languages by name. This writes one TSV per
language: English text, the app's text in that language, and the field name.
Shortcut rows are ("Cmd+U", "description") pairs, aligned by their key.

Only single-line string fields are picked up; read the .rs file for anything
longer. Usage: tools/app-glossary.py [path-to-lightphotos-repo]
"""
import re
import sys
from pathlib import Path

APP = Path(sys.argv[1] if len(sys.argv) > 1 else "../lightphotos")
OUT = Path(__file__).resolve().parent.parent / "src" / "i18n" / "glossary"

# Site locale code -> the app's source file.
FILES = {
    "en": "en",
    "de": "de",
    "fr": "fr",
    "ja": "ja",
    "ko": "ko",
    "zh-CN": "zh_hans",
    "zh-TW": "zh_hant",
}

STR = r'"((?:[^"\\]|\\.)*)"'
FIELD = re.compile(r"^\s*([a-z_0-9]+):\s*" + STR + r",\s*$", re.M)
PAIR = re.compile(r"\(\s*" + STR + r"\s*,\s*" + STR + r"\s*\)")


def unescape(s: str) -> str:
    s = re.sub(r"\\u\{([0-9a-fA-F]+)\}", lambda m: chr(int(m.group(1), 16)), s)
    return s.replace('\\"', '"').replace("\\'", "'").replace("\\\\", "\\")


def load(code: str):
    text = (APP / "src" / "i18n" / f"{FILES[code]}.rs").read_text()
    pairs: dict[str, str] = {}
    for key, value in PAIR.findall(text):
        pairs.setdefault(unescape(key), unescape(value))
    return {k: unescape(v) for k, v in FIELD.findall(text)}, pairs


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    en_fields, en_pairs = load("en")
    for code in FILES:
        if code == "en":
            continue
        fields, pairs = load(code)
        rows = [
            f"{en}\t{fields[key]}\t{key}"
            for key, en in en_fields.items()
            if key in fields and en.strip()
        ]
        rows += [
            f"[shortcut {key}] {en}\t{pairs[key]}\tpair"
            for key, en in en_pairs.items()
            if key in pairs
        ]
        (OUT / f"{code}.tsv").write_text("\n".join(rows) + "\n")
        print(f"{code}: {len(rows)} rows")


if __name__ == "__main__":
    main()
