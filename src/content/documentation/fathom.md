---
title: Fathom
description: A native teal.fm client for iOS and Android that reads the plays already in your AT Protocol repo and turns them into a listening dashboard — a reader that never writes a record.
date: 2026-11-23
tags: [swift, kotlin, atproto, teal-fm, music, ios, android, client]
draft: false
---

[Fathom](https://github.com/ewanc26/fathom) is a native teal.fm client for iOS and Android. It reads the plays already in your AT Protocol repo and turns them into a listening dashboard: what is playing now, what today has been, top artists, releases and tracks over 7 days, 30 days or all time, and the full history grouped by the day you actually had.

It is a **reader**. It never writes a record, never asks for a password and never holds a token. A fathom is a unit of depth, and to fathom something is to understand it: Fathom measures a listening history and makes the record underneath it legible, while leaving that record in your own repository.

## Why it reads your repo rather than an AppView

teal.fm's custom lexicons describe plays, profiles and statuses, and their records live in each person's own PDS. The hosted AppViews are not reliably deployed, so a dashboard built on those endpoints would mostly not load. Instead Fathom reads `com.atproto.repo.listRecords` from the account's PDS and aggregates on the device, a hundred records at a time, until the repo runs out. Reading all of it is what makes "All time" a total.

## Status

Read-only, and new.

- **The dashboard works end to end.** All four screens draw from a full read of a real account, a second launch opens from the saved copy, and the reading banner can be dismissed while the read continues behind it.
- **The figures are honest by construction.** A read that ends early is labelled partial rather than passed off as complete, and the runaway guard stops at 50,000 plays.
- **Both channels are live, neither app has been run on a device.** Fathom 0.2.1 is distributed through Altstore Classic and a self-hosted F-Droid repo. Everything verified is Android emulator and iOS simulator; no physical-device smoke test has been done.
- **The write path is planned, not started.** Live scrobbling — OAuth, play qualification, an outbound queue and the controls that come with them — is designed in the issue tracker. Nothing here writes yet.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/fathom/blob/main/LICENSE).