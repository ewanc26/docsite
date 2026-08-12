---
title: willow
description: A native SwiftUI Bluesky / AT Protocol client targeting iOS and macOS from one shared codebase. Early stage — currently the initial Xcode SwiftData template.
date: 2026-08-12
tags: [swift, swiftui, ios, macos, atproto, bluesky]
draft: false
---

[willow](https://github.com/ewanc26/willow) is a native SwiftUI Bluesky / AT Protocol client targeting iOS and macOS from one shared codebase.

## Status

Early stage. The repository is currently still the initial Xcode SwiftData template — a `WillowApp` entry point, a placeholder `ContentView` listing `Item` records, and the default test targets. No Bluesky functionality exists yet; a successful build only proves the template compiles.

## Planned Architecture

- **SwiftUI-first** — UI defined in each view's `body`; shared code stays shared, platform differences isolated behind `#if os(...)`
- **Structured concurrency** — `async`/`await` and `AsyncSequence` throughout, no Combine
- **Keychain-backed sessions** — access/refresh tokens from `com.atproto.server.createSession` / `refreshSession` stored in the Keychain, never in SwiftData or `UserDefaults`
- **DID-keyed identity** — resolves handle → DID → PDS and keys state by DID, not handle, with support for custom PDS hosts

Reads/writes will live under the `app.bsky.*` and `com.atproto.*` lexicons, cross-checked against the canonical [bluesky-social/atproto](https://github.com/bluesky-social/atproto) implementation and [wolfram](https://github.com/ewanc26/wolfram), the author's C AT Protocol SDK powering the sibling console clients [Channel Blue](/projects/channel-blue) and [cobalt](/projects/cobalt).

## Testing

- `WillowTests` — Swift Testing framework (`@Test`, `#expect`)
- `WillowUITests` — XCUIAutomation

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/willow/blob/main/LICENSE).
