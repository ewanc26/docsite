---
title: atpkt
description: Deprecated and archived experimental AT Protocol SDK for Kotlin.
date: 2026-06-13
tags: [kotlin, atprotocol, sdk, deprecated]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnmwhgqlmb2p'
---

# atpkt

> **Deprecated and archived.** This project is no longer maintained. The repository README recommends [atproto-kotlin](https://github.com/kikin81/atproto-kotlin) instead, and the GitHub repository is archived.

An experimental, modular AT Protocol SDK for Kotlin. It explores a library-first architecture that separates core networking and authentication from service implementations.

## 01. Architecture

The `atpkt` SDK implements a decoupled library-first architecture. This design separates core networking and authentication from high-level service implementations.

- **AtpAgent**: High-level agent with `com` and `app` namespace scaffolding and helpers for the OAuth authorization and token flow.
- **Agent**: Separate entry point exposing `com`, `app`, and `tools` namespace wrappers.
- **OAuthSessionManager**: Persists and refreshes OAuth sessions, including serialized DPoP key pairs, through a pluggable `SessionStore`; `OAuthClient` handles discovery, PAR, PKCE, and token exchange.
- **Jetstream**: JSON event streaming via Kotlin Coroutines, with `wantedCollections` and `wantedDids` filters.
- **XrpcClient**: Low-level XRPC query and procedure helper with protocol error decoding.
- **Repository primitives**: Experimental DID resolution, DAG-CBOR, CID, CAR, MST, commit, and SQLite blockstore implementations.

Many high-level namespace methods are still `TODO("not yet implemented")`, and most generated lexicon code is excluded from compilation. Treat the SDK as reference code rather than a complete implementation.

## 02. Integration

The README documents this dependency coordinate for Gradle environments (group `uk.ewancroft`, version `0.1.0`):

```kotlin
dependencies {
    implementation("uk.ewancroft:atpkt:0.1.0")
}
```

The project is archived, so no ongoing releases or fixes should be expected.

## 03. Core Components

### 3.1 Authentication

`OAuthSessionManager` stores sessions through a `SessionStore` and refreshes access tokens using the saved refresh token and DPoP key pair. Discovery, PAR, and token exchange live in `OAuthClient`.

```kotlin
val manager = OAuthSessionManager(client, sessionStore)
val session = manager.refreshSession(did).getOrThrow()
```

### 3.2 API Namespaces

`Agent` exposes `com`, `app`, and `tools` namespaces, while `AtpAgent` exposes `com` and `app`. Generated Kotlin types live under `src/main/kotlin/uk/ewancroft/atpkt/generated/`. The intended call shape is:

```kotlin
val agent = Agent(sessionManager)
val profile = agent.app.bsky.actor.getProfile(actor = session.did)
```

Most of these high-level methods are currently `TODO("not yet implemented")`; the generated types and namespace wrappers are scaffolding rather than a complete API.

### 3.3 Event Streaming

The `JetstreamClient` provides a reactive interface for network events.

```kotlin
val jetstream = JetstreamClient()
jetstream.subscribe(wantedCollections = listOf("app.bsky.feed.post"))
    .collect { event -> process(event) }
```

## 04. Validation

The repository includes a Kotest and MockK test suite under `src/test/kotlin/`, covering XRPC calls, namespace wrappers, OAuth session persistence and refresh, lexicon loading and generation, and the CBOR, CID, CAR, and MST repository primitives. Run it with:

```bash
./gradlew test
```

Because the project is archived and many runtime paths are unfinished, passing tests should not be read as protocol or production readiness.
