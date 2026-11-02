---
title: cobalt
description: A native AT Protocol / Bluesky client for the Nintendo Wii U, built as Aroma homebrew with devkitPro/WUT and SDL2.
date: 2026-11-02
tags: [wiiu, c, atproto, bluesky, homebrew, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3msv4i3ph622l"
---

[cobalt](https://github.com/ewanc26/cobalt) is a native AT Protocol / Bluesky client for the Nintendo Wii U, built as Aroma homebrew with devkitPro/WUT and SDL2. It aims to feel like a Wii U app that happens to show Bluesky content — rounded tiles, the system's blues and whites, a real GamePad layout — rather than the Bluesky website rendered through the console's browser. Both screens are first-class: TV plus GamePad together, and Off-TV Play with the GamePad on its own.

Named after the blue mineral, following the naming convention across [wolfram](https://github.com/ewanc26/wolfram), [malachite](https://github.com/ewanc26/malachite), [inkwell](https://github.com/ewanc26/inkwell), and [bismuth](/projects/bismuth) — and echoing [Channel Blue](/projects/channel-blue), its Wii counterpart.

## Status

**Usable on real hardware** — version 0.14.0. Cobalt is installed and running on a Wii U, and the core Bluesky workflow is usable end-to-end. Host-side compilation, unit tests, link checks, mock-PDS tests and the desktop simulator add coverage, but they do not replace the console.

- TV + GamePad and Off-TV Play layouts
- Light and dark themes, three post-text sizes and a high-contrast mode, set in Settings and saved to the SD card, with one row to reset them
- A Credits screen listing every repository in the stack
- Diagnostics covering paths, networking, TLS, Wolfram and session state
- App-password sign-in with an on-screen keyboard, and browser-based OAuth sign-in through the shared hosted [Wolfram OAuth node](https://github.com/ewanc26/wolfram/blob/main/docs/oauth-node.md) at `https://oauth.croft.click`
- Persistent encrypted sessions and sign-out
- Updates through the Homebrew App Store, where Cobalt is now published; Cobalt no longer updates itself in-app
- Home timeline with paging, reposts and threads
- Posting, replies, quote posts and reply gates; threads of up to eight posts
- Likes and reposts, including undo
- Notifications and mark-as-seen, profiles, follows and unfollows
- Followers, following and profile tabs, plus pinned posts
- Links shown as a QR code for a phone to scan
- Avatars; post, reply, quote and gallery images with alt text (the first four of a gallery); a full-size image viewer; who liked or reposted a post
- Link-card previews, including article, gallery and livestream cards hydrated from the public AppView
- Actor search and post search
- Custom feed browsing; read-only lists and list members
- Mute and block, including browsable lists
- Direct messages: a conversation inbox, replies, starting a conversation, accepting or declining message requests, and a group's pending join requests. Creating and managing group conversations is on `main` and not yet in a tagged release.
- Queued posts on the SD card (up to 16), sent or discarded from a Queued posts screen
- Video poster frames with the video's duration, read from its HLS playlist

### Deliberately not planned

- **Video and GIF playback** — there is no suitable decoder in the current dependency and performance budget. Cobalt shows a video poster and duration only.
- **Push notifications** — there is no modern push service available to a Wii U homebrew application.

What is done and what is open, next to Indigo and Platinum, is in [docs/PARITY.md](https://github.com/ewanc26/cobalt/blob/main/docs/PARITY.md).

## Requirements

A Wii U with [Aroma](https://aroma.foryour.cafe/) already installed. For networked AT Protocol features, you need one of two ways to sign in:

- A Bluesky **app password** (not your account password — accounts with 2FA cannot use app passwords).
- OAuth through a hosted [Wolfram OAuth node](https://github.com/ewanc26/wolfram/blob/main/docs/oauth-node.md). Put the node's URL in the service field, leave the app password empty, and open the pairing link Cobalt shows on another device. Someone has to run the node; Cobalt does not do OAuth on the console itself.

## Installing

Copy `cobalt.wuhb` to `sd:/wiiu/apps/cobalt.wuhb` and launch it from the Wii U Menu.

`make bundle` produces a complete installation under `dist/wiiu/` with the application and a per-installation `entropy.bin`. If you install only the `.wuhb`, there is no seed and Cobalt will not go online: the first launch asks you to scribble on the GamePad until a bar fills, builds a seed from that, and asks you to restart. The seed must never be shared between consoles.

Cobalt is published in the [Homebrew App Store](https://github.com/ewanc26/cobalt/blob/main/docs/homebrew-app-store.md), which is now the normal way to install and update it.

## Updating

Cobalt has no in-app updater anymore. Updates come from the Homebrew App Store: the package there carries each release's `.wuhb`, and a newer version is what tells the store to offer it. You can also update by putting a new `.wuhb` over the old one by hand. The store package is generated by `tools/make-hbas-listing.py` and never carries `entropy.bin`, so a store install asks for a scribble on first run like any other `.wuhb`-only install. See [docs/homebrew-app-store.md](https://github.com/ewanc26/cobalt/blob/main/docs/homebrew-app-store.md).

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
make          # application
make bundle   # application plus a per-installation entropy seed
```

Cobalt looks for Wolfram at `../wolfram/build-wiiu` by default; set `WOLFRAM_ROOT` and `WOLFRAM_BUILD` to override those paths. A build can technically be produced without Wolfram, but the AT Protocol functionality is then omitted, so a normal networked build should have it available.

Other useful targets are `make test` for the host-side suite, `make cacert` to refresh the bundled TLS trust store, and `make run` to print the expected installation location.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/cobalt/blob/main/LICENSE).
