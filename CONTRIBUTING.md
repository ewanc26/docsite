# Contributing to docsite

Thank you for helping! This repo is the source of **[docs.ewancroft.uk](https://docs.ewancroft.uk)**, the central documentation hub for ewan's projects. Pages are Markdown files built into a SvelteKit site (Tailwind CSS typography, unified/remark/rehype) and deployed on Vercel; published content also goes out to the AT Protocol via [Sequoia](https://sequoia.pub).

If you're contributing to one of the code repositories ([ewanc26/pkgs](https://github.com/ewanc26/pkgs)), its root `CONTRIBUTING.md` is the guide you want. This file is for the docs site itself.

## Writing or editing a page

Pages live in `src/content/documentation/` as Markdown with frontmatter:

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

- The **filename becomes the URL slug** (`my-post.md` → `/projects/my-post`). Renaming a file breaks existing links to it, so mention renames in the PR.
- `draft: true` excludes a page from the build; flip it to `false` when the page is ready.
- Headings (`##`, `###`) are picked up automatically for the per-page table of contents, so structure pages with them rather than bolded lines.
- GFM is enabled (tables, task lists, etc. via remark-gfm).
- **Authored prose is excluded from Prettier on purpose.** Don't reflow or re-wrap existing paragraphs; `pnpm lint` is for the code and config files.

## Development setup

You'll need Node.js (22.17+ is SvelteKit 3's floor; 24.x matches the rest of ewan's monorepo) and pnpm.

```sh
git clone https://github.com/ewanc26/docsite.git
cd docsite
pnpm install
cp .env.example .env    # local site metadata (title, description) so pages render right
pnpm dev
```

Every push to `main` triggers a redeploy on Vercel, and all routes prerender at build time (content files are read during the Vercel build, not at runtime).

## Commands

| Command        | What it does                         |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Run the dev server                   |
| `pnpm build`   | Production build                     |
| `pnpm preview` | Preview the production build locally |
| `pnpm check`   | svelte-check type checking           |
| `pnpm format`  | Prettier (code/config files)         |
| `pnpm lint`    | Prettier check                       |

## Before opening a pull request

- `pnpm check` passes and `pnpm build` succeeds.
- `pnpm lint` is clean for the files you changed.
- You saw the new or edited page render correctly in the dev server (and in `pnpm preview` if you touched build behaviour).
- Commit messages follow the existing conventional style; most changes here are `docs: …`.

## Publishing to the AT Protocol

Content is published to the network with the Sequoia CLI (`sequoia publish`). That's a maintainer step after merge: PRs change the site's content and code, and the network publish happens separately. You don't need Sequoia installed to contribute.

## Licence

This project is **AGPL-3.0** (see [LICENSE](LICENSE)). By submitting a contribution you agree it's licensed under the same terms.
