---
title: Indigo
description: A native Bluesky client for the Nintendo 3DS, built with libctru and citro2d/citro3d on top of Wolfram's AT Protocol SDK.
date: 2026-11-02
tags: [3ds, c, atproto, bluesky, homebrew, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mzdpjzrqk32m"
---

[Indigo](https://github.com/ewanc26/indigo) is a native Bluesky client for the Nintendo 3DS. **Version 0.15.0** is a normal 3DS homebrew application — libctru for the platform, citro2d/citro3d for GPU-backed rendering, and [Wolfram](https://github.com/ewanc26/wolfram) for the AT Protocol — not a port of [Cobalt](/projects/cobalt) and not a browser wrapped around a web app. It is designed around the console's own two-screen layout: the top screen is for reading, the bottom screen is for doing.

Indigo is named after the dye and the indigo bunting, a small songbird. It is the 3DS member of the same client family as Cobalt on the Wii U and [Platinum](/projects/platinum) on Classic Mac OS 9. Accounts on custom PDSes are supported.

## Features

- Home timeline with paging, threads, profiles (posts, replies, media and likes tabs), notifications, actor and post search, curated lists and saved custom feeds
- Posting, replies, quote posts and reply gates; text-only threads of up to eight posts
- Likes and reposts, with undo; deleting your own posts from the thread screen
- Avatars, post images and link cards, with an optional alt-text display and a full-size image viewer
- Video poster frames with the video's duration, read from its HLS playlist
- Mute and block, muted words and hide-reposts in the home timeline and custom feeds
- Direct messages: inbox, conversations, replies, message requests, and starting a conversation. On a group, its pending join requests can be approved or rejected.
- Group conversations on `main`: create one from a name and member list, rename it, add or remove members, and create or toggle its join link
- Saved posts and queued posts on the SD card, plus an unsent draft kept across restarts
- Web links shown as QR codes on the top screen, so a phone can open what the 3DS cannot
- Settings for text size, alt text and other preferences, saved to the SD card
- Self-updates from this repository's releases, with a signed manifest, a SHA-256 check and recovery from an interrupted update
- A Credits screen listing every repository in the stack

## Signing in

There are two flows, and the second is not a replacement for the first:

- **App password** — enter a handle and app password (the service field is optional; Indigo finds the account's PDS from the handle, starting from `https://bsky.social`). Use an app password, never your main password.
- **Browser sign-in** — leave the password empty to start OAuth through the shared Wolfram pairing node at `https://oauth.croft.click`, also used by Cobalt and Platinum. The PDS handles the password and MFA, and Indigo never sees either.

The session is saved as plaintext at `sdmc:/3ds/indigo/session.dat`, because the SD card has no permissions and an obfuscation key stored beside the file would be false comfort. Logs go to `sdmc:/3ds/indigo/indigo.log` and never contain tokens or passwords.

## Installing

Indigo's Universal-DB listing is prepared and waiting on its pull request; once merged, Universal-Updater can install Indigo and pick up each new release. Until then, copy `indigo.3dsx` from the [latest release](https://github.com/ewanc26/indigo/releases/latest) to the SD card.

Universal-Updater installs it flat:

```
sdmc:/3ds/indigo.3dsx
```

A manual install can use the bundle layout instead:

```
sdmc:/3ds/indigo/indigo.3dsx
```

The Homebrew Menu recognises the bundle as an application and uses the embedded SMDH metadata for its name, description and icon. Run one copy, not both. Whichever is running, Indigo's updater replaces the file it was launched from. A CIA target is not part of the current project scope.

## Controls

A few bindings mean the same thing almost everywhere:

| Control | Does |
|---|---|
| D-pad or Circle Pad, up and down | move the selection; hold to keep moving |
| Dragging a finger up or down a list | scrolls it a row for every row's height dragged; a tap still selects |
| L and R (C-Stick up and down on a New 3DS) | a page up or down |
| A | open or confirm |
| B | back |
| Y | like the selected post |
| X | repost the selected post |
| SELECT | reload; in compose, add or remove a picture |
| START | quit to the Homebrew Menu |
| ZR (New 3DS) | open the selected post's picture |
| Touch | the buttons on the bottom screen |

Every screen's bottom half names its own controls. The More menu adds Messages, Feeds, Lists, Queued posts, Settings and Credits.

## Architecture

```
src/
├── main.c        libctru lifecycle and frame loop
├── app/          application state and navigation
├── gfx/          platform-neutral display lists (canvas)
├── ui/           layout (pure) and citro2d/citro3d backend
├── input/        buttons, sticks and touchscreen
├── atproto/      Wolfram-backed protocol integration
├── media/        image cache and fetch/decode worker
├── store/        settings, session and draft files on the SD card
├── update/       self-update swap and recovery
└── util/         logging and small helpers
```

The renderer is GPU-backed rather than console-only. The top screen is the primary reading surface; the bottom screen is the interaction surface. Touch is an enhancement, and important actions remain usable through physical controls: the 3DS touchscreen can only reach the bottom screen, which is why nothing opens by tapping the picture itself.

## Status

Development and verification happen on the host and in the Azahar emulator; nothing has been tested on real 3DS hardware. Host unit tests, warnings-as-errors sweeps and a snapshot renderer cover layout and interaction, and CI builds and links the 3DS target. Emulator coverage includes TLS to the real service, sign-in to a custom PDS, session save and resume, timeline paging, likes and reposts, and avatars. Some newer screens — including groups — are host-tested and 3DS-built but have not been run on an emulator or a console.

What is done and what is open against Cobalt is in [`docs/PARITY.md`](https://github.com/ewanc26/indigo/blob/main/docs/PARITY.md). The changelog is in [`CHANGELOG.md`](https://github.com/ewanc26/indigo/blob/main/CHANGELOG.md).

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/indigo/blob/main/LICENSE).
