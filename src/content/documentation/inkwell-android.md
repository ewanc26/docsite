---
title: inkwell-android
description: Experimental Android client for the Standard.site publishing ecosystem on AT Protocol — Jetpack Compose + Material 3.
date: 2026-06-30
tags: [kotlin, android, jetpack-compose, atprotocol, standard-site]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mpht4rjhxp27"
---

[Inkwell for Android](https://github.com/ewanc26/inkwell-android) is an experimental Android companion to [Inkwell for iOS](https://github.com/ewanc26/inkwell). Built with Jetpack Compose, Material 3, and Kotlin, it aims for feature parity with the iOS version.

## Features

- **Read** — Fetches `site.standard.publication` and `site.standard.document` records from the author's PDS. Three-tab layout (Read / Discover / Write). Renders Leaflet blocks and Markpub/Offprint/pckt markdown.
- **Discover** — Searches the Standard.site public index. Cross-repo comment discovery via Constellation. Paginated feed with prev/next navigation.
- **Write** — Publishes Standard.site documents with portable metadata and selectable content formats.
- **Authentication** — OAuth with your AT Protocol handle (no app password). Session restores silently on relaunch.
- **Verification** — Publication `.well-known` and document `<link>` checks. Background notification polling via WorkManager.

## Architecture

| Component | iOS (primary) | Android (experimental) |
|---|---|---|
| Language | Swift | Kotlin |
| UI | SwiftUI | Jetpack Compose + Material 3 |
| Navigation | NavigationStack | Navigation Compose |
| Networking | URLSession + OAuthenticator | OkHttp |
| Serialization | Codable | kotlinx.serialization |
| DI | @Environment | Hilt |
| Background | BGAppRefreshTask | WorkManager |

Both share the same AT Protocol data model shapes, Constellation cross-repo discovery pattern, theme resolution cascade, and three-tab structure.

## Status

**Experimental** — work-in-progress toward feature parity with the iOS version.

## Licence

AGPL-3.0-only.
