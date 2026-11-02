---
title: plainspeak
description: An esoteric programming language whose syntax is a constrained subset of English — deterministic, non-ML, targeting C99-C23 capabilities through a C++20 frontend.
date: 2026-08-12
tags: [esolang, compiler, cpp, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3msv4i3fevk2l"
---

[plainspeak](https://github.com/ewanc26/plainspeak) is a deterministic, non-ML esoteric programming language whose syntax is a constrained subset of English — "speak plainly to the computer". A C++20 frontend lowers programs through readable portable C plus the PlainSpeak runtime, then hands off to the system C compiler for the native binary.

Its capability target is the union of C99, C11, C17 and C23, not a single C dialect. Support is tracked per feature in `tests/conformance/c99-c23.json`.

Part of the same family of esoteric languages as [selenium](/projects/selenium) and [numlang](/projects/numlang).

## Build

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build -j
ctest --test-dir build
python3 scripts/check_c_conformance.py
./scripts/run_golden_tests.sh build/plainspeak
```

Without CMake:

```sh
g++ -std=c++20 -Wall -Wextra \
  -DPLAINSPEAK_RUNTIME_C="\"$(pwd)/runtime/plainspeak_runtime.c\"" \
  -DPLAINSPEAK_RUNTIME_DIR="\"$(pwd)/runtime\"" \
  -Isrc \
  src/lexer/tokenizer.cpp src/lexer/alias_table.cpp \
  src/parser/parser.cpp src/sema/sema.cpp \
  src/codegen/mangling.cpp src/codegen/c_emitter.cpp \
  src/ast/ast_printer.cpp src/cli/main.cpp \
  -o plainspeak
```

## Try It

```sh
./plainspeak examples/hello.eng -o hello && ./hello
```

Inspect or lint a program without building a binary:

```sh
./plainspeak examples/hello.eng --lint
./plainspeak examples/hello.eng --show-generated-c
```

`--define FEATURE` (or `--define FEATURE=VALUE`) marks a case-sensitive identifier as defined for `Compile if FEATURE is defined:` / `Elif` / `Otherwise` blocks; the current foundation tests presence, not the value. The native compiler defaults to `cc`; set `PLAINSPEAK_CC` to use another C compiler for target-specific C23 facilities.

See `docs/grammar.md` for the accepted syntax, `docs/c-compatibility.md` for the C99-C23 capability matrix, and `docs/runtime.md` for the runtime helpers.

## Tech Stack

C++20 frontend (lexer, parser, semantic analysis, C emitter) generating portable C plus the PlainSpeak runtime, compiled with the system C compiler. C99-C23 features are still being implemented; the conformance manifest is the source of truth.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/plainspeak/blob/main/LICENSE).
