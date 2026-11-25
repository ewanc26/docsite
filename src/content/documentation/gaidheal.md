---
title: Gàidheal
description: An esoteric stack-based programming language written in Scottish Gaelic, with a Rust reference interpreter and a C99 backend kept in byte-for-byte differential parity.
date: 2026-11-13
tags: [rust, c, language, esoteric, interpreter, scottish-gaelic]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n33vrn7paf2v"
---

[Gàidheal](https://github.com/ewanc26/gaidheal) is an esoteric stack-based programming language written in Scottish Gaelic. All values are 64-bit doubles on a single operand stack (default depth 1000). Every root word has three forms selected by initial-consonant mutation: **base** (destructive/primary), **lenited** (variant element) and **eclipsed** (non-destructive/structural) — so `cuir` pushes, `chuir` copies, and `gcuir` rolls.

The reference interpreter is Rust. Every program also lowers through readable portable C99 plus the `gaidheal_runtime.h` runtime and is built with the system C compiler for a native binary; the interpreter and the C backend are kept in byte-for-byte differential parity (`stdout`, `stderr` and exit codes, including runtime error messages).

```text
( Fàilte dhan t-saoghal )
cuir 70 n-abair
cuir 224 n-abair
cuir 105 n-abair
cuir 108 n-abair
cuir 116 n-abair
cuir 101 n-abair
cuir 33 n-abair
( Fàilte! )
```

Comments are `( ... )` and may span lines. There are no variables and no strings: state lives in stack slots manipulated with `chuir`/`gcuir`, and text is emitted one UTF-8 code point at a time with `n-abair`.

## Documentation

- `docs/grammar.md` — the full word table, control flow and loop idioms.
- `capabilities.json` / `scripts/check_capabilities.py` — machine-readable implementation status.
- `editors/vscode-gaidheal` — VS Code source highlighting.

## Status

Version 0.1.0. The interpreter and C backend are in differential parity; the full word table and control flow are documented in `docs/grammar.md`.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/gaidheal/blob/main/LICENSE).