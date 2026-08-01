# ewan's docs

Central documentation hub for all of ewan's projects. Posts are written in Markdown and published to the AT Protocol automatically via [Sequoia](https://sequoia.pub).

Built with SvelteKit, Tailwind CSS (typography plugin), and unified/remark/rehype for markdown processing. Deployed on Vercel.

> 🧶 Also available on [Tangled](https://tangled.org/ewancroft.uk/docsite)

## Adding a post

Create a Markdown file in `src/content/documentation/`:

```md
---
title: My Post
description: A short description.
date: 2026-01-01
tags: [example]
draft: false
---

Content goes here.
```

Posts with `draft: true` are excluded from the build. The filename becomes the URL slug — `my-post.md` → `/projects/my-post`.

Headings (`##`, `###`) are automatically picked up for the per-post table of contents.

## Development

```sh
pnpm install
pnpm dev
```

## Deployment

Deployed to Vercel via `@sveltejs/adapter-vercel`. Every push to `main` triggers a redeploy. All routes prerender at build time — the content files are read during the Vercel build, not at runtime.

```sh
pnpm build      # production build
pnpm preview    # preview the build locally
```

## Publishing to AT Protocol

Content is published to the AT Protocol via the [Sequoia CLI](https://sequoia.pub/cli-reference#cli-reference). Make sure you have it installed, then run:

```sh
sequoia publish
```

See the [Sequoia CLI reference](https://sequoia.pub/cli-reference#cli-reference) for the full list of available commands and options.

## Other commands

```sh
pnpm check      # svelte-check type checking
pnpm format     # prettier
pnpm lint       # prettier --check
```

## Support

If you find this project useful, consider supporting its development:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ewancroft)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-30363D?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/ewanc26)
