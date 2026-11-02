---
title: "Selenium Compiler"
description: "An esoteric language with lunar/poetic syntax that compiles to C via a C++20 compiler, featuring strong typing and imperative programming constructs."
date: 2026-04-06
tags: [cpp, compiler, esoteric, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mitwy7mvez2r"
---

[Selenium](https://github.com/ewanc26/selenium) is an esoteric language with a lunar/poetic surface and a strict, C-like core. Strongly typed, semicolon-terminated, and compiled to C by a C++20 compiler.

## Features

- Strongly typed with explicit `wax` (mutable) and `seal` (immutable) variables
- Functions with typed parameters and return values, forward calls and recursion
- `eclipse` / `shadow` for if / else
- `tide` for while loops and `undertow` for do-while loops
- `orbit` for for loops
- `switch` / `case` / `default` statements
- `break` and `continue` for loops and switch
- Prefix and postfix `++` and `--` operators
- Ternary conditional `?:`
- Bitwise operators `<<` `>>` `&` `|` `^`
- Fixed-size arrays, pointers and `nullptr`, with brace and designated initialisers
- `frame`, `fusion`, `phase` and `alias` for structs, unions, enums and type aliases
- `drift` with labels for goto, and `measure` for sizeof
- `summon ritual` declarations for C functions, optionally linked `from` a C source file
- `whisper` for printing
- `read_int`, `read_float`, `read_bool`, `read_char` for input
- Explicit `cast(type, expr)` conversions

## Syntax example

```selenium
wax int moon = 3;
seal int tide = 8;

ritual add(int a, int b) -> int {
    return a + b;
};

eclipse (moon < tide) {
    whisper moon;
} shadow {
    whisper tide;
};

tide (moon < 10) {
    whisper moon;
    moon = moon + 1;
};

orbit (wax int i = 0; i < 5; i = i + 1) {
    whisper i;
};

switch (moon) {
    case 1: {
        whisper "one";
        break;
    };
    case 3: {
        whisper "three";
        break;
    };
    default: {
        whisper "other";
        break;
    };
};

wax int max = moon > tide ? moon : tide;
whisper max;

whisper add(moon, tide);
```

## Installation

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j
```

The binary is `build/seleniumc`. Run `ctest --test-dir build --output-on-failure` for the Catch2 unit tests and the CLI smoke test.

## Usage

```sh
# Compile to C
seleniumc examples/hello.sel -o out.c

# Compile and run
seleniumc examples/hello.sel --run

# Use a different C compiler
seleniumc examples/hello.sel --run --cc clang
```

## Keywords

| Keyword | Meaning |
|---------|---------|
| `wax` | Mutable variable declaration |
| `seal` | Immutable constant declaration |
| `ritual` | Function definition |
| `summon` | External C function declaration, optionally with `from` a C source |
| `eclipse` | If statement |
| `shadow` | Else clause |
| `tide` | While loop |
| `undertow` | Do-while loop |
| `orbit` | For loop |
| `switch` / `case` / `default` | Switch statement |
| `break` / `continue` | Loop and switch control |
| `drift` | Goto statement |
| `whisper` | Print statement |
| `measure` | Sizeof |
| `cast` | Type conversion |
| `frame` | Struct declaration |
| `fusion` | Union declaration |
| `phase` | Enum declaration |
| `alias` | Type alias |
| `nullptr` | Null pointer constant |

## Types

- `int` — 32-bit signed integer
- `float` — 64-bit IEEE 754 double
- `bool` — boolean (`true` / `false`)
- `char` — ASCII character
- `string` — string literal
- `void` — return type only

## Current implementation status

The C++20 compiler builds and runs, but semantic analysis is still incomplete. Variable scopes, loop-control context, function declarations and call arity, return values, duplicate function definitions, and function-local goto/label targets are checked; type compatibility, parameter types, lvalue validity and full control-flow analysis are not. The original differential suite has not been ported to the C++ executable, so verification currently comes from the Catch2 unit tests and the CLI smoke test.

## Project layout

```
selenium/
  CMakeLists.txt      – C++20 compiler and Catch2 unit-test targets
  src/lexer/          – tokeniser
  src/parser/         – recursive-descent parser and AST construction
  src/ast/            – AST node types
  src/sema/           – semantic analysis (incomplete)
  src/codegen/        – C source emitter
  src/cli/            – seleniumc command-line driver
  tests/unit/         – Catch2 unit tests
  tests/smoke.py      – CLI end-to-end smoke test
  tests/differential/ – .sel programs paired with C references (not yet ported)
  examples/           – sample .sel programs
```

## Licence

AGPL 3.0
