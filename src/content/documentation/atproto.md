---
title: "@ewanc26/atproto"
description: AT Protocol service layer extracted from ewancroft.uk — profile fetching, Standard.site documents, Bluesky posts, music/mood status, Tangled repos, and a built-in in-memory cache.
date: 2026-03-06
tags: [library, atproto, typescript, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgghylqq2725"
---

[@ewanc26/atproto](https://github.com/ewanc26/pkgs/tree/main/packages/atproto) is the AT Protocol service layer extracted from [ewancroft.uk](https://ewancroft.uk). It handles all communication with the AT Protocol network: resolving identities, fetching profiles and lexicon records, reading Standard.site blog posts and documents, streaming Bluesky posts, and looking up music/mood status — all with a built-in in-memory cache.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Installation

```bash
pnpm add @ewanc26/atproto
```

Requires `@atproto/api >= 0.13.0` as a peer dependency.

## Key Design

All functions that previously read `PUBLIC_ATPROTO_DID` from the SvelteKit environment now accept `did: string` as their first argument, making the package fully portable outside of SvelteKit.

An optional `fetchFn` parameter is accepted throughout for custom fetch implementations (e.g. SvelteKit's server-side `fetch`).

## Usage

### Profile

```typescript
import { fetchProfile } from '@ewanc26/atproto';

const profile = await fetchProfile('did:plc:yourdidherexx');
// { did, handle, displayName, avatar, banner, followersCount, pronouns, … }
```

### Standard.site Documents & Blog Posts

```typescript
import { fetchPublications, fetchDocuments, fetchBlogPosts, fetchRecentDocuments } from '@ewanc26/atproto';

const pubs  = await fetchPublications(did);
const docs  = await fetchDocuments(did, publicationRkey);
const posts = await fetchBlogPosts(did, publicationRkey);
const recent = await fetchRecentDocuments(did, 5);
```

### Bluesky Posts

```typescript
import { fetchLatestBlueskyPost, fetchPostFromUri } from '@ewanc26/atproto';

const latest = await fetchLatestBlueskyPost(did);
const post   = await fetchPostFromUri(did, 'at://did:plc:…/app.bsky.feed.post/rkey');
```

### Status Records

```typescript
import { fetchMusicStatus, fetchKibunStatus } from '@ewanc26/atproto';

const music = await fetchMusicStatus(did);
// { trackName, artists, releaseName, artworkUrl, … }

const mood = await fetchKibunStatus(did);
// { text, emoji, createdAt }
```

### Tangled Repos & Links

```typescript
import { fetchTangledRepos, fetchLinks, fetchSiteInfo } from '@ewanc26/atproto';

const repos   = await fetchTangledRepos(did);
const links   = await fetchLinks(did);        // blue.linkat.board
const siteInfo = await fetchSiteInfo(did);    // uk.ewancroft.site.info
```

### Engagement (Constellation API)

```typescript
import { fetchEngagementFromConstellation, fetchAllEngagement } from '@ewanc26/atproto';

const counts = await fetchEngagementFromConstellation(postUri);
// { likeCount, repostCount }
```

### Identity Resolution

```typescript
import { resolveIdentity, getPublicAgent, getPDSAgent } from '@ewanc26/atproto';

const { did, pds } = await resolveIdentity('alice.bsky.social');
const agent = await getPDSAgent(did);
```

### Pagination

```typescript
import { fetchAllRecords, fetchAllUserRecords } from '@ewanc26/atproto';

const records = await fetchAllRecords({ did, collection: 'app.bsky.feed.post' });
```

### Music Artwork

```typescript
import { findArtwork } from '@ewanc26/atproto';

const url = await findArtwork(trackName, artistName, releaseName, releaseMbId);
// Cascading fallback: MusicBrainz → iTunes → Deezer → Last.fm → null
```

## Caching

All fetch functions use a shared `ATProtoCache` instance. TTLs are configured via the exported `CACHE_TTL` object:

| Key | Default TTL |
|-----|-------------|
| `PROFILE` | 1 hour |
| `SITE_INFO` | 2 hours |
| `MUSIC_STATUS` | 10 minutes |
| `KIBUN_STATUS` | 15 minutes |
| `BLOG_POSTS` | 30 minutes |
| `IDENTITY` | 24 hours |

You can import `cache` directly to clear or inspect entries:

```typescript
import { cache } from '@ewanc26/atproto';

cache.clear();
cache.delete('profile:did:plc:…');
```

## Types

All interfaces are exported from the package root:

```typescript
import type {
  ProfileData, BlueskyPost, BlogPost, PostAuthor,
  MusicStatusData, KibunStatusData, TangledRepo,
  StandardSiteDocument, StandardSitePublication,
  SiteInfoData, LinkData, ResolvedIdentity
} from '@ewanc26/atproto';
```

## Tech Stack

TypeScript 5.9+. Peer dependency on `@atproto/api`. Compiled to ESM with `tsc`.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
