---
title: "@ewanc26/bismuth"
description: Convert pub.leaflet RTF-block documents (site.standard.document ATProto records) to Markdown — available as both a CLI tool and a TypeScript library.
date: 2026-03-24
tags: [typescript, atproto, cli, library, pkgs]
draft: false
---

[@ewanc26/bismuth](https://github.com/ewanc26/pkgs/tree/main/packages/bismuth) converts [`pub.leaflet`](https://github.com/hyperlink-academy/leaflet) RTF-block documents — as stored in [`site.standard.document`](https://standard.site) ATProto records — to Markdown. It ships as both a CLI tool and a TypeScript library.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Why Bismuth?

[Standard.site](https://standard.site) stores longform content as `site.standard.document` ATProto records, with the actual body represented as a `pub.leaflet.content` block tree — a rich-text format composed of typed blocks (paragraphs, headings, code, lists, embeds) with byte-slice facet annotations for inline formatting. This is a great format for a federated document store, but it's opaque to anything outside the ATProto/Leaflet ecosystem.

The gap bismuth fills: if you want to take a document written on Standard.site and use it somewhere else — feed it into a static site generator, archive it, diff it, or just read it in a terminal — you need something that understands the block tree and can produce plain text. Markdown is the obvious target because it preserves the document's semantic structure (headings, lists, code blocks, emphasis) without requiring a custom renderer.

The alternative is hand-rolling the same conversion every time it's needed, which is what prompted bismuth's existence. The conversion logic for facet byte-slice annotations in particular — which must be applied in reverse order to avoid index drift — is fiddly enough to be worth extracting once into a tested library.

### Why Bismuth as a name?

Bismuth the element is known for its iridescent oxide surface — a single underlying structure that refracts into many colours depending on how you look at it. A `pub.leaflet` document is the same thing: one block tree that can be rendered as a rich web UI, a terminal reader, a static site, or plain Markdown depending on what's doing the rendering. The name also fits the monorepo's loose theme of naming packages after elements and minerals (see [`@ewanc26/malachite`](/projects/malachite)).

## Install

```bash
# Global CLI
npm install -g @ewanc26/bismuth

# Project dependency
pnpm add @ewanc26/bismuth
```

Ships as both ESM and CJS with full TypeScript type definitions.

## CLI

```
bismuth [options] [file]

Arguments:
  file                  JSON file to read. Reads stdin if omitted.

Options:
  -f, --frontmatter     Emit YAML front matter from document metadata.
  -p, --page-break STR  Separator between pages (default: "\n\n---\n\n").
  -o, --output FILE     Write output to FILE instead of stdout.
  -h, --help            Show help and exit.
      --version         Print version and exit.
```

The input JSON should be either a `site.standard.document` object or a bare `pub.leaflet.content` object.

```sh
# Convert a document file, with front matter
bismuth --frontmatter doc.json

# Pipe from another command
cat doc.json | bismuth --frontmatter > post.md

# Multi-page document — custom page separator
bismuth --page-break $'\n<!-- page -->\n' doc.json
```

## Library

```typescript
import { documentToMarkdown, contentToMarkdown } from '@ewanc26/bismuth'

// Full site.standard.document (with optional YAML front matter)
const markdown = documentToMarkdown(doc, { frontmatter: true })

// Just the pub.leaflet.content block tree
const markdown = contentToMarkdown(content)
```

### `documentToMarkdown(doc, opts?)`

Converts a `site.standard.document` to Markdown. When `opts.frontmatter` is `true`, a YAML front matter block is prepended containing `title`, `publishedAt`, `description`, `tags`, and `path`.

### `contentToMarkdown(content, opts?)`

Converts a `pub.leaflet.content` to Markdown. Multi-page documents are joined with `opts.pageBreak` (default `\n\n---\n\n`). Canvas pages emit an HTML comment since their spatial layout cannot be represented linearly.

### `blockToMarkdown(block)`

Converts a single `AnyBlock` to a `{ markdown, footnotes }` result.

### `applyFacets(plaintext, facets?)`

Applies `pub.leaflet.richtext.facet` byte-slice annotations to a plaintext string, returning annotated Markdown. Handles bold, italic, inline code, links, strikethrough, underline, highlight, and footnotes.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `frontmatter` | `boolean` | `false` | Prepend YAML front matter from document metadata |
| `pageBreak` | `string` | `"\n\n---\n\n"` | Separator inserted between pages |

## Block support

| Block type | Markdown output |
|---|---|
| `text` | Paragraph with facet annotations |
| `header` | `#`–`######` heading |
| `blockquote` | `> ...` |
| `code` | Fenced code block |
| `horizontalRule` | `---` |
| `image` | `![alt]()` (blob refs have no public URL) |
| `math` | `$$` block |
| `button` | `[text](url)` or plain text |
| `bskyPost` | Linked blockquote |
| `iframe` | Raw `<iframe>` HTML |
| `website` | `[title](url)` |
| `orderedList` | Numbered list (with nesting) |
| `unorderedList` | Bullet list (with nesting) |
| `canvas`, `poll`, `page` | HTML comment |

## Facet support

| Facet | Markdown |
|---|---|
| `bold` | `**text**` |
| `italic` | `*text*` |
| `code` | `` `text` `` |
| `link` | `[text](uri)` |
| `strikethrough` | `~~text~~` |
| `underline` | `<u>text</u>` |
| `highlight` | `==text==` |
| `footnote` | `text[^n]` + definition block |
| `didMention`, `atMention`, `id` | Pass-through (no Markdown equivalent) |

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
