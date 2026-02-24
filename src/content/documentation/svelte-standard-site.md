---
title: svelte-standard-site
description: A SvelteKit library for reading and writing AT Protocol longform content via site.standard.* records.
date: 2025-02-24
tags: [atproto, sveltekit, library, standard-site]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzibc65o25"
---

[svelte-standard-site](https://github.com/ewanc26/svelte-standard-site) is a SvelteKit component library for the [Standard.site](https://standard.site/) protocol — a spec for storing longform content on AT Protocol. It supports both reading content from AT Protocol and publishing to it, along with federated Bluesky comments, content verification, and a complete design system.

**Note:** This package is not yet published to npm.

## Features

- **Reading** — Fetch `site.standard.document` and `site.standard.publication` records from AT Protocol
- **Writing** — Publish and manage documents via `StandardSitePublisher`
- **Comments** — Federated Bluesky replies as comments via the `<Comments />` component
- **Verification** — `.well-known` endpoint helpers to prove content ownership
- **Design system** — Semantic colour tokens (ink, canvas, primary, secondary, accent) with automatic light/dark mode via Tailwind CSS 4
- **Type-safe** — Full TypeScript with Zod validation
- **SSR-ready** — Works with SvelteKit's `fetch` for prerendering
- **Caching** — In-memory cache with configurable TTL

## Installation

Until the package is on npm, install from the repository directly or reference it locally. You'll also need `zod`:

```bash
pnpm add zod
```

## Quick Start

### Reading

```typescript
// src/routes/+page.server.ts
import { createClient } from 'svelte-standard-site';

export const load = async ({ fetch }) => {
  const client = createClient({ did: 'did:plc:your-did' });
  const documents = await client.fetchAllDocuments(fetch);
  return { documents };
};
```

### Publishing

```typescript
import { StandardSitePublisher } from 'svelte-standard-site/publisher';

const publisher = new StandardSitePublisher({
  identifier: 'you.bsky.social',
  password: process.env.ATPROTO_APP_PASSWORD
});
await publisher.login();
await publisher.publishDocument({ site, title, content, publishedAt });
```

### Comments

```svelte
<Comments
  bskyPostUri="at://did:plc:xxx/app.bsky.feed.post/abc"
  canonicalUrl="https://yourblog.com/posts/my-post"
/>
```

## Environment Variables

```env
PUBLIC_ATPROTO_DID=did:plc:your-did-here
PUBLIC_PUBLICATION_RKEY=3abc123xyz

# For publishing (never commit)
ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
ATPROTO_HANDLE=you.bsky.social
```

## Documentation

- `docs/publishing.md` — Full publishing workflow
- `docs/comments.md` — Setting up federated comments
- `docs/verification.md` — Content ownership verification
- `docs/content-transformation.md` — Markdown transformation for AT Protocol
- `EXAMPLES.md` — Comprehensive usage examples

## Tech Stack

Svelte 5, SvelteKit 2, Tailwind CSS 4, `@atproto/api`, Zod, Vitest.

## Licence

AGPLv3.
