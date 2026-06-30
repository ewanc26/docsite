---
title: inkwell
description: A native SwiftUI reader and writer for the Standard.site publishing ecosystem on AT Protocol.
date: 2026-06-30
tags: [swift, swiftui, ios, atprotocol, standard-site]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mpht4rggcp27"
---

[Inkwell](https://github.com/ewanc26/inkwell) is a native SwiftUI reader and writer for the [Standard.site](https://standard.site) publishing ecosystem on AT Protocol. It is the primary iOS client, with an [experimental Android version](https://github.com/ewanc26/inkwell-android) also available.

## Features

- **Read** — Fetches `site.standard.publication` and `site.standard.document` records from the author's PDS. Three-tab layout (Read / Discover / Write).
- **Content rendering** — Renders Markpub Markdown plus Leaflet, pckt, and Offprint content. Uses `textContent` as a fallback. Native block rendering for Leaflet (including blob-stored pages), Markdown for everything else.
- **Theme resolution** — Leaflet's light/dark palette → `basicTheme` → system defaults. Publication-level by default, overridable per document.
- **Write** — Publishes Standard.site documents with portable metadata and selectable content formats.
- **Social graph** — Creates and removes `site.standard.graph.subscription` records and recommendations.
- **Discover** — Searches the cross-platform Standard.site public index, fetches records directly from the author.
- **Verification** — Publication `.well-known` and document `<link>` verification.
- **Notifications** — Polls subscribed publications for notifications (in-app + local), including background app refresh.
- **Authentication** — OAuth sign-in with your AT Protocol handle (no app password). Session resumes silently from the Keychain on relaunch.

## Architecture

- **Language**: Swift
- **UI**: SwiftUI
- **Navigation**: NavigationStack
- **Networking**: URLSession + OAuthenticator
- **Serialization**: Codable
- **Background**: BGAppRefreshTask

## Licence

AGPL-3.0-only.
