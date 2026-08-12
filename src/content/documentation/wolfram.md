---
title: wolfram
description: A C SDK for the AT Protocol — client-side, wire-level implementation of the protocol. Supports OAuth, repositories, streaming, and cross-compilation to Wii, Wii U, 3DS, and Windows.
date: 2026-07-21
tags: [atproto, c, sdk, wii, cross-platform]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udtmcf72s'
---

[wolfram](https://github.com/ewanc26/wolfram) is a C SDK for the AT Protocol — a client-side, wire-level implementation of the protocol, not a port of the upstream `atproto` service backends.

**Version:** 0.1.1

## Scope

Wolfram is a faithful C port of the AT Protocol's _protocol/SDK layer_ — the client and wire-format packages of the upstream TypeScript repository (`@atproto/api`, `xrpc`, `identity`, `repo`, `crypto`, `syntax`, `oauth`, `lex`, `lexicon`, `did`, `ws-client`). It does **not** port the upstream _server-side service backends_ (`pds`, `bsky` AppView, `ozone`, `bsync`).

The optional `WOLFRAM_BUILD_SERVER` component is a generic XRPC server _framework_ (routing, auth, SSE, WebSocket, relay, blob store) you can build a service on top of.

## Protocol Parity

The bundled Lexicon snapshot matches the 394 files in the upstream atproto repository. Generated C23 and OAuth-authenticated clients cover all 312 query/procedure endpoints, and dedicated streaming clients cover all three subscription endpoints.

## Quick Start

```sh
cmake -S . -B build && cmake --build build && ctest --test-dir build
```

```sh
./build/create_post https://bsky.social you@example.com yourpassword "Hello from wolfram!"
```

## Documentation

Per-module usage guides (runnable C snippets):

- [`docs/agent.md`](https://github.com/ewanc26/wolfram/blob/main/docs/agent.md) — high-level `wf_agent_*` API
- [`docs/sync.md`](https://github.com/ewanc26/wolfram/blob/main/docs/sync.md) — repo CAR, firehose, commit verification
- [`docs/validate.md`](https://github.com/ewanc26/wolfram/blob/main/docs/validate.md) — `wf_validate_value` / `wf_validate_record`
- [`docs/moderation.md`](https://github.com/ewanc26/wolfram/blob/main/docs/moderation.md) — `wf_mod_*` decision engine
- [`docs/oauth.md`](https://github.com/ewanc26/wolfram/blob/main/docs/oauth.md) — OAuth/DPoP, PKCE, PAR, callback flow

## Cross-compilation Support

### Wii

```sh
cmake -S . -B build-wii \
  -DCMAKE_TOOLCHAIN_FILE=.devdeps/wii.cmake \
  -DWOLFRAM_BUILD_WII=ON \
  -DCMAKE_BUILD_TYPE=Debug
cmake --build build-wii
```

### Wii U

```sh
cmake -S . -B build-wiiu \
  -DCMAKE_TOOLCHAIN_FILE=.devdeps/wiiu.cmake \
  -DWOLFRAM_BUILD_WIIU=ON \
  -DCMAKE_BUILD_TYPE=Debug
cmake --build build-wiiu
```

### 3DS

```sh
cmake -S . -B build-3ds \
  -DCMAKE_TOOLCHAIN_FILE=.devdeps/3ds.cmake \
  -DWOLFRAM_BUILD_3DS=ON \
  -DCMAKE_BUILD_TYPE=Debug
cmake --build build-3ds
```

### Windows

```sh
cmake -S . -B build-windows \
  -DCMAKE_TOOLCHAIN_FILE=.devdeps/windows.cmake \
  -DWOLFRAM_BUILD_WINDOWS=ON \
  -DCMAKE_BUILD_TYPE=Debug
cmake --build build-windows
```

### Linux (ARM64)

```sh
cmake -S . -B build-aarch64 \
  -DCMAKE_TOOLCHAIN_FILE=.devdeps/linux-aarch64.cmake \
  -DCMAKE_BUILD_TYPE=Release
cmake --build build-aarch64
```

## Licence

MIT
