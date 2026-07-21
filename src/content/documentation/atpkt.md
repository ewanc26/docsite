---
title: atpkt
description: Professional-grade modular AT Protocol SDK for Kotlin.
date: 2026-06-13
tags: [kotlin, atprotocol, sdk]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnmwhgqlmb2p'
---

# atpkt

Modular AT Protocol SDK for Kotlin. Engineered for strict protocol adherence and type-safe integration.

## 01. Architecture

The `atpkt` SDK implements a decoupled library-first architecture. This design separates core networking and authentication from high-level service implementations.

- **AtpAgent**: Centralized interface providing hierarchical namespace access (`agent.app.bsky`).
- **OAuthSessionManager**: Automated session lifecycle management with native DPoP compliance.
- **Jetstream**: High-efficiency JSON-based event streaming via Kotlin Coroutines.
- **XrpcClient**: Type-safe XRPC communication engine with integrated protocol error decoding.

## 02. Integration

Dependency specification for Gradle environments:

```kotlin
dependencies {
    implementation("uk.ewancroft:atpkt:0.1.0")
}
```

## 03. Core Components

### 3.1 Authentication

The SDK manages authentication via the `OAuthSessionManager`. This component handles discovery, PAR, and token exchange.

```kotlin
val manager = OAuthSessionManager(client, sessionStore)
val session = manager.refreshSession(did).getOrThrow()
```

### 3.2 API Namespaces

Protocol endpoints are organized into type-safe namespaces generated via KotlinPoet AST.

```kotlin
val agent = AtpAgent(session)
val profile = agent.app.bsky.actor.getProfile(did = session.did)
```

### 3.3 Event Streaming

The `JetstreamClient` provides a reactive interface for network events.

```kotlin
val jetstream = JetstreamClient()
jetstream.subscribe(wantedCollections = listOf("app.bsky.feed.post"))
    .collect { event -> process(event) }
```

## 04. Validation

System integrity is maintained through a comprehensive test suite using Kotest and MockK, covering XRPC networking, session serialization, and lexicon adherence.
