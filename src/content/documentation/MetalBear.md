---
title: MetalBear
description: An AT Protocol Personal Data Server written in C and built on Wolfram. Provides multi-account hosting, admin tooling, and a dynamic landing page.
date: 2026-07-21
tags: [atproto, pds, c, self-hosting]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udwjdwh2s'
---

[MetalBear](https://github.com/ewanc26/metalbear) is an AT Protocol Personal Data Server written in C and built on [wolfram](https://github.com/ewanc26/wolfram). It provides a runnable PDS foundation with multi-account hosting, admin tooling, and a dynamic landing page.

**Version:** 0.2.0

## Core Features

- `com.atproto.server.describeServer`, `createSession`, `getSession`, `refreshSession`, `deleteSession`
- restart-persistent, HS256-signed AT Protocol access/refresh JWTs with refresh rotation
- durable standard and privileged app passwords with one-time password display
- repository-key-signed `com.atproto.server.getServiceAuth` JWT issuance
- authenticated record creation, update, deletion, batch writes, and CAR import
- public record reads, collection listing, repo description, and latest commit
- full or revision-filtered CAR repository export and CID-selected block export
- durable `com.atproto.sync.subscribeRepos` sequencing with live commit events
- `com.atproto.identity.resolveHandle`, `/.well-known/atproto-did`, and `did:web` service document
- `com.atproto.identity.updateHandle` and `getRecommendedDidCredentials`
- durable account deactivation/reactivation
- `com.atproto.server.checkAccountStatus`
- `com.atproto.server.reserveSigningKey`
- `com.atproto.server.createInviteCode` and `createInviteCodes`
- durable SQLite-backed signed repositories and file-backed blob upload/serving

## Admin Endpoints

- `com.atproto.admin.getAccountInfo` — resolve DID to handle/email/active state
- `com.atproto.admin.sendEmail` — send templated email
- `com.atproto.admin.getInviteCodes` — list invite codes
- `com.atproto.admin.deleteAccount` — permanently remove an account
- `com.atproto.admin.updateSubjectStatus` — apply takedown, deactivation, or reactivation
- `com.atproto.admin.updateAccountPassword` — reset account password
- `com.atproto.admin.enableAccountInvites` / `disableAccountInvites`

## OAuth Authorization Server

- `GET /.well-known/oauth-authorization-server` — RFC 8414 server metadata
- `GET /.well-known/oauth-protected-resource` — RFC 9728 resource metadata
- `GET /oauth/jwks` — ES256 public JWK Set
- `POST /oauth/par` — Pushed Authorization Request
- `GET /oauth/authorize` — Authorization endpoint with auto-approval
- `POST /oauth/token` — Token endpoint
- `POST /oauth/revoke` — Token revocation

## Build and Test

```sh
cmake -S . -B build
cmake --build build
ctest --test-dir build --output-on-failure
```

## Run

```sh
export METALBEAR_SERVICE_DID='did:web:pds.example.com'
export METALBEAR_ACCOUNT_DID='did:plc:replace-with-your-account-did'
export METALBEAR_HANDLE='alice.example.com'
export METALBEAR_USER_DOMAIN='.example.com'
export METALBEAR_PASSWORD='replace-with-a-strong-password'
./build/metalbear
```

## Email Configuration (Optional)

```sh
export METALBEAR_SMTP_HOST='smtp.example.com'
export METALBEAR_SMTP_PORT=587
export METALBEAR_SMTP_USERNAME='user@example.com'
export METALBEAR_SMTP_PASSWORD='your-smtp-password'
export METALBEAR_FROM_ADDRESS='pds@example.com'
export METALBEAR_FROM_NAME='My PDS'
export METALBEAR_ACCOUNT_EMAIL='alice@example.com'
```

## Status

This is not yet a production-complete PDS. PLC DID document publication, TLS termination, and operational hardening remain to be implemented.
