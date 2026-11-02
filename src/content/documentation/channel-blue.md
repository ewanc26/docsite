---
title: channel-blue
description: An archived Bluesky client for the Nintendo Wii — browse your timeline, read posts, and compose replies from the comfort of your couch. Superseded by Cobalt.
date: 2026-07-21
tags: [wii, c, atproto, bluesky, game]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udvsjhh2s'
---

[Channel Blue](https://github.com/ewanc26/channel-blue) is a Bluesky client for the Nintendo Wii. Browse your timeline, read posts, and compose replies via Wiimote and USB keyboard, built on the [wolfram](https://github.com/ewanc26/wolfram) C SDK.

> **Archived.** Channel Blue is no longer maintained and has been superseded by [Cobalt](/projects/cobalt), a native Bluesky client for the Wii U. The repository is kept as a historical record; use Cobalt for new work.

## Status

Archived MVP candidate. The Wii UI, USB-keyboard sign-in and composition flows, bounded timeline controller, search/notifications/profile screens, avatar pipeline, SD session persistence, Wolfram adapter, and mbedTLS-backed Wii HTTPS transport are implemented and cross-compile to a `.dol`. The UI boots in Dolphin; live PDS login, TLS, WiFi timing, and SD durability were never verified on Wii hardware, and the project was archived before that pass happened.

## Features

- Browse home timeline (reverse-chronological feed)
- Read individual posts and threads
- Compose posts and replies (USB keyboard input)
- Like/unlike, repost/unrepost, and follow
- Search accounts, view notifications and profile
- Fetch and display author avatars
- Session persistence on SD card

## Building

```sh
# Install devkitPro toolchain
sudo dkp-pacman -S wii-dev ppc-freetype ppc-libpng ppc-zlib

# Provision the pinned Wolfram checkout (v0.22.0, the Makefile's
# WOLFRAM_VERSION). For a live checkout, use WOLFRAM_DIR=../wolfram instead.
make wolfram-checkout

# Build libwolfram and its declared dependencies for PPC
WOLFRAM=.devdeps/wolfram
$WOLFRAM/tools/build_wii_mbedtls.sh
cmake -S $WOLFRAM -B $WOLFRAM/build-wii \
  -DCMAKE_TOOLCHAIN_FILE=$WOLFRAM/.devdeps/wii.cmake \
  -DWOLFRAM_BUILD_WII=ON -DCMAKE_BUILD_TYPE=Release
cmake --build $WOLFRAM/build-wii -j

# Build Channel Blue
make

# Assemble dist/apps/channel-blue/ with a unique TLS entropy seed
make bundle
```

The output is `channel-blue.dol`. `make bundle` generates a unique 64-byte TLS seed with OpenSSL and retains it across rebuilds. Do not copy the same `entropy.bin` to more than one installation; Channel Blue rotates it atomically before enabling TLS on every launch.

## Installing

Copy the build output to your SD card:

```
sd:/
  apps/
    channel-blue/
      boot.dol       ← channel-blue.dol (renamed)
      meta.xml       ← from repo root
      icon.png       ← from repo root
      entropy.bin    ← unique 64-byte TLS seed
```

Or deploy directly over WiFi with `wiiload channel-blue.dol`. Direct upload does not provide an SD-backed `entropy.bin`, so install the bundle once first.

For UI and controller testing, `make dolphin` boots the generated DOL in Dolphin. Copy `dist/` to Dolphin's virtual SD card if you need sign-in and networking; final WiFi, clock, SD durability and TLS testing still belonged on hardware.

## Controls

| Wiimote | Classic Controller | Action                        |
| ------- | ------------------ | ----------------------------- |
| D-pad   | D-pad / left stick | Navigate and scroll           |
| A       | A                  | Select / Open post            |
| B       | B                  | Back / Cancel                 |
| Plus    | R trigger          | Load next page / refresh      |
| Minus   | L trigger          | Compose post                  |
| 1       | X                  | Like/unlike selected post     |
| 2       | Y                  | Repost/unrepost selected post |
| Home    | Start              | Open menu                     |

## Dependencies

| Library                                            | Purpose                  | License          |
| -------------------------------------------------- | ------------------------ | ---------------- |
| [wolfram](https://github.com/ewanc26/wolfram)      | AT Protocol / XRPC       | AGPL-3.0         |
| [libogc](https://github.com/devkitPro/libogc)      | Wii hardware abstraction | Various          |
| [mbedTLS](https://github.com/Mbed-TLS/mbedtls)     | TLS/HTTPS                | Apache-2.0       |
| [FreeType](https://freetype.org/)                  | Font rendering           | FreeType GPL/FTL |
| [libpng](http://www.libpng.org/)                   | PNG decoding             | libpng license   |
| [lwIP](https://savannah.nongnu.org/projects/lwip/) | TCP/IP stack             | BSD              |

## Licence

Channel Blue is licensed under the **GNU Affero General Public License v3.0 or later** — see [LICENSE](https://github.com/ewanc26/channel-blue/blob/main/LICENSE).

The `wolfram` SDK it links against is also AGPL-3.0 — see [Wolfram's licence](https://github.com/ewanc26/wolfram/blob/main/LICENSE).
