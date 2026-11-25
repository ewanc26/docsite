---
title: Balla
description: A Facebook-inspired Bluesky client for iOS, Android and the web — the chronological Following feed as cards, without the dark patterns.
date: 2026-11-25
tags: [typescript, react-native, expo, atproto, bluesky, client, ios, android, web]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n33vrmtth62h"
---

[Balla](https://github.com/ewanc26/balla) renders Bluesky the way Facebook reads: your friends' posts as cards on a home feed, newest first, with no algorithm deciding what you see. It is independent software, not an official Bluesky client, and is not affiliated with, endorsed by or sponsored by Bluesky Social PBC or Meta Platforms, Inc. Facebook-era styling is a visual reference only.

Balla exists because of the author's mum: she was comfortable with Facebook and found Bluesky's interface confusing. Balla keeps Facebook's reading ergonomics — a warm grey canvas, cards from people you actually know, honest timestamps — and refuses the dark patterns: no engagement ranking, no ads dressed up as posts, no suggested content on every surface. It is an ordinary AT Protocol client; what it changes is what you see and how honestly it is labelled. The name is Gàidhlig for **wall**.

## Status

Web, iOS and Android. Expo SDK 58, React Native 0.88.1, TypeScript (app version 0.63.0). Shipped today:

- AT Protocol OAuth login (Balla never asks for or stores your password)
- The chronological Following feed as cards with pull-to-refresh and endless scroll, a composer above it, threads with nested reply branches, and a full-screen image viewer
- Notifications, public profiles (posts, followers, following, likes, reposts, quotes, verification and labeler badges, lists, feeds and starter packs), and account-scoped post search
- Photo posts up to ten images with per-photo alt text, MP4/GIF video with captions and honest processing states, rich-text facets, content warnings and post languages
- Reply and quote controls via real threadgate/postgate records, profile editing, and one disclosed edit per post inside five minutes
- A Search tab (Top, Latest, People, Feeds, Starter Packs), hashtag/topic/video pages, an opt-in Discover surface, and News bundles
- Lists, starter packs, saved custom feeds, appearance and accessibility settings, language settings, and multi-account support
- Direct messages with real unread counts, chat requests, groups, reactions and per-conversation settings (message content stays with Bluesky and is never stored or logged)
- A web client at `https://balla.croft.click/app`

CI installs from the committed lockfile and runs the typecheck, dependency audit, deterministic test suite, static-site build and icon sync on every push and pull request.

## Getting started

Requires Node 22+, an Expo-friendly native toolchain, and Xcode or Android Studio. OAuth needs a custom URL scheme and native crypto, so Balla runs in a development build, not Expo Go.

```sh
npm install
npx expo install --check
python3 scripts/gen-icons.py
npx expo run:ios      # or: npx expo run:android
```

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/balla/blob/main/LICENSE). Copyright (C) 2026 Ewan Croft (ewanc26).