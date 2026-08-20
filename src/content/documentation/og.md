---
title: "@ewanc26/og"
description: Dynamic OpenGraph image generator with noise backgrounds, bold typography, and Satori-based rendering.
date: 2026-08-20
tags: [typescript, svelte, image-generation, library, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mtjafamvux27"
---

[@ewanc26/og](https://github.com/ewanc26/pkgs/tree/main/packages/og) generates OpenGraph images on the fly — bold typography, ALL CAPS site names, and a unique [@ewanc26/noise](/projects/noise) background seeded per page. Built on [Satori](https://github.com/vercel/satori) for the actual rendering, so it works in SvelteKit endpoints, edge runtimes, and plain build scripts alike, with zero native dependencies.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Install

```bash
pnpm add @ewanc26/og
```

## SvelteKit endpoint

```ts
// src/routes/og/[...path]/+server.ts
import { createOgEndpoint } from '@ewanc26/og';

export const GET = createOgEndpoint({
  siteName: 'ewancroft.uk',
  defaultTemplate: 'blog',
  cacheMaxAge: 86400, // 24 hours
});
```

Then reference it from a page:

```svelte
<script>
  import { createOgImageUrl } from '@ewanc26/og';
</script>

<svelte:head>
  <meta property="og:image" content={createOgImageUrl('/og', {
    title: data.post.title,
    description: data.post.excerpt,
  })} />
</svelte:head>
```

## Direct generation

Outside SvelteKit — a build script, a different framework, a one-off image — call the generator directly:

```ts
import { generateOgImage } from '@ewanc26/og';
import { writeFileSync } from 'fs';

const png = await generateOgImage({
  title: 'My Blog Post',
  description: 'A compelling description',
  siteName: 'ewancroft.uk',
  template: 'blog', // 'blog' | 'profile' | 'default'
});

writeFileSync('./og-image.png', png);
```

## Templates

| Template | Description |
| -------- | ----------- |
| `blog` (default) | Massive title (72px), ALL CAPS site name, noise background, accent bar. Built for blog posts and articles. |
| `profile` | Centered layout with a prominent avatar. Works well for user pages and about pages. |
| `default` | Bold but minimal — a good fallback for generic pages. |

## Customisation

**Colours** — override the background, text, and accent used by a template:

```ts
await generateOgImage({
  title: 'My Page',
  siteName: 'mysite.com',
  colors: {
    background: '#1a1a2e',
    text: '#ffffff',
    accent: '#00d4ff',
  },
});
```

**Fonts** — the package bundles Inter; swap in your own:

```ts
await generateOgImage({
  title: 'My Page',
  siteName: 'mysite.com',
  fonts: {
    heading: './static/fonts/CustomFont-Bold.ttf',
    body: './static/fonts/CustomFont-Regular.ttf',
  },
});
```

**Noise** — disable it, or tune opacity and colour mode; the seed defaults to the title, so the same title always produces the same background:

```ts
await generateOgImage({
  title: 'My Page',
  siteName: 'mysite.com',
  noise: {
    enabled: true,
    opacity: 0.3,
    colorMode: 'grayscale',
  },
  noiseSeed: 'custom-seed', // optional, defaults to title
});
```

## API

| Function | Returns |
| -------- | ------- |
| `generateOgImage(options)` | `Promise<Buffer>` — PNG buffer |
| `generateOgImageDataUrl(options)` | `Promise<string>` — base64 data URL |
| `createOgEndpoint(options)` | `RequestHandler` — SvelteKit GET handler |
| `createOgImageUrl(baseUrl, params)` | `string` — OG image URL with query parameters |

## Related projects

- [`@ewanc26/noise`](/projects/noise) — the deterministic noise engine behind the backgrounds
- [`@ewanc26/ui`](/projects/ui) — Svelte UI component library
- [`@ewanc26/utils`](/projects/utils) — shared utility functions

## Licence

AGPL-3.0-only.
