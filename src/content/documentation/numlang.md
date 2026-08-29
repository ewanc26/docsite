---
title: Numlang
description: An esoteric stack-based language that compiles to C via a Python compiler, using only numbers and punctuation.
date: 2026-04-06
tags: [numlang, compiler, python, c, esolang]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3miu27fktx52p"
---

[Numlang](https://github.com/ewanc26/numlang) is an esoteric stack-based language that compiles to C through a Python compiler. The character set is `0-9 ^ & * + - / . | ; % # ~ " !` — no letters, no keywords.

## Data model

All values are 64-bit IEEE 754 doubles. The runtime has a stack (depth 1000) and **100 named variables** `vars[0]`–`vars[99]`, all initialised to `0`.

## Installation

```sh
pip install -e .
```

This installs the `numlangc` command.

## Usage

```sh
# Compile to a C file
numlangc hello.num -o hello.c

# Compile, run with gcc, and execute immediately
numlangc hello.num --run

# Use a different C compiler
numlangc hello.num --run --cc clang
```

## Language reference

### Comments

`# text` — ignored to end of line.

### Pushing values

| Syntax | Effect |
|--------|--------|
| `N` (integer literal) | Push integer N, **unless** N is a special opcode (see tables below) |
| `N.M` (float literal) | Push float N.M — **never** treated as an opcode |
| `|n` or `|nn` | Push value of variable n (0–99) |

> **Tip:** Use float syntax (`10.0` instead of `10`) to push numbers that match opcode aliases.

### Stack manipulation

| Code | Name | Effect |
|------|------|--------|
| `16` | DUP  | Duplicate top of stack |
| `17` | SWAP | Swap top two elements |
| `18` | DROP | Discard top of stack |

### Arithmetic

| Symbol | Effect |
|--------|--------|
| `+` | pop b, pop a → push a + b |
| `-` | pop b, pop a → push a − b |
| `*` | pop b, pop a → push a × b |
| `/` | pop b, pop a → push a ÷ b |
| `%` | pop b, pop a → push fmod(a, b) |

### Comparison

Comparisons push `1.0` for true and `0.0` for false.

| Code | Meaning |
|------|---------|
| `10` | a < b |
| `11` | a > b |
| `12` | a == b |
| `13` | a != b |
| `14` | a <= b |
| `15` | a >= b |

### Control flow

| Syntax | Effect |
|--------|--------|
| `20` | **IF** — pops condition; executes body if non-zero |
| `28` | **ELSE** — separates if/else bodies |
| `30 … ;` | **WHILE** — pops condition each iteration |
| `50 … ;` | **REPEAT** — executes body N times (pushes 0-based index each iteration) |

### Variables

```
<value> <index> &    # store value in vars[index]
|n                    # push vars[n]
```

### I/O

| Symbol | Effect |
|--------|--------|
| `|` | Pop and print as number (with newline) |
| `~` | Pop and print as ASCII character |
| `^` | Read double from stdin and push |
| `"..."` | Print string literal |

### Functions

```
/N  <body>  ;    # define function N
.N               # call function N
```

Functions may be defined in any order. Forward calls and recursion are supported.

## Gotchas

1. **Opcode collisions**: Integer literals matching opcode numbers are interpreted as opcodes. Use float syntax (e.g., `42.0`).
2. **Division vs functions**: `/` followed by an integer defines a function. Use float divisors to avoid this.

## Examples

### Hello, World!

```
"Hello, World!\n"
```

### Variables

```
99 0 &     # vars[0] = 99
|0 |       # print 99
```

### WHILE countdown

```
5 0 &          # vars[0] = 5
|0 0 11        # condition: vars[0] > 0
30
    |0 |       # print vars[0]
    |0 1 - 0 & # vars[0] -= 1
    |0 0 11    # next condition
;
```

### Functions

```
/0
    "Hi\n"
;

.0
```

## Project layout

```
numlang/
  lexer.py      – tokeniser
  parser.py     – recursive-descent parser → AST
  codegen_c.py  – C code generator
examples/       – sample .num programs
```

## Licence

AGPL 3.0
