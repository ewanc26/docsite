---
title: wolfram
description: A C/C++ SDK for the AT Protocol — client-side, wire-level implementation of the protocol. Supports OAuth, repositories, streaming, and cross-compilation to Wii, Wii U, 3DS, Windows, Linux ARM64, and Classic Mac OS 9.
date: 2026-11-02
tags: [atproto, c, cpp, sdk, wii, cross-platform]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udtmcf72s'
---

[wolfram](https://github.com/ewanc26/wolfram) is a C/C++ SDK for the AT Protocol — a client-side, wire-level implementation of the protocol, not a port of the upstream `atproto` service backends.

**Version:** 0.44.2

The runtime library and all generated client code are pure C23. C++ is used for complex or sensitive components behind a C ABI, and an optional header-only `wolfram-cpp` RAII wrapper is available with `WOLFRAM_BUILD_CPP=ON`. The optional Lexicon generator (`wf_lexgen_tool`) is a build-time C++ tool and is never linked into `libwolfram`. Wolfram is not affiliated with Wolfram Alpha or Wolfram Research.

## Scope

Wolfram is a faithful C port of the AT Protocol's _protocol/SDK layer_ — the client and wire-format packages of the upstream TypeScript repository (`@atproto/api`, `xrpc`, `identity`, `repo`, `crypto`, `syntax`, `oauth`, `lex`, `lexicon`, `did`, `ws-client`). It does **not** port the upstream _server-side service backends_ (`pds`, `bsky` AppView, `ozone`, `bsync`).

The optional `WOLFRAM_BUILD_SERVER` component is a generic XRPC server _framework_ (routing, auth, SSE, WebSocket, relay, blob store) you can build a service on top of. Other optional parts are SQLite persistence with `WOLFRAM_BUILD_STORE`, at-rest encryption via libsodium with `WOLFRAM_BUILD_STORE_CRYPTO`, and the hosted OAuth pairing node with `WOLFRAM_BUILD_OAUTH_NODE`. The OAuth node now serves a privacy notice at `/` and `/privacy`, keeps credentials off disk, and ships a hardened Docker Compose deployment with a read-only root filesystem and no state volume.

## Core Features

- XRPC client with bearer authentication, DPoP-bound OAuth, and binary blob upload
- Identity: DID resolution (`did:plc`, `did:web`), handle DNS TXT resolution, PLC operations
- Repo: DAG-CBOR, CAR import/export, MST, signed v3 commits, record CRUD, diff verify/apply
- High-level `wf_agent_*` wrappers for `com.atproto.*`, `app.bsky.*`, `chat.bsky.*`, `tools.ozone.*`, and graph writes
- OAuth: discovery, PKCE S256, ES256 DPoP, PAR, callback validation, token refresh/revoke, and a hosted pairing-node client
- Streaming: `subscribeRepos` firehose, `subscribeLabels`, and filtered Jetstream with cursor reconnect/backoff
- Chat: direct messages and group conversations, including group name, member counts, join links and typed member resolution
- Moderation decision engine, runtime Lexicon validation, and rich-text facets
- A Node addon (`WOLFRAM_BUILD_NODE=ON`) that exposes the update contract, OAuth pairing parsers and post display model to JavaScript, so Node consumers run Wolfram's C instead of a port
- CLI (`wolf`) for exercising the SDK end to end

## Protocol Parity

The bundled Lexicon snapshot matches the 402 documents in the upstream atproto repository. Generated C types and codecs cover the corpus, with JSON wrappers for all 319 query/procedure definitions; binary procedures use the dedicated upload/import APIs. Dedicated streaming clients cover `subscribeRepos` and `subscribeLabels`, with cursor reconnect and backoff.

## Quick Start

```sh
cmake -S . -B build && cmake --build build && ctest --test-dir build
```

That builds `./build/wolf`, the CLI:

```sh
./build/wolf post https://bsky.social you@example.com yourpassword "Hello from wolfram!"
./build/wolf help post
```

The `examples/` programs are a separate set of small binaries, built only with `-DWOLFRAM_BUILD_EXAMPLES=ON`.

## Documentation

Per-module usage guides (runnable C snippets):

- [`docs/agent.md`](https://github.com/ewanc26/wolfram/blob/main/docs/agent.md) — high-level `wf_agent_*` API
- [`docs/sync.md`](https://github.com/ewanc26/wolfram/blob/main/docs/sync.md) — repo CAR, firehose, commit verification
- [`docs/validate.md`](https://github.com/ewanc26/wolfram/blob/main/docs/validate.md) — `wf_validate_value` / `wf_validate_record`
- [`docs/moderation.md`](https://github.com/ewanc26/wolfram/blob/main/docs/moderation.md) — `wf_mod_*` decision engine
- [`docs/oauth.md`](https://github.com/ewanc26/wolfram/blob/main/docs/oauth.md) — OAuth/DPoP, PKCE, PAR, callback flow

Topic guides:

- [`docs/getting-started.md`](https://github.com/ewanc26/wolfram/blob/main/docs/getting-started.md) — install, build, persistence, Lexicon generation, examples
- [`docs/cli.md`](https://github.com/ewanc26/wolfram/blob/main/docs/cli.md) — the `wolf` command-line client
- [`docs/modules.md`](https://github.com/ewanc26/wolfram/blob/main/docs/modules.md) — full module/status table
- [`docs/roadmap.md`](https://github.com/ewanc26/wolfram/blob/main/docs/roadmap.md) — what is built and what is next

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

The toolchain file is at `.devdeps/linux-aarch64.cmake`. Toolchains for additional architectures (`arm32.cmake`, `amd64.cmake`) are also provided under `.devdeps/`.

The Wii and 3DS builds are client-only: server modules, OAuth flows, and desktop dependencies (libcurl, OpenSSL, pthreads) are excluded. The Wii U can also build the XRPC server with a bundled libmicrohttpd shim and a SQLite amalgamation, but that target compiles and links without ever having run on hardware. The Wii requires a unique externally provisioned entropy seed through `wf_wii_set_entropy_seed`.

### Classic Mac OS 9

A standalone Classic Mac OS 9 XRPC transport is included for consumers such as Platinum. It uses Open Transport for TCP and the external [macTLS](https://github.com/mplsllc/macTLS) async stream for TLS 1.3 with TLS 1.2 fallback, without libcurl, OpenSSL, pthreads or modern POSIX networking APIs.

```sh
cmake -S . -B build-macos9-transport \
  -DWOLFRAM_BUILD_MACOS9_TRANSPORT=ON \
  -DWOLFRAM_MACTLS_ROOT=/path/to/macTLS
cmake --build build-macos9-transport --target wolfram-macos9-transport
ctest --test-dir build-macos9-transport -R macos9_transport
```

It exposes the same low-level XRPC semantics as the other backends, including bearer auth, one refresh-and-retry on an expired token, DPoP nonce capture and bounded response buffering, and is written to strict C89. It is not a full `libwolfram` Mac OS 9 port: OAuth/DPoP signing needs a bridge, which Platinum provides.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/wolfram/blob/main/LICENSE). Running a modified Wolfram as part of a public network service obliges you to offer its users the corresponding source.
