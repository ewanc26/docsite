---
title: "@ewanc26/svelte-standard-site"
description: SvelteKit library for reading and writing AT Protocol longform content via site.standard.* records — with a complete design system, federated comments, publishing tools, and content verification.
date: 2026-02-24
tags: [atproto, sveltekit, library, standard-site, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfhun3o25"
---

[@ewanc26/svelte-standard-site](https://github.com/ewanc26/pkgs/tree/main/packages/svelte-standard-site) is a SvelteKit component library for the [Standard.site](https://standard.site/) protocol — a spec for storing longform content on AT Protocol. It supports reading content from AT Protocol, publishing to it, federated Bluesky comments, content verification, and a complete design system.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Installation

```bash
pnpm add @ewanc26/svelte-standard-site zod
```

Requires `svelte >= 5` and `@sveltejs/kit >= 2` as peer dependencies.

## Features

- **Reading** — Fetch `site.standard.document` and `site.standard.publication` records from AT Protocol
- **Writing** — Publish and manage documents via `StandardSitePublisher`
- **Comments** — Federated Bluesky replies as comments via the `<Comments />` component
- **Verification** — `.well-known` endpoint helpers to prove content ownership
- **Design system** — Semantic colour tokens (ink, canvas, primary, secondary, accent) with automatic light/dark mode via Tailwind CSS 4
- **Type-safe** — Full TypeScript with Zod validation
- **SSR-ready** — Works with SvelteKit's `fetch` for prerendering
- **Caching** — In-memory cache with configurable TTL

## Quick Start

### Reading

```typescript
// src/routes/+page.server.ts
import { createClient } from '@ewanc26/svelte-standard-site';

export const load = async ({ fetch }) => {
  const client = createClient({ did: 'did:plc:your-did' });
  const documents = await client.fetchAllDocuments(fetch);
  return { documents };
};
```

### Publishing

```typescript
import { StandardSitePublisher } from '@ewanc26/svelte-standard-site/publisher';

const publisher = new StandardSitePublisher({
  identifier: 'you.bsky.social',
  password: process.env.ATPROTO_APP_PASSWORD
});
await publisher.login();
await publisher.publishDocument({ site, title, content, publishedAt });
```

### Comments

```svelte
<script>
  import { Comments } from '@ewanc26/svelte-standard-site';
</script>

<Comments
  bskyPostUri="at://did:plc:xxx/app.bsky.feed.post/abc"
  canonicalUrl="https://yourblog.com/posts/my-post"
/>
```

## Entry Points

| Import | Description |
|--------|-------------|
| `@ewanc26/svelte-standard-site` | Components, client, stores, types, utilities |
| `.../publisher` | `StandardSitePublisher` for writing records |
| `.../content` | Markdown transformation utilities |
| `.../comments` | Comment fetching utilities |
| `.../verification` | `.well-known` and ownership verification helpers |
| `.../schemas` | Zod schemas and `COLLECTIONS` constant |
| `.../config/env` | `getConfigFromEnv()` SvelteKit helper |
| `.../styles/base.css` | Base CSS |
| `.../styles/themes.css` | Theme CSS variables |

## Environment Variables

```env
PUBLIC_ATPROTO_DID=did:plc:your-did-here
PUBLIC_PUBLICATION_RKEY=3abc123xyz

# For publishing (never commit)
ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
ATPROTO_HANDLE=you.bsky.social
```

## Tech Stack

Svelte 5, SvelteKit 2, Tailwind CSS 4, `@atproto/api`, Zod, Vitest.

## Customizing Components

All components support style overrides via the `class` prop. For deeper customization, use render snippets.

### DocumentCard with Custom Layout

```svelte
<script>
  import { DocumentCard } from '@ewanc26/svelte-standard-site';
</script>

<DocumentCard {document} {publication}>
  {#snippet layout({ document, publication, href })}
    <article class="my-custom-card">
      <h2><a href={href}>{document.value.title}</a></h2>
      <p>{document.value.description}</p>
    </article>
  {/snippet layout}
</DocumentCard>
```

### Override Individual Sections

```svelte
<DocumentCard {document} {publication}>
  {#snippet title({ title, href })}
    <h2 class="text-3xl font-display">
      <a href={href}>{title}</a>
    </h2>
  {/snippet title}
</DocumentCard>
```

Available snippets: `layout`, `cover`, `title`, `description`, `metadata`, `tags`.

### Headless Mode

Use `headless` on `ThemedCard` to render only the themed wrapper without default styles:

```svelte
<ThemedCard {theme} headless class="p-4 rounded-xl bg-accent-100">
  <p>Fully custom content</p>
</ThemedCard>
```

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
