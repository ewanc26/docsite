---
title: plainspeak
description: An esoteric programming language whose syntax is a constrained subset of English — deterministic, non-ML, compiling to C99 via a C++20 frontend.
date: 2026-08-12
tags: [esolang, compiler, cpp, c]
draft: false
---

[plainspeak](https://github.com/ewanc26/plainspeak) is a deterministic, non-ML esoteric programming language whose syntax is a constrained subset of English — "speak plainly to the computer". It compiles to C99 via a C++20 frontend, then hands off to the system C compiler for the native binary.

Part of the same family of esoteric languages as [selenium](/projects/selenium) and [numlang](/projects/numlang).

## Build

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug
cmake --build build -j
./scripts/run_golden_tests.sh build/plainspeak
```

Without CMake:

```sh
g++ -std=c++20 -Wall -Wextra \
  -DPLAINSPEAK_RUNTIME_C="\"$(pwd)/runtime/plainspeak_runtime.c\"" \
  -DPLAINSPEAK_RUNTIME_DIR="\"$(pwd)/runtime\"" \
  -Isrc \
  src/lexer/tokenizer.cpp src/parser/parser.cpp src/codegen/c_emitter.cpp src/cli/main.cpp \
  -o plainspeak
```

## Try It

```sh
./plainspeak examples/hello.eng -o hello && ./hello
```

See `docs/grammar.md` in the repository for the full syntax reference.

## Tech Stack

C++20 frontend (lexer, parser, C emitter) generating C99, compiled with the system C compiler.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/plainspeak/blob/main/LICENSE).
