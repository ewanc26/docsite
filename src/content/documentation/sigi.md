---
title: "Sigi"
description: "A pure symbolic stack language — all syntax is punctuation, no alphanumeric keywords."
date: 2026-04-10
tags: [sigi, compiler, python, c, esolang]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mj6alrmuoi2p"
---

[Sigi](https://github.com/ewanc26/sigi) is an esoteric stack language where all syntax consists of symbols and punctuation. No alphanumeric keywords anywhere.

**Character set**: `!@#$%^&*()-+=[]{}|;:'",.<>/?\~` plus digits `0-9`

## Installation

```sh
pip install -e .
```

This installs the `sigic` compiler.

## Usage

```sh
# Compile to C
sigic hello.si -o hello.c

# Compile and run immediately
sigic hello.si --run

# Debug: show tokens
sigic hello.si --emit-tokens
```

## Symbol reference

| Symbol | Name | Effect |
|--------|------|--------|
| `!N` | PUSH | Push number N (int or float) |
| `@` | DUP | Duplicate top of stack |
| `#` | SWAP | Swap top two elements |
| `$` | DROP | Discard top of stack |
| `+` | ADD | Pop b, pop a → push a + b |
| `-` | SUB | Pop b, pop a → push a - b |
| `*` | MUL | Pop b, pop a → push a * b |
| `/` | DIV | Pop b, pop a → push a / b |
| `%` | MOD | Pop b, pop a → push fmod(a, b) |
| `=` | EQ | Pop b, pop a → push 1 if equal, else 0 |
| `<` | LT | Pop b, pop a → push 1 if a < b |
| `>` | GT | Pop b, pop a → push 1 if a > b |
| `~` | NOT | Pop a → push 1 if zero, else 0 |
| `|` | PRINT | Pop and print as number |
| `^` | PRINTC | Pop and print as character |
| `?` | INPUT | Read number from stdin |
| `:` | STORE | Pop address, pop value → store to var |
| `<n>` | LOAD | Push value of variable n (digits 0-99) |
| `[ body ]` | WHILE | Loop while stack top is nonzero |
| `{ then ; else }` | IF-ELSE | Pop condition, execute then or else |
| `{N body }` | FUNC | Define function N (0-99) |
| `(N)` | CALL | Call function N |
| `"text"` | STRING | Print characters |
| `'x` | CHAR | Push character code |
| `\` | COMMENT | Line comment (rest of line ignored) |

## Data model

- All values are 64-bit IEEE 754 doubles
- Stack depth: 1000 by default
- 100 variables: `vars[0]`–`vars[99]`

## Examples

### Hello World

```
"Hello, World!\n"
```

### Arithmetic

```
!3 !4 + |     \ prints 7
!10 !3 - |    \ prints 7
!4 !5 * |     \ prints 20
```

### Stack operations

```
!5 @ + |      \ 10 (DUP then ADD)
!1 !2 # | |   \ 2 then 1 (SWAP)
!1 !2 !3 $ | | |  \ 2 then 1 (DROP)
```

### Variables

```
!42 !0 :       \ store 42 in var 0
0 |            \ print 42

!7 !1 :        \ store 7 in var 1
1 !2 * !1 :    \ var[1] *= 2
```

### Functions

```
{0 "Hi\n"}     \ define function 0
{1 !42 |}      \ define function 1

(0)            \ calls fn 0
(1)            \ calls fn 1
```

### Control flow

```
!1 { "yes" ; "no" }    \ prints "yes"
!0 { "yes" ; "no" }    \ prints "no"
```

### While loops

```
!5 [ @ | !1 - ] $      \ prints 5 4 3 2 1
```

Loop semantics: peek at stack top. If zero, exit. Otherwise execute body. Body must leave updated counter on stack.

### Factorial

```
!5 !4 * !3 * !2 * !1 * |    \ prints 120
```

## Project layout

```
sigi/
  lexer.py      – tokeniser
  parser.py     – parser → opcodes
  codegen_c.py  – C code generator
examples/       – sample .si programs
```

## Licence

AGPL 3.0
