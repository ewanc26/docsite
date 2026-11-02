---
title: MetalBear
description: An AT Protocol Personal Data Server written in C23 and built on Wolfram, with multi-account hosting, OAuth, moderation, federation, and a SvelteKit frontend.
date: 2026-11-02
tags: [atproto, pds, c, self-hosting]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udwjdwh2s'
---

[MetalBear](https://github.com/ewanc26/metalbear) is an AT Protocol Personal Data Server written in C23 and built on [Wolfram](https://github.com/ewanc26/wolfram). It hosts multiple accounts and federates with Bluesky's relays and AppView.

**Version:** 0.45.0 (release stage: beta)

## Core Features

- `com.atproto.server.describeServer`, `createSession`, `getSession`, `refreshSession`, `deleteSession`
- restart-persistent, HS256-signed AT Protocol access/refresh JWTs with refresh rotation, a bounded reuse grace period, and revocation
- durable standard and privileged app passwords with one-time password display, scope-preserving sessions, listing, and revocation
- repository-key-signed `com.atproto.server.getServiceAuth` JWT issuance with audience, method, protected-method, and expiration validation
- authenticated record creation, update, deletion, batch writes, and CAR import
- public record reads, collection listing, repo description, and latest commit
- full or revision-filtered CAR repository export and CID-selected block export
- public repository status, multi-account repository enumeration, and `com.atproto.sync.listBlobs` with limit/cursor pagination
- durable `com.atproto.sync.subscribeRepos` sequencing with live commit events, cursor replay across restarts, and `FutureCursor` errors
- `com.atproto.identity.resolveHandle`, `/.well-known/atproto-did`, and `did:web` service document
- `com.atproto.identity.updateHandle` and `getRecommendedDidCredentials`
- durable account deactivation/reactivation with session, status, and firehose events
- `com.atproto.server.checkAccountStatus`
- `com.atproto.server.reserveSigningKey`
- `com.atproto.server.createInviteCode` and `createInviteCodes`
- account deletion through `com.atproto.server.requestAccountDelete` and `deleteAccount`
- optional TOTP two-factor login with one-time backup codes, under `uk.ewancroft.totp.enrol`, `confirm`, and `disable`
- legacy and current `app.bsky.video` upload flows, including durable multipart sessions and the lexicon's 300 MB limit
- `com.atproto.label.queryLabels`, serving the server's own `!takedown` labels
- scheduled backups of the data directory, off until an interval is configured; each run takes a consistent copy of every database, verifies the archive and keeps the newest set
- durable SQLite-backed signed repositories and file-backed blob upload/serving

## Admin Endpoints

- `com.atproto.admin.getAccountInfo` — resolve DID to handle/email/active state
- `com.atproto.admin.sendEmail` — send templated email
- `com.atproto.admin.getInviteCodes` — list invite codes
- `com.atproto.admin.disableInviteCodes` — disable codes by code or account
- `com.atproto.admin.deleteAccount` — permanently remove an account and its data
- `com.atproto.admin.updateSubjectStatus` — apply takedown, deactivation, or reactivation
- `com.atproto.admin.getSubjectStatus` — read the status of a repo, record, or blob subject
- `com.atproto.admin.updateAccountPassword` — reset account password
- `com.atproto.admin.enableAccountInvites` / `disableAccountInvites`

Admin procedures use HTTP Basic auth with `admin:<admin password>`.

### Moderation

`updateSubjectStatus` can take down an account, a single record, or a single blob. A blob is identified by both its CID and the DID holding it, because identical bytes share a CID across accounts. Account takedowns revoke sessions, refuse new logins with `AccountTakedown`, stop handle resolution, and emit `takendown` on the firehose; a taken-down record or blob reads as absent without being erased from the repository.

## OAuth Authorization Server

- `GET /.well-known/oauth-authorization-server` — RFC 8414 server metadata with DPoP, PKCE S256, and PAR requirements
- `GET /.well-known/oauth-protected-resource` — RFC 9728 resource metadata
- `GET /oauth/jwks` — ES256 public JWK Set
- `POST /oauth/par` — Pushed Authorization Request (RFC 9126)
- `GET /oauth/authorize` — Authorization endpoint with auto-approval
- `POST /oauth/token` — Token endpoint (authorization code and refresh grants)
- `POST /oauth/revoke` — Token revocation (RFC 7009)

OAuth tokens support static scopes (`atproto`, `transition:email`, `transition:generic`, `transition:chat.bsky`) and dynamic repo scopes such as `repo:app.bsky.feed.post?action=create`. Scope enforcement applies to `com.atproto.repo.createRecord`, `putRecord`, and `deleteRecord`.

## Build and Test

MetalBear needs both a C and a C++ compiler. Wolfram's server dependencies are required: `libmicrohttpd`, SQLite, libsecp256k1, OpenSSL, and libcurl. Wolfram is fetched pinned to `v0.41.0` by CMake FetchContent, so no sibling checkout is needed.

```sh
cmake -S . -B build
cmake --build build
ctest --test-dir build --output-on-failure
```

Or provision a host end to end — dependencies, build, secrets, config file, and a running daemon:

```sh
scripts/setup.sh --hostname pds.example.com
```

Pass `--local` instead of `--hostname` for a development instance on `http://localhost:2583` with `did:key` identities.

## Containers

Container images are published at `ghcr.io/ewanc26/metalbear` with Debian, Alpine, and dev variants; each has exact-version, minor, and `latest` tags.

```sh
docker run -d --name metalbear -p 2583:2583 -v metalbear-data:/data \
  -e METALBEAR_SERVICE_DID=did:web:pds.example.com \
  -e METALBEAR_USER_DOMAIN=.pds.example.com \
  ghcr.io/ewanc26/metalbear:latest
```

The images serve the built SvelteKit frontend at `/`, with the C landing page at `/landing`; set `METALBEAR_FRONTEND_DIR` to point a native install at a frontend build. Upgrades should go through `scripts/container-update.sh snapshot|upgrade|rollback`, which snapshots `/data`, checks `/xrpc/_health`, and restores both data and image if the check fails.

## Run

No account is configured at startup; accounts are created through `com.atproto.server.createAccount`. Configuration can live in a TOML or YAML file, and environment variables override it.

```sh
export METALBEAR_SERVICE_DID='did:web:pds.example.com'
export METALBEAR_USER_DOMAIN='.example.com'
export METALBEAR_ADMIN_PASSWORD='replace-with-a-strong-password'
./build/metalbear
```

`METALBEAR_INVITE_REQUIRED` defaults to true. Mint a code with admin Basic auth, then use it to create the first account:

```sh
curl -sS -u "admin:$METALBEAR_ADMIN_PASSWORD" -X POST \
  -H 'Content-Type: application/json' --data '{"useCount":1}' \
  http://127.0.0.1:2583/xrpc/com.atproto.server.createInviteCode

curl -sS -X POST -H 'Content-Type: application/json' \
  --data '{"handle":"alice.example.com","email":"alice@example.com",
           "password":"...","inviteCode":"..."}' \
  http://127.0.0.1:2583/xrpc/com.atproto.server.createAccount
```

Other optional variables include `METALBEAR_LISTEN`, `METALBEAR_PORT` (default 2583), `METALBEAR_DATA`, `METALBEAR_PUBLIC_URL`, and `METALBEAR_CRAWLERS`; see `config.example.toml` and `config.example.yaml` for the full set. `metalbear --version` and `metalbear --help` work without any environment set.

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
