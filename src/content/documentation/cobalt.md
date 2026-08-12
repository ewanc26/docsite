---
title: cobalt
description: A native AT Protocol / Bluesky client for the Nintendo Wii U, built as Aroma homebrew with devkitPro/WUT and SDL2.
date: 2026-08-12
tags: [wiiu, c, atproto, bluesky, homebrew, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3msv4i3ph622l"
---

[cobalt](https://github.com/ewanc26/cobalt) is a native AT Protocol / Bluesky client for the Nintendo Wii U, built as Aroma homebrew with devkitPro/WUT and SDL2. It aims to feel like a Wii U app that happens to show Bluesky content — rounded tiles, the system's blues and whites, a real GamePad layout — rather than the Bluesky website rendered through the console's browser. Both screens are first-class: TV plus GamePad together, and Off-TV Play with the GamePad on its own.

Named after the blue mineral, following the naming convention across [wolfram](https://github.com/ewanc26/wolfram), [malachite](https://github.com/ewanc26/malachite), [inkwell](https://github.com/ewanc26/inkwell), and [bismuth](/projects/bismuth) — and echoing [Channel Blue](/projects/channel-blue), its Wii counterpart.

## Status

Early, but usable in shape. Reading, posting, and interacting all exist; nothing has been run on real hardware yet.

- Boots on real hardware, exits cleanly to the Wii U Menu
- TV + GamePad and Off-TV Play layouts
- Diagnostics screen (paths, network, TLS, session)
- Sign in with an app password via on-screen keyboard, session saved across boots
- Timeline, threads with replies/re-rooting, like/repost with undo, posting/replying
- Notifications with mark-as-seen, profiles, follow/unfollow, avatars
- Post images and link cards — markers for now
- Search, custom feeds, lists, mutes, and blocks — not started
- Video, GIFs, DMs, and push notifications — not planned (console limitations)

It builds and an extensive host test suite passes, but every milestone's real acceptance test is the console, and none of them have had one.

## Requirements

A Wii U with [Aroma](https://aroma.foryour.cafe/) already installed, and a Bluesky **app password** (not your account password — accounts with 2FA cannot use app passwords).

## Installing

Copy `cobalt.wuhb` to `sd:/wiiu/apps/` and launch it from the Wii U Menu.

## Building

```sh
# Toolchain (once)
sudo dkp-pacman -S wiiu-dev wiiu-sdl2 wiiu-sdl2_ttf wiiu-sdl2_image wiiu-curl wiiu-mbedtls

# Wolfram, as a sibling checkout
git clone https://github.com/ewanc26/wolfram ../wolfram
cd ../wolfram
cmake -S . -B build-wiiu -DCMAKE_TOOLCHAIN_FILE=$PWD/.devdeps/wiiu.cmake \
  -DWOLFRAM_BUILD_WIIU=ON -DWOLFRAM_BUILD_TESTS=OFF -DWOLFRAM_BUILD_EXAMPLES=OFF
cmake --build build-wiiu -j8 --target wolfram
cd -

# Cobalt
make bundle
```

Without the Wolfram sibling checkout, Cobalt still builds and boots, but every AT Protocol feature is disabled.

## Licence

GPL-3.0 — see [LICENSE](https://github.com/ewanc26/cobalt/blob/main/LICENSE).
