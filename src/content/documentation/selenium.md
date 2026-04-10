---
title: "Selenium Compiler"
description: "An esoteric language with lunar/poetic syntax that compiles to C, featuring strong typing and imperative programming constructs."
date: 2026-04-06
tags: [python, compiler, esoteric, c]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mitwy7mvez2r"
---

[Selenium](https://github.com/ewanc26/selenium) is an esoteric language with a lunar/poetic surface and a strict, C-like core. Strongly typed, semicolon-terminated, compiles to C.

## Features

- Strongly typed with explicit `wax` (mutable) and `seal` (immutable) variables
- Functions with typed parameters and return values
- `eclipse` / `shadow` for if / else
- `tide` for while loops
- `orbit` for for loops
- `switch` / `case` / `default` statements
- `break` and `continue` for loops
- Prefix `++` and `--` operators
- Ternary conditional `?:`
- Bitwise operators `<<` `>>` `&` `|` `^`
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
pip install -e .
```

## Usage

```sh
# Compile to C
seleniumc examples/hello.sel -o out.c

# Compile and run
seleniumc examples/hello.sel --run
```

## Keywords

| Keyword | Meaning |
|---------|---------|
| `wax` | Mutable variable declaration |
| `seal` | Immutable constant declaration |
| `ritual` | Function definition |
| `eclipse` | If statement |
| `shadow` | Else clause |
| `tide` | While loop |
| `orbit` | For loop |
| `whisper` | Print statement |
| `cast` | Type conversion |

## Types

- `int` — 64-bit signed integer
- `float` — 64-bit IEEE 754 double
- `bool` — boolean (`true` / `false`)
- `char` — ASCII character
- `string` — string literal

## Known limitations

- No forward declarations — mutual recursion requires careful function ordering
- No arrays or slices

## Project layout

```
selenium/
  lexer.py      – tokeniser
  parser.py     – recursive-descent parser
  ast.py        – AST node types
  sema.py       – semantic analysis
  codegen_c.py  – C code generator
examples/       – sample .sel programs
```

## Licence

AGPL 3.0
