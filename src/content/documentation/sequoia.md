---
title: sequoia
description: CLI tool for publishing Markdown content to the AT Protocol as site.standard.document records. Used by the devlog and docsite.
date: 2026-05-09
tags: [sequoia, atproto, tooling]
draft: false
---

[Sequoia](https://sequoia.pub) is a CLI tool for publishing [Standard.site](https://standard.site) documents to the [AT Protocol](https://atproto.com). It takes Markdown files from a content directory and creates or updates `site.standard.document` records on your PDS.

Source: [tangled.org/stevedylan.dev/sequoia](https://tangled.org/stevedylan.dev/sequoia) (mirror: [GitHub](https://github.com/stevedylandev/sequoia))

## Installation

```bash
pnpm install -g sequoia-cli
# or use via npx
npx sequoia-cli publish
```

## Setup

### 1. Authenticate

```bash
# OAuth (recommended)
sequoia login

# App password (alternative, useful for CI)
sequoia auth
```

OAuth scopes permissions and refreshes tokens automatically. App passwords are better for CI/CD — set `ATP_IDENTIFIER` and `ATP_APP_PASSWORD` as environment variables.

### 2. Initialise

```bash
sequoia init
```

This creates `sequoia.json` in the current directory with default settings. Edit it to match your site.

### 3. Configure

`sequoia.json` at the repo root:

```json
{
	"siteUrl": "https://devlog.croft.click",
	"contentDir": "./src/content/devlog",
	"publicDir": "./static",
	"outputDir": "./dist",
	"pathTemplate": "/{year}/{month}/{day}/{slug}",
	"stripDatePrefix": true,
	"publicationUri": "at://did:plc:.../site.standard.publication/..."
}
```

| Field             | Description                                      |
| ----------------- | ------------------------------------------------ |
| `siteUrl`         | Canonical URL of the site                        |
| `contentDir`      | Directory containing Markdown files              |
| `publicDir`       | Static assets directory                          |
| `outputDir`       | Build output directory                           |
| `pathTemplate`    | URL pattern for documents (see below)            |
| `stripDatePrefix` | Remove `YYYY-MM-DD-` from slug in URLs           |
| `publicationUri`  | AT URI of the `site.standard.publication` record |

### pathTemplate

Available tokens: `{slug}`, `{year}`, `{yearUTC}`, `{month}`, `{monthUTC}`, `{day}`, `{dayUTC}`, `{title}`, `{field}` (any frontmatter field).

When `pathTemplate` is set, it overrides `pathPrefix`. Use `stripDatePrefix: true` to strip the date from the slug itself (e.g. `2026-05-08-devlog-launch` → `devlog-launch`), giving clean URLs like `/2026/05/08/devlog-launch` instead of `/2026/05/08/2026-05-08-devlog-launch`.

## Publishing

```bash
# Preview what will be published
sequoia publish --dry-run

# Publish changed/new content
sequoia publish

# Force republish all (ignores change detection)
sequoia publish --force
```

What `publish` does:

1. Scans `contentDir` for Markdown files
2. Compares against existing AT Protocol records (content hashing)
3. Creates new `site.standard.document` records for new posts
4. Updates existing records when content changes
5. Saves state to `.sequoia-state.json`

### atUri handling

`atUri` is written to frontmatter **only on initial publish**. Commit that once. Subsequent content updates don't change the atUri, so no atUri commit needed on republish. When `pathTemplate` changes (e.g. URL structure), use `--force` to republish all records with new paths.

### Draft posts

Files with `draft: true` in frontmatter are skipped during publishing:

```yaml
---
title: Work in Progress
draft: true
---
```

## Frontmatter

```yaml
---
title: My Project
description: A short description
date: 2026-04-11
tags: [example, tag]
draft: false
atUri: 'at://did:plc:.../site.standard.document/...' # added by sequoia
---
```

| Field         | Required | Description                                                        |
| ------------- | -------- | ------------------------------------------------------------------ |
| `title`       | Yes      | Document title                                                     |
| `description` | Yes      | Short description (avoid unescaped colons — break YAML)            |
| `date`        | Yes      | Publication date — ISO `YYYY-MM-DD` or full `YYYY-MM-DDTHH:MM:SSZ` |
| `tags`        | No       | Array of tags                                                      |
| `draft`       | No       | Skip during publishing if `true`                                   |
| `atUri`       | No       | Added by Sequoia on first publish — commit once                    |

## Other Commands

### sync

Restore `.sequoia-state.json` from existing AT Protocol records:

```bash
sequoia sync
# Update frontmatter atUri fields too
sequoia sync --update-frontmatter
```

### inject

Inject AT URI `<link>` tags into built HTML files for document verification:

```bash
sequoia inject
sequoia inject --output ./dist
```

### update

Interactive command to modify configuration or update the AT Protocol publication record:

```bash
sequoia update
```

### add

Add UI components (e.g. `sequoia-comments` for Bluesky reply integration):

```bash
sequoia add sequoia-comments
```

## Bluesky Posting

Sequoia can automatically post to Bluesky when new documents are published. Enable in config:

```json
{
	"bluesky": {
		"enabled": true,
		"maxAgeDays": 30
	}
}
```

Each new document creates a Bluesky post with the title, description, and canonical URL. If a cover image exists, it's embedded. Combined content is limited to 300 characters. `maxAgeDays` prevents flooding your feed when first setting up — only posts within that window are shared to Bluesky.

## CI/CD Integration

Set environment variables for automation:

| Variable           | Description                              |
| ------------------ | ---------------------------------------- |
| `ATP_IDENTIFIER`   | Your AT Protocol handle or DID           |
| `ATP_APP_PASSWORD` | Your AT Protocol app password            |
| `PDS_URL`          | Custom PDS URL (optional, auto-resolved) |
| `SEQUOIA_PROFILE`  | Stored identity profile name             |

GitHub Actions example:

```yaml
- name: Publish to ATProto
  env:
    ATP_IDENTIFIER: ${{ secrets.ATP_IDENTIFIER }}
    ATP_APP_PASSWORD: ${{ secrets.ATP_APP_PASSWORD }}
  run: sequoia publish
```

## Known Pitfalls

- **YAML frontmatter:** Avoid unescaped colons in `description` — they break parsing. Use short descriptions or quote the value.
- **Smart quotes:** macOS smart quotes can corrupt frontmatter — use heredocs or a text editor, not manual typing.
- **State file:** `.sequoia-state.json` tracks published records. If lost, use `sequoia sync` to restore from PDS.

## How ewan Uses It

Two publications, two sites:

| Site                                             | Publication rkey | Content directory            |
| ------------------------------------------------ | ---------------- | ---------------------------- |
| [devlog.croft.click](https://devlog.croft.click) | `3mlen2qhzrt2s`  | `src/content/devlog/`        |
| [docs.ewancroft.uk](https://docs.ewancroft.uk)   | `3mfyq5mpohw25`  | `src/content/documentation/` |

Workflow for each site:

1. Write or update Markdown in the content directory
2. Commit and push
3. Run `sequoia publish` from the repo root
4. If first publish, commit the new `atUri` in frontmatter

License: MIT
