---
title: Platinum
description: A native Bluesky client for Classic Mac OS 9, with a small Node bridge covering the parts a 1990s operating system cannot do itself.
date: 2026-11-02
tags: [macos9, retro, c, atproto, bluesky, desktop]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mzdpjzlksd2f"
---

[Platinum](https://github.com/ewanc26/platinum) is a Bluesky client for Classic Mac OS 9. It is the Mac OS 9 member of the same family as [Cobalt](/projects/cobalt) on the Wii U and [Indigo](/projects/indigo) on the 3DS, built on [Wolfram](https://github.com/ewanc26/wolfram) for the AT Protocol work. It is not a browser pointed at a web app: it is a C89 application named after the Platinum appearance, intended to look like it belongs in a System Folder.

There is no packaged release of the Mac application yet. Releases are paused until Platinum has been run on Mac OS 9 itself.

## How it fits together

Mac OS 9 has no modern TLS, OAuth or DID resolution, so Platinum currently has two parts:

```
Today:   Classic Mac OS 9  --HTTP + JSON-->  Platinum Bridge  --AT Protocol-->  PDS / AppView
Target:  Classic Mac OS 9  --HTTPS + XRPC------------------------------->  PDS / AppView
```

- **The bridge** is a small Node.js service that does OAuth pairing, issues and revokes tokens, and serves a profile, timeline, notifications and posting. It can update itself from this repository's releases when asked.
- **The native client** is the Mac application. It is being migrated off the bridge a route at a time, using Wolfram's Open Transport and macTLS transport directly.

The first native modules (URLs, identity and session parsing) live in [`macos9/atproto_*.c`](https://github.com/ewanc26/platinum/tree/main/macos9) and are host-tested. [`docs/architecture/native-client-migration.md`](https://github.com/ewanc26/platinum/blob/main/docs/architecture/native-client-migration.md) maps every route to its native replacement and records what is not done.

## Status

Early, and stated plainly:

- **The bridge works.** It does OAuth pairing, issues and revokes tokens, and serves a profile, a timeline, notifications and posting. App-password sign-in exists but is off unless enabled.
- **The native bridge is being built.** `native/` is a C bridge on Wolfram meant to replace the Node service, and every route family is implemented. Its CI job builds Wolfram from a pinned commit and runs the C tests and Wolfram-backed routes against a mock PDS; it has not run against a live PDS or on a Mac.
- **The Mac client is written but unproven.** It has a window, menus, a timeline, threads, profiles, people lists, search, notifications, compose (with replies, quotes and reply limits), and preferences. CI compiles every source as strict C89 against declaration-only Mac SDK stubs and runs the pairing and JSON tests; that checks dialect and types, not a CodeWarrior build or a run on real hardware.
- **Much is missing.** The timeline, notifications, likes and reposts now use the native session; replies, quotes, profile actions, search, conversations and compose still use the bridge. Images and native post publishing are unfinished. [`docs/PARITY.md`](https://github.com/ewanc26/platinum/blob/main/docs/PARITY.md) lists every gap against Cobalt and Indigo, and CI checks the table against the code.

Recent native work includes opening threads through the Mac's own session first, flattening `app.bsky.feed.getPostThread` in C, filtering the native timeline with the account's muted words, and a native app-password sign-in window with shared keyboard rules. The bridge path remains for anything not yet migrated.

## Installing

There is no packaged Mac application yet. The bridge can be run from this repository or from a release archive.

Requirements for the bridge: Node.js 22 or newer, and a public HTTPS address if you want OAuth outside your own machine. The bridge's update manifest, its parsing, SHA-256 and signature verification, and the OAuth pairing parsers are Wolfram's own C, loaded through Wolfram's Node addon at the commit pinned in `ci.yml`.

The Mac client targets CodeWarrior-era tools, Wolfram 0.26.0 or newer for the transport, and [macTLS](https://github.com/mplsllc/macTLS).

## Using the bridge

```sh
cd bridge
cp .env.example .env
npm install
npm run build
npm start
```

It listens on `127.0.0.1:8787`. For OAuth, set `PLATINUM_BRIDGE_PUBLIC_URL` to the externally reachable HTTPS address; the client metadata and callback are derived from it. Do not put the bridge on an untrusted network without HTTPS and access control.

Pairing is done in a browser, once:

1. Open `/login?handle=you.example.com` on the bridge.
2. Complete the OAuth flow.
3. The bridge shows a six-character code, good for ten minutes and one use.
4. Type it into Platinum. The Mac stores a bridge token, your DID and an installation ID.

OAuth refresh credentials never leave the bridge. Tokens are revocable with `POST /v1/revoke`; treat them as credentials and keep them out of logs and bug reports. App-password sign-in is possible if `PLATINUM_BRIDGE_ALLOW_APP_PASSWORD=1` is set, but over plain HTTP the password crosses the network in the clear. The Mac client exposes this path through its dedicated sign-in window.

The wire protocol is in [`docs/BRIDGE_PROTOCOL.md`](https://github.com/ewanc26/platinum/blob/main/docs/BRIDGE_PROTOCOL.md); the window and menu design is in [`docs/UI_DESIGN.md`](https://github.com/ewanc26/platinum/blob/main/docs/UI_DESIGN.md).

## Building

Bridge:

```sh
cd bridge
npm run check
# The tests need Wolfram's Node addon; build it from a Wolfram checkout
# (the commit pinned in .github/workflows/ci.yml) into bridge/build/ first.
tools/build-addon.sh ../wolfram
npm test
npm run build
```

Mac client: build Wolfram's Mac OS 9 transport against macTLS first.

```sh
cmake -S . -B build-macos9-transport \
  -DWOLFRAM_BUILD_MACOS9_TRANSPORT=ON \
  -DWOLFRAM_MACTLS_ROOT=/path/to/macTLS
cmake --build build-macos9-transport --target wolfram-macos9-transport
```

Then build the application with [Retro68](https://github.com/autc04/Retro68), a GCC-based cross-compiler for Classic Mac OS (68k and PowerPC):

```sh
docker run --rm -v "$PWD":/root -v /path/to/wolfram:/root/wolfram \
  ghcr.io/autc04/retro68 tools/build-macos9.sh [68k|ppc|both]
```

That produces a MacBinary application file in `build-macos9-*/Platinum.bin`, with the compiled resource fork carried inside it. Take the `.bin` copy to a Mac OS 9 volume — real hardware or an emulator such as BasiliskII, SheepShaver or Mini vMac — and double-click.

The CI build links a test transport stub because the Wolfram transport needs Open Transport and macTLS. A real build links the transport libraries with `-DPLATINUM_LINK_TRANSPORT_STUB=OFF -DPLATINUM_TRANSPORT_LIBS=...`; a stub binary cannot reach the bridge and must not be distributed.

## Testing

The Mac target has four validation layers, described in [`docs/TESTING_MACOS9.md`](https://github.com/ewanc26/platinum/blob/main/docs/TESTING_MACOS9.md): the C89 source sweep, host UI logic tests for layout and interaction, the Retro68 68k and PowerPC builds, and a QEMU harness that boots a Mac OS 9 guest headlessly for screenshots and synthetic input. Only the first three run on public CI; the runtime layer needs an owner-supplied Mac OS 9 installation that is never committed.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/platinum/blob/main/LICENSE).
