---
title: atpkt
description: A professional-grade, modular ATProtocol SDK for Kotlin.
date: 2026-05-30
tags: [kotlin, atprotocol, sdk]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mnmwhgqlmb2p'
---

# atpkt

A professional-grade, modular ATProtocol SDK for Kotlin.

## Overview

`atpkt` provides the foundational building blocks for interacting with the Authenticated Transfer Protocol (AT Protocol). Designed with a library-first architecture, it decouples core networking, authentication, and repository management logic from specific service implementations.

## Architecture

`atpkt` follows the official ATProtocol "Agent" design:

- **Core Library**: Networking, XRPC client, and Session management.
- **Namespaced API**: Hierarchical access to protocol endpoints (e.g., `agent.com.atproto.*`, `agent.app.bsky.*`).
- **Lexicon Registry**: Auto-generation of type-safe Kotlin models from official schema definitions (using KotlinPoet).
- **Repository Foundations**: Content-addressed storage and Merkle Search Tree (MST) structures.
- **Streaming**: Reactive, authenticated WebSocket subscription client.

## Roadmap

- [x] Core extraction (Tid, AtProtoClient, SessionManager, RecordManager)
- [x] Namespaced API structure
- [x] AST-driven Lexicon generation (KotlinPoet)
- [x] MST & CID foundations
- [x] WebSocket Subscription (Firehose) support
- [x] DID/PLC Identity resolution
- [x] OAuth2 / DPoP compliance
