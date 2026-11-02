---
title: inkwell-android
description: Android client for the Standard.site publishing ecosystem on AT Protocol — Jetpack Compose + Material 3, now maintained in the Inkwell monorepo.
date: 2026-06-30
tags: [kotlin, android, jetpack-compose, atprotocol, standard-site, archived]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mpht4rjhxp27"
---

> **Archived standalone repo.** [inkwell-android](https://github.com/ewanc26/inkwell-android) is archived — GitHub describes it as "Archived: consolidated into https://github.com/ewanc26/inkwell (Android/)". The Android client now lives in the [`Android/`](https://github.com/ewanc26/inkwell/tree/main/Android) directory of the [Inkwell monorepo](https://github.com/ewanc26/inkwell). See [Inkwell](/projects/inkwell) for the current project.

Inkwell for Android is the Kotlin/Compose companion to [Inkwell for iOS](/projects/inkwell). It aims for feature parity with the iOS version and shares the monorepo's Kotlin Multiplatform core for format conversion, markdown parsing, facets, content models and verification URLs.

## Features

- **Read** — Fetches `site.standard.publication` and `site.standard.document` records from the author's PDS. Three-tab layout (Read / Discover / Write). Renders Leaflet blocks with rich-text facets, Markpub Markdown, pckt/Offprint block arrays, and Bluesky and Standard.site embeds. Publication theming (Leaflet rich theme, legacy palette, `basicTheme` cascade) and a `textContent` fallback.
- **Discover** — Searches the Standard.site public index and AT Protocol accounts. Cross-repo comment discovery via Constellation, with paginated navigation.
- **Write** — Split-pane-style editor with a formatting toolbar, live Markdown preview toggle, loss reporting, image upload, format selection (Leaflet / Markpub / pckt / Offprint), and document editing. Oversized records spill into blob-backed content where the format has a representation.
- **Document metadata** — Tags, contributors, cover image, Bluesky discussion post and self-label content warnings, without dropping unknown fields.
- **Social graph** — Subscriptions, recommends, comments, likes, reposts and replies.
- **Authentication** — OAuth with your AT Protocol handle (no app password). The session is sealed with AES-256-GCM under a non-exportable Android Keystore key and restores silently on relaunch.
- **Verification** — Publication `.well-known` and document `<link>` checks.
- **Notifications** — Jetstream-backed local notifications while the app is open, with WorkManager background polling as the fallback.
- **Moderation** — Label and keyword preferences, muted/blocked list management, and reporting.

## Architecture

| Component | iOS (primary) | Android |
|---|---|---|
| Language | Swift | Kotlin + shared Kotlin Multiplatform |
| UI | SwiftUI | Jetpack Compose + Material 3 |
| Navigation | NavigationStack | Navigation Compose |
| Networking | ATProtoKit | OkHttp + atproto-kotlin |
| Serialization | Codable | kotlinx.serialization |
| DI | @Environment | Hilt |
| Background | BGAppRefreshTask | WorkManager |

Both share the same AT Protocol data model shapes, Constellation cross-repo discovery pattern, theme resolution cascade, and three-tab structure. Shared format conversion, Markdown parsing, facets and verification URL building live in `shared/`.

## Status

**Experimental, but most of the parity gap is closed.** Version 2.7.2 (versionCode 17), minimum Android 8.0 (API 26), compiling and targeting SDK 36. The reader, discover, writer, comments/interactions and notification flows are implemented; the client is still labelled experimental in the app and on the website.

## Distribution

Android builds are distributed through a self-hosted signed F-Droid repository maintained in `Android/fdroid-repo/`; the official F-Droid submission recipe is in `Android/fdroid/`. There is no Google Play listing yet.

## Licence

AGPL-3.0 with the [App Store Distribution Exception](https://github.com/ewanc26/inkwell/blob/main/APP_STORE_EXCEPTION.md). See the repository's [LICENSE](https://github.com/ewanc26/inkwell/blob/main/LICENSE) for the base licence.
