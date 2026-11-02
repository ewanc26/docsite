---
title: 'Sigi'
description: 'A pure symbolic stack language with a C++20 compiler that emits C. All syntax is punctuation, no alphanumeric keywords.'
date: 2026-06-08
tags: [sigi, compiler, cpp, c, esolang]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mj6alrmuoi2p'
---

[Sigi](https://github.com/ewanc26/sigi) is an esoteric stack language where all syntax consists of symbols and punctuation. No alphanumeric keywords. User-defined names are prefixed with ".".

The current implementation is a C++20 compiler frontend, `sigic`, that emits C source. In `--run` mode it invokes a host C compiler to build and run that generated source.

**Character set**: `!@#$%^&*()-+=[]{}|;:'",.<>/?\~` plus digits `0-9`

## Installation

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j
```

The binary is `build/sigic`. The build fetches Catch2 for the unit tests; the CLI smoke test needs Python 3 and a host C compiler.

## Usage

```sh
# Generate C source (the output path is required)
sigic hello.si -o hello.c

# Generate C and compile/run it (uses gcc by default)
sigic hello.si --run
sigic hello.si --run --cc clang
```

The interactive REPL and `--interpret` mode are not implemented. `sigic` requires a source-file path and either `-o <file>` or `--run`.

## Implementation status

The current C++ compiler is an early implementation and does not cover the full symbol reference. Its end-to-end path supports numeric, string and character literals; stack manipulation; arithmetic; comparisons; logical NOT; numeric and character I/O; numbered variable load/store; basic while loops (`[...]`), if-else blocks (`{ then ; else }`), and loop break (`<>`) and continue (`w`). Function definitions/calls, do-while and for loops, named variables, math built-ins, arrays, file I/O, foreign function calls, pointer operations, aggregates, casts, switch and goto remain unsupported. Unsupported operations report a compiler error instead of being silently omitted. See [the compiler status](https://github.com/ewanc26/sigi/blob/main/docs/compiler-status.md).

The generated C uses a fixed `double stack[10000]` and `double vars[100]` runtime model. Stack underflow/overflow, division or remainder by zero, failed numeric input, out-of-range variable stores and out-of-range character conversions are diagnosed at run time.

## Symbol reference

The table records the intended language surface, not a claim that every entry is available in the current C++ compiler.

| Symbol            | Name          | Effect                                        |
| ----------------- | ------------- | --------------------------------------------- |
| `!N`              | PUSH          | Push number N (int or float)                  |
| `@`               | DUP           | Duplicate top of stack                        |
| `#`               | SWAP          | Swap top two elements                         |
| `$`               | DROP          | Discard top of stack                          |
| `+`               | ADD           | Pop b, pop a → push a + b                     |
| `-`               | SUB           | Pop b, pop a → push a - b                     |
| `*`               | MUL           | Pop b, pop a → push a \* b                    |
| `/`               | DIV           | Pop b, pop a → push a / b                     |
| `%`               | MOD           | Pop b, pop a → push fmod(a, b)                |
| `=`               | EQ            | Pop b, pop a → push 1 if equal, else 0        |
| `<`               | LT            | Pop b, pop a → push 1 if a < b                |
| `>`               | GT            | Pop b, pop a → push 1 if a > b                |
| `~`               | NOT           | Pop a → push 1 if zero, else 0                |
| `\|`              | PRINT         | Pop and print as number                       |
| `^`               | PRINTC        | Pop and print as character                    |
| `?`               | INPUT         | Read number from stdin                        |
| `:`               | STORE         | Pop address, pop value → store to var         |
| `:.name`          | STOREN        | Pop value → store to named variable           |
| `.name`           | LOADN         | Push value of named variable or call function |
| `<n>`             | LOAD          | Push value of variable n (digits 0-99)        |
| `[ body ]`        | WHILE         | Loop while stack top is nonzero               |
| `{ then ; else }` | IF-ELSE       | Pop condition, execute then or else           |
| `{N body }`       | FUNC          | Define function N (0-99)                      |
| `{.name body }`   | FUNCN         | Define named function                         |
| `(N)`             | CALL          | Call function N                               |
| `(.name)`         | CALLN         | Call named function                           |
| `"text"`          | STRING        | Print characters                              |
| `'x`              | CHAR          | Push character code                           |
| `\`               | COMMENT       | Line comment                                  |
| `/* body */`      | BLOCK COMMENT | Multi-line comment                            |
| `S`               | SIN           | Pop a → push sin(a)                           |
| `C`               | COS           | Pop a → push cos(a)                           |
| `T`               | TAN           | Pop a → push tan(a)                           |
| `R`               | SQRT          | Pop a → push sqrt(a)                          |
| `P`               | POW           | Pop exp, pop base → push pow(base, exp)       |
| `F`               | FLOOR         | Pop a → push floor(a)                         |
| `L`               | LOG           | Pop a → push log(a)                           |
| `E`               | EXP           | Pop a → push exp(a)                           |
| `M`               | ABS           | Pop a → push fabs(a)                          |
| `N`               | ATAN2         | Pop y, pop x → push atan2(y, x)               |
| `W`               | RAND          | Push random 0.0-1.0                           |
| `X`               | EXIT          | Pop code → exit program                       |
| `Z`               | TIME          | Push current time in seconds                  |
| `_`               | AINIT         | Pop id, pop size → initialize array           |
| `K`               | AFREE         | Pop id → free array                           |
| `O`               | FILE_OPEN     | Pop mode, pop len, pop chars → fd             |
| `G`               | FILE_READ     | Pop fd, pop size → push bytes, read_len       |
| `H`               | FILE_WRITE    | Pop fd, pop size, pop data → bytes_written    |
| `Y`               | FILE_CLOSE    | Pop fd → close                                |
| `A`               | ALOAD         | Pop idx, pop id → push array[idx]             |
| `a`               | ASTORE        | Pop idx, pop id, pop val → array[idx] = val   |
| `U`               | USLEEP        | Pop microseconds → sleep                      |
| `B`               | BITAND        | Pop b, pop a → push a & b (integers)          |
| `V`               | BITOR         | Pop b, pop a → push a \| b (integers)         |
| `Q`               | BITXOR        | Pop b, pop a → push a ^ b (integers)          |
| `J`               | BITNOT        | Pop a → push ~a (integer)                     |
| `D`               | SHL           | Pop b, pop a → push a << b (b in 0-63)        |
| `I`               | SHR           | Pop b, pop a → push a >> b (b in 0-63)        |
| `b`               | LOGAND        | Pop b, pop a → push 1 if both nonzero, else 0 |
| `v`               | LOGOR         | Pop b, pop a → push 1 if either nonzero, else 0 |
| `l`               | INTDIV        | Pop b, pop a → push a / b (C integer division) |
| `f{ body }`       | FOR           | Pop count, run body that many times           |
| `d[ body ]`       | DO-WHILE      | Run body, then repeat while stack top nonzero |
| `<>`              | BREAK         | Leave the innermost loop                      |
| `w`               | CONTINUE      | Continue the innermost loop                   |
| `e{ .A .B !5 .D }` | ENUM         | Declare integer constants; each is previous + 1 unless given `!N` |
| `s{ k!n body m body }` | SWITCH   | Pop selector; `k!n` starts a case, `m` the default; arms fall through |
| `h.name`          | LABEL         | Define a goto label in the current function   |
| `g.name`          | GOTO          | Jump to a label in the same function          |
| `o.name` / `o<n>` | FUNC_REF      | Push the index of a function                  |
| `p`               | CALL_PTR      | Pop a function index and call that function   |
| `i.T`             | CAST          | Pop a, push it converted to type T            |
| `j.name` / `j<n>` | ADDRESS       | Push a pointer to a named or numbered variable |
| `y`               | DEREF         | Pop a pointer, push the value it points to    |
| `z`               | SIZEOF        | Pop a, push its size in bytes                 |
| `z.T`             | SIZEOF_TYPE   | Push the size in bytes of type T              |
| `z.Name`          | SIZEOF_AGG    | Push the size in bytes of struct Name         |
| `r.Name{ .f .T ... }` | DECL      | Define struct Name with typed members         |
| `u.Name{ .f .T ... }` | UNION     | Define union Name with shared storage         |
| `n.f`             | MEMBER        | Pop a struct pointer, push a pointer to member f |
| `r .T [ !N ... ] .name` | DECL    | Declare an array of type T with the given extents |
| `r .static .T .name` / `r .const .T .name` | DECL | Declare a static or const object |
| `t.Name .T`       | TYPEDEF       | Declare Name as an alias for scalar type T    |
| `x "header" .name !N` | FFI_DECL  | Declare C function name with N double arguments from header |
| `c .name`         | FFI_CALL      | Pop N arguments, call the declared C function, push result |

## Robustness Features

- **Fail-closed lowering**: unsupported source characters, tokens and operations produce a compiler error instead of being silently dropped.
- **Checked runtime**: generated C diagnoses stack underflow/overflow, zero divisors, failed numeric input, invalid variable indices and out-of-range character conversions.
- **Diagnostics**: unknown source characters and unsupported tokens report line and column.
- **No semantic analysis yet**: `src/sema/sema.cpp` is a placeholder, so undefined names and other semantic errors are not comprehensively checked.

## Examples

These use the intended language surface; named functions, named variables and file I/O are not yet supported end-to-end by the C++ compiler.

### Named Identifiers

```
{.greet "Hello!\n"}
(.greet)

!42 :.answer
.answer |  \ prints 42
```

### File I/O

```
!116 !101 !115 !116 !46 !116 !120 !116 !8 !1 O :.my_fd
!116 !101 !115 !116 !4 .my_fd H $
.my_fd Y
```

## Design

Sigi is deliberately minimal. Every operation is a single character. There are no reserved words—only punctuation.

The language is stack-based with postfix notation, making parsing trivial.

Inspired by Forth, Joy, and other concatenative languages.
