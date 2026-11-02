---
title: "@ewanc26/svelte-standard-site"
description: SvelteKit library for reading and writing AT Protocol longform content via site.standard.* and pub.leaflet.* records — with a complete design system, federated comments, publishing tools, and content verification.
date: 2026-02-24
tags: [atproto, sveltekit, library, standard-site, leaflet, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfhun3o25"
---

[@ewanc26/svelte-standard-site](https://github.com/ewanc26/pkgs/tree/main/packages/svelte-standard-site) is a SvelteKit component library for the [Standard.site](https://standard.site/) protocol and [Leaflet](https://leaflet.pub) — specs for storing longform content on AT Protocol. It supports reading content from AT Protocol, publishing to it, federated Bluesky comments, native Leaflet comments, recommendations, subscriptions, content verification, and a complete design system.

The canonical source is the [`@ewanc26/pkgs`](/projects/pkgs) monorepo, where it is currently at v0.2.5. The standalone [`ewanc26/svelte-standard-site`](https://github.com/ewanc26/svelte-standard-site) repository is a historical copy at v0.1.0; issues and pull requests should go to the monorepo.

## Installation

```bash
pnpm add @ewanc26/svelte-standard-site
```

Requires `svelte >= 5` and `@sveltejs/kit >= 2` as peer dependencies.

## Features

- **Reading** — Fetch `site.standard.document`, `site.standard.publication`, and `pub.leaflet.*` records from AT Protocol
- **Writing** — Publish and manage documents and publications via `StandardSitePublisher`
- **Document rendering** — Render native Leaflet content with block and page components, including ordered lists, footnotes, and rich text facets
- **Markdown rendering** — Render Markdown content with `<MarkdownRenderer>`
- **Extended themes** — RGBA colours, page backgrounds, background images, custom heading and body fonts, and configurable page width
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
| `<MarkdownRenderer>` | Render Markdown content |
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
| `<HorizontalRuleBlock>` | Horizontal rules |
| `<IframeBlock>` | Embedded iframes |
| `<WebsiteBlock>` | Website link cards |
| `<BskyPostBlock>` | Embedded Bluesky posts |
| `<PollBlock>` | Interactive polls |
| `<ButtonBlock>` | Call-to-action buttons |
| `<PageBlock>` | Nested document pages |

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
  pageBackground: { r: 250, g: 250, b: 247 },
  primary: { r: 99, g: 102, b: 241 },
  accentBackground: { r: 99, g: 102, b: 241 },
  accentText: { r: 255, g: 255, b: 255 },
  headingFont: 'Playfair Display',
  bodyFont: 'Inter',
  pageWidth: 720,
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
colorToCSS({ r: 255, g: 0, b: 0 }); // 'rgb(255, 0, 0)'
rgbaToCSS({ r: 255, g: 0, b: 0, a: 50 }); // 'rgba(255, 0, 0, 0.5)'

// Generate CSS variables
const vars = extendedThemeToCssVars(theme);

// Get Google Fonts URL for custom fonts
const fontUrl = getGoogleFontsUrl({
  headingFont: 'Playfair Display',
  bodyFont: 'Inter'
});
```

## UI Components

| Component | Description |
|-----------|-------------|
| `<DocumentCard>` | Document card with cover, title, description, metadata, and tags |
| `<PublicationCard>` | Publication summary card with icon, description, and site link |
| `<StandardSiteLayout>` | Page shell wiring theme, header, and footer together |
| `<ThemeToggle>` | Light/dark mode toggle |
| `<DateDisplay>` | Formatted publication date |
| `<TagList>` | Tag pills for a document or publication |
| `<ThemedContainer>` | Themed layout container |
| `<ThemedText>` | Themed text element with opacity and accent variants |
| `<ThemedCard>` | Themed card surface, optionally headless |
| `<Comment>` | Single native Leaflet comment with replies |
| `<CommentsSection>` | Threaded native Leaflet comments |
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
| `.../comments` | Native Leaflet comment utilities (fetching, threading, parsing) |
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

// List documents (default limit: 100)
await publisher.listDocuments();
```

### Publication Operations

```typescript
await publisher.publishPublication({ ... });
await publisher.updatePublication(rkey, { ... });
await publisher.deletePublication(rkey);

// List publications (default limit: 100)
await publisher.listPublications();
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

Reading uses the variables in `.env.example`:

```env
# Required: your AT Protocol DID
PUBLIC_ATPROTO_DID=did:plc:your-did-here

# Optional: custom PDS endpoint (auto-resolved if unset)
# PUBLIC_ATPROTO_PDS=https://your-pds.example.com

# Optional: cache TTL in milliseconds (default: 300000)
# PUBLIC_CACHE_TTL=300000
```

Publishing also reads credentials from the process environment. Never commit them:

```env
ATPROTO_HANDLE=you.bsky.social
ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

## Tech Stack

Svelte 5, SvelteKit 2, Tailwind CSS 4, `@bsky/sdk`, `@atproto/lex`, Shiki 4, KaTeX, Zod, Vitest.

## Customizing Components

Most components accept a `class` prop for style overrides. For deeper customization, use render snippets.

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
