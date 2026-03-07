---
title: "@ewanc26/utils"
description: Shared utility functions extracted from ewancroft.uk — date formatting, number formatting, URL helpers, validators, RSS generation, and locale detection.
date: 2026-03-06
tags: [library, utilities, typescript, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgghyljhmp25"
---

[@ewanc26/utils](https://github.com/ewanc26/pkgs/tree/main/packages/utils) is a zero-dependency TypeScript utility library extracted from [ewancroft.uk](https://ewancroft.uk). It provides helpers for date and number formatting, URL manipulation, input validation, locale detection, and RSS feed generation.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Installation

```bash
pnpm add @ewanc26/utils
```

## Modules

### Date & Locale

```typescript
import { getUserLocale, formatLocalizedDate, formatRelativeTime } from '@ewanc26/utils';

getUserLocale();
// → 'en-GB' (from navigator.language, falls back to 'en-GB' in SSR)

formatLocalizedDate('2025-11-13T23:49:36Z');
// → '13 Nov 2025'

formatRelativeTime('2025-11-13T23:49:36Z');
// → '3d ago', '2h ago', 'just now', or localised date for older entries
```

`formatRelativeTime` returns relative strings (`Xm ago`, `Xh ago`, `Xd ago`) for recent dates, falling back to a localised short date beyond 7 days.

### Number Formatting

```typescript
import { formatCompactNumber, formatNumber } from '@ewanc26/utils';

formatCompactNumber(1500);    // → '1.5K'
formatCompactNumber(1000000); // → '1M'
formatNumber(1234567);        // → '1,234,567'
```

Both functions accept an optional `locale` string; otherwise they use `navigator.language` with an `en-GB` fallback.

### URL Utilities

```typescript
import { getDomain, atUriToBlueskyUrl, getBlueskyProfileUrl, isExternalUrl } from '@ewanc26/utils';

getDomain('https://www.example.com/path');
// → 'example.com'

atUriToBlueskyUrl('at://did:plc:abc/app.bsky.feed.post/xyz');
// → 'https://witchsky.app/profile/did:plc:abc/post/xyz'

getBlueskyProfileUrl('alice.bsky.social');
// → 'https://witchsky.app/profile/alice.bsky.social'

isExternalUrl('https://example.com');
// → true (when window.location.origin differs)
```

### Validators & Text Helpers

```typescript
import {
  isValidTid,
  isValidDid,
  truncateText,
  escapeHtml,
  getInitials,
  debounce,
  throttle
} from '@ewanc26/utils';

isValidTid('3mfyqfgh24625');     // → true
isValidDid('did:plc:abc123');    // → true

truncateText('Hello world', 8);  // → 'Hello...'
escapeHtml('<b>hi</b>');         // → '&lt;b&gt;hi&lt;/b&gt;'
getInitials('Ewan Croft');       // → 'EC'

const debouncedFn = debounce(myFn, 300);
const throttledFn = throttle(myFn, 100);
```

### RSS Generation

```typescript
import {
  generateRSSFeed,
  generateRSSItem,
  createRSSResponse,
  type RSSChannelConfig,
  type RSSItem
} from '@ewanc26/utils';

const channel: RSSChannelConfig = {
  title: 'My Blog',
  description: 'Posts from my blog',
  link: 'https://mysite.com',
  language: 'en-GB'
};

const items: RSSItem[] = [{
  title: 'My Post',
  link: 'https://mysite.com/blog/my-post',
  description: 'Post content here',
  pubDate: new Date().toUTCString(),
  guid: 'https://mysite.com/blog/my-post'
}];

const xml = generateRSSFeed(channel, items);

// In a SvelteKit +server.ts:
return createRSSResponse(xml);
```

`createRSSResponse` returns a `Response` with `Content-Type: application/rss+xml; charset=utf-8` and a configurable `Cache-Control` header (default: 1 hour).

Lower-level helpers — `escapeXml`, `escapeXmlAttribute`, `normalizeCharacters`, `formatRSSDate`, `generateRSSItem` — are also exported if you need to build feeds manually.

## SSR Compatibility

All functions are SSR-safe. Functions that need `navigator.language` or `window` check for their availability and fall back to `en-GB` / sensible defaults on the server.

## Tech Stack

TypeScript 5.9+. No runtime dependencies. Compiled to ESM with `tsc`.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
