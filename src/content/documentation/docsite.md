---
title: docsite
description: Source code for docs.ewancroft.uk — a documentation site for ewan's projects, built with SvelteKit and published via Sequoia.
date: 2026-03-21
tags: [sveltekit, sequoia, atproto, docs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mhlmclujoi2h"
---

[docsite](https://github.com/ewanc26/docsite) is the source code for [docs.ewancroft.uk](https://docs.ewancroft.uk) — the central documentation hub for ewan's projects. It's a static SvelteKit site with a terminal-inspired aesthetic, driven by local Markdown files and published to the AT Protocol via [Sequoia](https://sequoia.pub).

## How It Works

Documentation is written as Markdown files in `src/content/documentation/`. Each file's frontmatter (`title`, `description`, `date`, `tags`, `draft`) is parsed at build time using [gray-matter](https://github.com/jonschlinkert/gray-matter). The site lists all non-draft posts sorted by date and renders them via a Unified/remark/rehype pipeline with GFM support and heading `id` attributes for anchor links.

Posts are also published as `site.standard.document` records on the AT Protocol PDS via Sequoia, making them part of the standard.site ecosystem. The `sequoia.json` config at the repo root wires the content directory, output directory, and publication record together.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with a brief intro and quick links |
| `/projects` | Index of all non-draft documentation posts, sorted by date |
| `/projects/[slug]` | Individual documentation page with rendered Markdown and table of contents |

## Quick Start

```bash
git clone git@github.com:ewanc26/docsite
cd docsite
pnpm install
cp .env.example .env
```

Edit `.env`:

```ini
PUBLIC_SITE_TITLE="Your Docs Title"
PUBLIC_SITE_DESCRIPTION="Your site description."
PUBLIC_SITE_URL="https://your-docs-url.com"
# Optional: ActivityPub / Fediverse
# PUBLIC_AP_INSTANCE_URL=https://ap.example.com
# PUBLIC_AP_USERNAME=yourname
```

Add Markdown files to `src/content/documentation/`, then:

```bash
pnpm dev
```

## Adding Documentation

Create a `.md` file in `src/content/documentation/`:

```markdown
---
title: my-project
description: A short description shown in the project index.
date: 2026-01-01
tags: [example]
draft: false
---

Content here.
```

- `draft: true` hides the post from the index and all routes
- `date` is used for sorting — ISO `YYYY-MM-DD` format
- The filename (without extension) becomes the URL slug at `/projects/[slug]`

## Sequoia Publishing

`sequoia.json` at the repo root configures the Sequoia CLI:

```json
{
  "siteUrl": "https://docs.ewancroft.uk",
  "contentDir": "./src/content/documentation",
  "publicDir": "./static",
  "outputDir": "./dist",
  "pathPrefix": "/projects",
  "publicationUri": "at://did:plc:.../site.standard.publication/..."
}
```

Running `sequoia publish` syncs local Markdown files to `site.standard.document` records on the PDS, making them accessible to any Standard.site-compatible reader.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_SITE_TITLE` | Yes | Site title used in `<title>` and OG/Twitter metatags |
| `PUBLIC_SITE_DESCRIPTION` | Yes | Site description used in metatags |
| `PUBLIC_SITE_URL` | Yes | Canonical URL used in OG/Twitter metatags |
| `PUBLIC_AP_INSTANCE_URL` | No | Full URL of your ActivityPub instance (e.g. `https://ap.example.com`) |
| `PUBLIC_AP_USERNAME` | No | Your username on the AP instance |

When both AP vars are set, a `fediverse:creator` metatag is injected into every page. The tag is omitted entirely if either var is absent.

## Tech Stack

SvelteKit 2.50+ with Svelte 5, Tailwind CSS 4, TypeScript 5.9+, Vite 7. Markdown rendering via Unified, remark-parse, remark-gfm, remark-rehype, rehype-slug, and rehype-stringify. Deployed on Vercel via `@sveltejs/adapter-vercel`.
