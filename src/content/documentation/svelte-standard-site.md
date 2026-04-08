---
title: "@ewanc26/svelte-standard-site"
description: SvelteKit library for reading and writing AT Protocol longform content via site.standard.* and pub.leaflet.* records — with a complete design system, federated comments, publishing tools, and content verification.
date: 2026-02-24
tags: [atproto, sveltekit, library, standard-site, leaflet, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfhun3o25"
---

[@ewanc26/svelte-standard-site](https://github.com/ewanc26/pkgs/tree/main/packages/svelte-standard-site) is a SvelteKit component library for the [Standard.site](https://standard.site/) protocol and [Leaflet](https://leaflet.pub) — specs for storing longform content on AT Protocol. It supports reading content from AT Protocol, publishing to it, federated Bluesky comments, native Leaflet comments, recommendations, subscriptions, content verification, and a complete design system.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Installation

```bash
pnpm add @ewanc26/svelte-standard-site zod
```

Requires `svelte >= 5` and `@sveltejs/kit >= 2` as peer dependencies.

## Features

- **Reading** — Fetch `site.standard.document`, `site.standard.publication`, and `pub.leaflet.*` records from AT Protocol
- **Writing** — Publish and manage documents via `StandardSitePublisher`
- **Document Rendering** — Full support for all block types including ordered lists, footnotes, and rich text facets
- **Extended Themes** — RGBA colors, background images, custom fonts, and comprehensive theme support
- **Comments** — Federated Bluesky replies via `<Comments />` and native Leaflet comments via `<CommentsSection />`
- **Recommendations** — Like/recommend documents with the `<RecommendButton />` component
- **Subscriptions** — Subscribe to publications via `site.standard.graph.subscription`
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

### Comments (Bluesky Replies)

```svelte
<script>
  import { Comments } from '@ewanc26/svelte-standard-site';
</script>

<Comments
  bskyPostUri="at://did:plc:xxx/app.bsky.feed.post/abc"
  canonicalUrl="https://yourblog.com/posts/my-post"
/>
```

### Native Leaflet Comments

```svelte
<script>
  import { CommentsSection } from '@ewanc26/svelte-standard-site';
  import { fetchNativeComments } from '@ewanc26/svelte-standard-site/comments';
</script>

{#if data.comments}
  <CommentsSection subject={document.uri} comments={data.comments} />
{/if}
```

### Recommendations

```svelte
<script>
  import { RecommendButton } from '@ewanc26/svelte-standard-site';
</script>

<RecommendButton
  documentUri={document.uri}
  count={document.recommendCount}
  recommended={userHasRecommended}
  onRecommend={() => publisher.recommendDocument(document.uri)}
  onUnrecommend={() => publisher.unrecommendDocument(rkey)}
/>
```

## Document Rendering

The library provides comprehensive rendering for all Leaflet block types:

### Block Components

| Component | Description |
|-----------|-------------|
| `<DocumentRenderer>` | Master component for rendering full documents |
| `<LinearDocumentRenderer>` | Linear document layout |
| `<CanvasRenderer>` | Canvas-based documents |
| `<BlockRenderer>` | Individual block rendering |
| `<RichText>` | Facet-aware rich text with links, mentions, highlights |
| `<TextBlock>` | Plain text blocks |
| `<HeaderBlock>` | Headers (h1-h6) |
| `<OrderedListBlock>` | Ordered lists with checklist support |
| `<UnorderedListBlock>` | Bullet lists with nesting |
| `<CodeBlock>` | Syntax-highlighted code |
| `<MathBlock>` | KaTeX math rendering |
| `<ImageBlock>` | Images with aspect ratio |
| `<BlockquoteBlock>` | Quotations |
| `<BskyPostBlock>` | Embedded Bluesky posts |
| `<PollBlock>` | Interactive polls |
| `<ButtonBlock>` | Call-to-action buttons |

### Rich Text Facets

Full support for all facet types:

- Links (`pub.leaflet.richtext.facet#link`)
- DID Mentions (`pub.leaflet.richtext.facet#didMention`)
- @ Mentions (`pub.leaflet.richtext.facet#atMention`)
- Code spans (`pub.leaflet.richtext.facet#code`)
- Highlights (`pub.leaflet.richtext.facet#highlight`)
- Underline (`pub.leaflet.richtext.facet#underline`)
- Strikethrough (`pub.leaflet.richtext.facet#strikethrough`)
- Bold (`pub.leaflet.richtext.facet#bold`)
- Italic (`pub.leaflet.richtext.facet#italic`)
- Anchor IDs (`pub.leaflet.richtext.facet#id`)
- Footnotes (`pub.leaflet.richtext.facet#footnote`)

### Footnotes

```svelte
<script>
  import { DocumentRenderer, Footnotes } from '@ewanc26/svelte-standard-site';
</script>

<DocumentRenderer {document} />
<!-- Footnotes are collected and rendered automatically -->
```

## Extended Theme Support

The library supports the full `pub.leaflet.publication#theme` specification:

```typescript
import { ThemeProvider, extendedThemeToCssVars } from '@ewanc26/svelte-standard-site';

const theme = {
  backgroundColor: { r: 255, g: 255, b: 255 }, // or RGBA
  accentColor: { r: 99, g: 102, b: 241 },
  fontFamily: 'Inter',
  headingFontFamily: 'Playfair Display',
  backgroundImage: {
    url: 'https://example.com/bg.jpg',
    opacity: 0.3
  }
};
```

### Theme Utilities

```typescript
import {
  colorToCSS,
  rgbaToCSS,
  isRGBA,
  extendedThemeToCssVars,
  getGoogleFontsUrl
} from '@ewanc26/svelte-standard-site';

// Convert colors
colorToCSS({ r: 255, g: 0, b: 0 }); // 'rgb(255 0 0)'
rgbaToCSS({ r: 255, g: 0, b: 0, a: 0.5 }); // 'rgba(255, 0, 0, 0.5)'

// Generate CSS variables
const vars = extendedThemeToCssVars(theme);

// Get Google Fonts URL for custom fonts
const fontUrl = getGoogleFontsUrl(['Inter:wght@400;700', 'Playfair Display:wght@700']);
```

## UI Components

| Component | Description |
|-----------|-------------|
| `<Avatar>` | User avatar with initials fallback |
| `<Toast>` | Toast notifications (success/error/info/warning) |
| `<Watermark>` | Publication watermark |
| `<ActionBar>` | Floating action bar for documents |
| `<RecommendButton>` | Like/recommend button with count |
| `<ThemeProvider>` | Apply theme with font loading |

## Entry Points

| Import | Description |
|--------|-------------|
| `@ewanc26/svelte-standard-site` | Components, client, stores, types, utilities |
| `.../publisher` | `StandardSitePublisher` for writing records |
| `.../content` | Markdown transformation utilities |
| `.../comments` | Bluesky comment fetching utilities |
| `.../verification` | `.well-known` and ownership verification helpers |
| `.../schemas` | Zod schemas and `COLLECTIONS` constant |
| `.../config/env` | `getConfigFromEnv()` SvelteKit helper |
| `.../styles/base.css` | Base CSS |
| `.../styles/themes.css` | Theme CSS variables |

## Publisher API

The `StandardSitePublisher` class provides methods for all record types:

### Document Operations

```typescript
// Publish/update document
await publisher.publishDocument({ site, title, content, publishedAt });
await publisher.updateDocument(rkey, { ... });
await publisher.deleteDocument(rkey);

// Manage blob assets
await publisher.uploadBlob(file, mimeType);
await publisher.deleteBlob(cid);
```

### Comment Operations

```typescript
// Publish comment on a document
await publisher.publishComment({
  subject: 'at://did:plc:xxx/pub.leaflet.document/abc',
  plaintext: 'Great article!',
  facets: [...], // optional
  parent: 'at://...', // for replies
  attachment: { // for quotes
    document: 'at://...',
    quote: { start: {...}, end: {...} }
  }
});

await publisher.deleteComment(rkey);
```

### Interactions

```typescript
// Recommend a document
await publisher.recommendDocument(subjectUri);
await publisher.unrecommendDocument(rkey);
await publisher.hasRecommended(subjectUri);
```

### Subscriptions

```typescript
// Subscribe to a publication
await publisher.subscribeToPublication(publicationUri);
await publisher.unsubscribeFromPublication(rkey);
await publisher.listSubscriptions();
await publisher.isSubscribed(publicationUri);
```

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
