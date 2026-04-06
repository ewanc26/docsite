---
title: Numlang
description: An esoteric stack-based language that compiles to C via a Python compiler, using only numbers and punctuation.
date: 2026-04-06
tags: [numlang, compiler, python, c, esolang]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3miu27fktx52p"
---

[Numlang](https://github.com/ewanc26/numlang) is an esoteric stack-based language that compiles to C through a Python compiler. The entire character set is `0-9 ^ & * + - / . | ; % # ~ "` — no letters, no keywords, just numbers and punctuation.

## Data model

All values are 64-bit IEEE 754 doubles. The runtime has a stack (depth 1000) and ten named variables `vars[0]`–`vars[9]`, all initialised to `0`.

## Installation

```sh
pip install -e .
```

This installs the `numlangc` command.

## Usage

```sh
# Compile to a C file
numlangc hello.num -o hello.c

# Compile and run immediately (requires gcc)
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
| `N` | Push the integer literal N |
| `\|n` | Push the value of variable n (0–9) |

The numbers 10–15 and 16–18, 20, and 30 are reserved as opcode aliases (comparison, stack, and control flow) — see below. To push the literal value 10 on the stack, compute it: `9 1 +`. String literals (see below) sidestep this entirely for character output.

### Arithmetic

| Symbol | Effect |
|--------|--------|
| `+` | pop b, pop a → push a + b |
| `-` | pop b, pop a → push a − b |
| `*` | pop b, pop a → push a × b |
| `/` | pop b, pop a → push a ÷ b (division-by-zero exits) |
| `%` | pop b, pop a → push a mod b (via `fmod`) |

### Comparison

Comparisons push `1.0` for true, `0.0` for false.

| Code | Meaning |
|------|---------|
| `10` | a < b |
| `11` | a > b |
| `12` | a == b |
| `13` | a != b |
| `14` | a <= b |
| `15` | a >= b |

### Stack manipulation

| Code | Name | Effect |
|------|------|--------|
| `16` | DUP  | Duplicate top of stack |
| `17` | SWAP | Swap top two elements |
| `18` | DROP | Discard top of stack |

### Control flow

| Syntax | Effect |
|--------|--------|
| `20` | **IF** — pops condition; if non-zero, executes the **next single** operation |
| `30 … ;` | **WHILE** — pops condition each iteration; body must leave next condition on stack |

### Variables

```
<value> <index> &
```

Pops the index (0–9), then the value, and stores `vars[index] = value`.

```
42 3 &    # vars[3] = 42
```

### I/O

| Symbol | Effect |
|--------|--------|
| `\|` | Pop and print top of stack as a number (with newline) |
| `~` | Pop and print top of stack as an ASCII character (no newline) |
| `^` | Read a double from stdin and push it |
| `"..."` | Print a string literal — see below |

### String literals

`"..."` prints each character immediately — the multi-character sibling of `~`. It desugars to a `putchar()` call per character and leaves the stack unchanged.

Escape sequences follow the full C syntax set:

| Escape | Value | Meaning |
|--------|-------|---------|
| `\n` | 10 | newline |
| `\t` | 9 | horizontal tab |
| `\r` | 13 | carriage return |
| `\\` | 92 | backslash |
| `\"` | 34 | double quote |
| `\'` | 39 | single quote |
| `\a` | 7 | alert / bell |
| `\b` | 8 | backspace |
| `\f` | 12 | form feed |
| `\v` | 11 | vertical tab |
| `\xHH` | 0–255 | hex escape (1–2 hex digits) |
| `\NNN` | 0–255 | octal escape (1–3 octal digits, first digit 0–7) |

Escapes are resolved in the lexer before the opcode table is consulted, so `"\n"` always produces a newline character even though the integer `10` is the `LT` opcode.

### Functions

```
/N  <body>  ;   # define function N
.N              # call function N
```

Function numbers are plain integers. Functions may be defined in any order — forward calls are supported.

## Examples

### Hello, World!

```
"Hello, World!\n"
```

### Print a number

```
42 |
```

### Read and double a number from stdin

```
^ 16 + |    # read x, DUP, add → 2x, print
```

### Variables

```
99 0 &      # vars[0] = 99
|0 |        # push vars[0], print
```

### Countdown with WHILE

```
5 0 &           # vars[0] = 5
|0 0 11         # initial condition: vars[0] > 0
30
    |0 |        # print vars[0]
    |0 1 - 0 &  # vars[0] -= 1
    |0 0 11     # next condition
;
```

### Conditional (IF)

```
3 5 10          # push (3 < 5) = 1.0
20 99 |         # IF true: print 99
```

### Functions

```
/0
    5 0 &
    |0 |
;

.0
```

### String escapes

```
"Tab:\there\n"
"\x48\x65\x6c\x6c\x6f\n"   # "Hello\n" via hex
"\110\145\154\154\157\n"    # "Hello\n" via octal
```

## Project layout

```
numlang/
  lexer.py      – tokeniser
  parser.py     – recursive-descent parser → AST
  ast.py        – AST node types
  sema.py       – semantic analysis
  codegen_c.py  – C code generator
  main.py       – CLI entry point
examples/       – sample .num programs
```

## Licence

MIT.
