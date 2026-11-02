---
title: inkwell
description: A native reader and writer for the Standard.site publishing ecosystem on AT Protocol, with iOS and Android apps sharing a Kotlin Multiplatform core.
date: 2026-06-30
tags: [swift, swiftui, kotlin, android, ios, atprotocol, standard-site]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mpht4rggcp27"
---

[Inkwell](https://github.com/ewanc26/inkwell) is a native reader and writer for the [Standard.site](https://standard.site) publishing ecosystem on AT Protocol. **Version 2.7.2** ships as an iOS app and an Android app from one monorepo, which also holds a shared Kotlin Multiplatform core and the marketing/legal [website](/projects/inkwell-website). The [Android client](/projects/inkwell-android) remains labelled experimental, but most of the parity gap has closed.

## Features

- **Read** — Fetches `site.standard.publication` and `site.standard.document` records from the author's PDS. Three-tab layout (Read / Discover / Write), with cache-first feeds and live updates.
- **Content rendering** — Renders Markpub Markdown plus Leaflet, pckt, and Offprint content. Uses `textContent` as a fallback. Native block rendering for Leaflet (including blob-stored pages), Markdown for everything else. iOS also resolves Markpub bodies stored in `textBlob`.
- **Theme resolution** — Leaflet's light/dark palette → `basicTheme` → system defaults. Publication-level by default, overridable per document.
- **Write** — Split-pane editor with live Markdown preview, formatting toolbar, image upload, document editing, and selectable content formats. Loss reporting when a conversion does not round-trip.
- **Document metadata** — Tags, contributors, cover image, Bluesky discussion post and self-label content warnings, edited without dropping unknown fields; drafts autosave and a remote edit produces a conflict prompt.
- **Oversized records** — Both apps measure the final record and move an oversized body into Markpub `textBlob` or Leaflet `blobPages` instead of failing at the PDS. pckt and Offprint have no such field and report the problem.
- **Social graph** — Creates and removes `site.standard.graph.subscription` records, recommends, comments, likes, reposts and replies.
- **Discover** — Searches the cross-platform Standard.site public index and AT Protocol accounts, with publication and account profiles.
- **Verification** — Publication `.well-known` and document `<link>` verification.
- **Notifications** — Local notifications for new subscribed documents while the app is open, with background polling as the fallback.
- **Moderation** — Label and keyword preferences, muted/blocked list management, and reporting.
- **Authentication** — OAuth sign-in with your AT Protocol handle (no app password). Session resumes silently from the Keychain on iOS and from an Android Keystore-sealed store on Android.

## Architecture

- **Shared core**: Kotlin Multiplatform (`shared/`) for format conversion, Markdown parsing, facets, content models, verification URLs and Constellation deduplication.
- **iOS**: Swift and SwiftUI, NavigationStack, ATProtoKit, Codable, Keychain, `BGAppRefreshTask`.
- **Android**: Kotlin, Jetpack Compose + Material 3, Navigation Compose, OkHttp + atproto-kotlin, kotlinx.serialization, Hilt, Android Keystore, WorkManager.

## Distribution

Inkwell is distributed through [AltStore Classic](https://inkwell.ewancroft.uk) for iOS and a self-hosted F-Droid repository for Android. There are no App Store or Google Play listings yet.

## Licence

AGPL-3.0 with an [App Store Distribution Exception](https://github.com/ewanc26/inkwell/blob/main/APP_STORE_EXCEPTION.md) granted as an additional permission under AGPL section 7. It does not remove the AGPL's source-availability or copyleft requirements.
