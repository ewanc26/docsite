---
title: channel-blue
description: A Bluesky client for the Nintendo Wii. Browse your timeline, read posts, and compose replies from the comfort of your couch.
date: 2026-07-21
tags: [wii, c, atproto, bluesky, game]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udvsjhh2s'
---

[Channel Blue](https://github.com/ewanc26/channel-blue) is a Bluesky client for the Nintendo Wii. Browse your timeline, read posts, and compose replies via Wiimote and USB keyboard, built on the [wolfram](https://github.com/ewanc26/wolfram) C SDK.

## Status

Wii-installable MVP. The Wii UI, USB-keyboard sign-in, timeline, thread views, discovery tabs, avatar pipeline, SD session persistence, Wolfram adapter, and mbedTLS-backed Wii HTTPS transport are implemented and cross-compile to a `.dol`. Live PDS login, TLS, WiFi timing, and SD durability still require validation on real Wii hardware.

## Features

- Browse home timeline (reverse-chronological feed)
- Read individual posts and threads
- Compose posts and replies (USB keyboard input)
- Like/unlike, repost/unrepost, and follow
- Search accounts, view notifications and profile
- Fetch and display author avatars
- Fetch and display Wii-sized image, external, and video-thumbnail previews
- Session persistence on SD card

## Building

```sh
# Install devkitPro toolchain
sudo dkp-pacman -S wii-dev ppc-freetype ppc-libpng ppc-zlib

# Build libwolfram for PPC
../wolfram/tools/build_wii_mbedtls.sh
cmake -S ../wolfram -B ../wolfram/build-wii \
  -DCMAKE_TOOLCHAIN_FILE=../wolfram/.devdeps/wii.cmake \
  -DWOLFRAM_BUILD_WII=ON -DCMAKE_BUILD_TYPE=Release
cmake --build ../wolfram/build-wii -j

# Build Channel Blue
make
make bundle
```

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

## Controls

| Wiimote | Classic Controller | Action                        |
| ------- | ------------------ | ----------------------------- |
| D-pad   | D-pad / left stick | Navigate and scroll           |
| A       | A                  | Select / Open post            |
| B       | B                  | Back / Cancel                 |
| Plus    | Plus / R trigger   | Load next page / refresh      |
| Minus   | Minus / L trigger  | Compose post                  |
| 1       | X                  | Like/unlike selected post     |
| 2       | Y                  | Repost/unrepost selected post |
| Home    | Home               | Open session menu             |

## Dependencies

| Library                                            | Purpose                  | License          |
| -------------------------------------------------- | ------------------------ | ---------------- |
| [wolfram](https://github.com/ewanc26/wolfram)      | AT Protocol / XRPC       | MIT              |
| [libogc](https://github.com/devkitPro/libogc)      | Wii hardware abstraction | Various          |
| [mbedTLS](https://github.com/Mbed-TLS/mbedtls)     | TLS/HTTPS                | Apache-2.0       |
| [FreeType](https://freetype.org/)                  | Font rendering           | FreeType GPL/FTL |
| [libpng](http://www.libpng.org/)                   | PNG decoding             | libpng license   |
| [lwIP](https://savannah.nongnu.org/projects/lwip/) | TCP/IP stack             | BSD              |

## Licence

Channel Blue is licensed under the **GNU Affero General Public License v3.0 or later** — see [LICENSE](https://github.com/ewanc26/channel-blue/blob/main/LICENSE).

The `wolfram` SDK it links against is MIT-licensed.
