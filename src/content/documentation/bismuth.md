---
title: '@ewanc26/bismuth'
description: Convert richtext-block documents from the Standard.site ecosystem (Leaflet, Pckt, Offprint) to Markdown — available as both a CLI tool and a TypeScript library.
date: 2026-03-24
tags: [typescript, atproto, cli, library, pkgs]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mhrd6j4ag22f'
---

[@ewanc26/bismuth](https://github.com/ewanc26/pkgs/tree/main/packages/bismuth) converts richtext-block documents from the [Standard.site](https://standard.site) platform ecosystem to Markdown. It supports all three publishing platforms — [Leaflet](https://github.com/hyperlink-academy/leaflet) (`pub.leaflet.*`), Pckt (`blog.pckt.*`), and Offprint (`app.offprint.*`) — and ships as both a CLI tool and a TypeScript library.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Why Bismuth?

[Standard.site](https://standard.site) stores longform content as `site.standard.document` ATProto records, with the actual body represented as a block tree from one of the platform's three editors. Each editor uses its own lexicon namespace (`pub.leaflet.*`, `blog.pckt.*`, `app.offprint.*`), but they share the same core shape: typed blocks (paragraphs, headings, code, lists, embeds) with byte-slice facet annotations for inline formatting. This is a great format for a federated document store, but it's opaque to anything outside the Standard.site ecosystem.

The gap bismuth fills: if you want to take a document from any Standard.site platform and use it somewhere else — feed it into a static site generator, archive it, diff it, or just read it in a terminal — you need something that understands the block tree and can produce plain text. Markdown is the obvious target because it preserves the document's semantic structure (headings, lists, code blocks, emphasis) without requiring a custom renderer.

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
      --did DID         Source DID for Pckt blob resolution.
  -o, --output FILE     Write output to FILE instead of stdout.
  -h, --help            Show help and exit.
      --version         Print version and exit.
```

The input JSON can be any of:

- `site.standard.document`
- `pub.leaflet.content`
- `blog.pckt.content`
- `app.offprint.content`

```sh
# Convert a Standard.site document, with front matter
bismuth --frontmatter doc.json

# Pipe from another command
cat doc.json | bismuth --frontmatter > post.md

# Pckt content with blob resolution
bismuth --did did:plc:abc123 pckt-post.json

# Multi-page Leaflet document — custom page separator
bismuth --page-break $'\n<!-- page -->\n' doc.json
```

## Library

```typescript
import {
	documentToMarkdown,
	contentToMarkdown,
	pcktContentToMarkdown,
	offprintContentToMarkdown
} from '@ewanc26/bismuth';

// site.standard.document (with optional YAML front matter)
const markdown = documentToMarkdown(doc, { frontmatter: true });

// pub.leaflet.content block tree
const markdown = contentToMarkdown(content);

// blog.pckt.content (inline mode)
const markdown = await pcktContentToMarkdown(content);

// blog.pckt.content (blob mode — requires DID)
const markdown = await pcktContentToMarkdown(content, 'did:plc:abc123');

// app.offprint.content
const markdown = offprintContentToMarkdown(content);
```

### `documentToMarkdown(doc, opts?)`

Converts a `site.standard.document` to Markdown. When `opts.frontmatter` is `true`, a YAML front matter block is prepended containing `title`, `publishedAt`, `description`, `tags`, and `path`.

### `contentToMarkdown(content, opts?)`

Converts a `pub.leaflet.content` to Markdown. Multi-page documents are joined with `opts.pageBreak` (default `\n\n---\n\n`). Canvas pages emit an HTML comment since their spatial layout cannot be represented linearly.

### `pcktContentToMarkdown(content, sourceDid?, opts?)`

Async. Converts a `blog.pckt.content` to Markdown. Pckt content can be either inline (`items` array) or extended (a blob reference); extended mode requires `sourceDid` for blob resolution and will throw if it is absent. An optional `opts.blobResolver` can override the default PDS resolver.

### `offprintContentToMarkdown(content, opts?)`

Converts an `app.offprint.content` to Markdown.

### `blockToMarkdown(block)`

Converts a single `AnyBlock` — from any of the three platforms — to a `{ markdown, footnotes }` result.

### `applyFacets(plaintext, facets?)`

Applies richtext facet byte-slice annotations to a plaintext string, returning annotated Markdown. Supports facets from all three platform namespaces (`pub.leaflet.richtext.facet`, `blog.pckt.richtext.facet`, `app.offprint.richtext.facet`).

### `resolvePcktContent(content, sourceDid, resolver?)`

Async. Resolves a `blog.pckt.content` to a flat block array, handling both inline and blob modes. Exported for cases where you want the blocks without immediately converting them.

### `createPdsBlobResolver(pdsEndpoint?)`

Returns a `BlobResolver` that fetches blobs from a PDS via `com.atproto.sync.getBlob`. Defaults to `https://bsky.network`.

## Options

| Option         | Type           | Default         | Description                                       |
| -------------- | -------------- | --------------- | ------------------------------------------------- |
| `frontmatter`  | `boolean`      | `false`         | Prepend YAML front matter (Leaflet/document only) |
| `pageBreak`    | `string`       | `"\n\n---\n\n"` | Separator inserted between Leaflet pages          |
| `blobResolver` | `BlobResolver` | PDS resolver    | Custom blob resolver for Pckt extended mode       |

## Block support

All block types from all three platforms are supported via a unified dispatcher.

### Leaflet (`pub.leaflet.*`)

| Block                    | Markdown output                           |
| ------------------------ | ----------------------------------------- |
| `text`                   | Paragraph with facet annotations          |
| `header`                 | `#`–`######` heading                      |
| `blockquote`             | `> ...`                                   |
| `code`                   | Fenced code block                         |
| `horizontalRule`         | `---`                                     |
| `image`                  | `![alt]()` (blob refs have no public URL) |
| `math`                   | `$$` block                                |
| `button`                 | `[text](url)` or plain text               |
| `bskyPost`               | Linked blockquote                         |
| `iframe`                 | Raw `<iframe>` HTML                       |
| `website`                | `[title](url)` with optional description  |
| `orderedList`            | Numbered list (with nesting)              |
| `unorderedList`          | Bullet list (with nesting)                |
| `canvas`, `poll`, `page` | HTML comment                              |

### Pckt (`blog.pckt.*`)

| Block            | Markdown output                  |
| ---------------- | -------------------------------- |
| `text`           | Paragraph with facet annotations |
| `heading`        | `#`–`######` heading             |
| `blockquote`     | `> ...` (content array)          |
| `horizontalRule` | `---`                            |
| `image`          | `![alt](src)` via `attrs.src`    |
| `bulletList`     | Bullet list (with nesting)       |
| `orderedList`    | Numbered list (with nesting)     |

### Offprint (`app.offprint.*`)

| Block            | Markdown output                           |
| ---------------- | ----------------------------------------- |
| `text`           | Paragraph with facet annotations          |
| `heading`        | `#`–`######` heading                      |
| `blockquote`     | `> ...` (content array)                   |
| `codeBlock`      | Fenced code block                         |
| `horizontalRule` | `---`                                     |
| `image`          | `![alt]()` (blob ref, no public URL)      |
| `bulletList`     | Bullet list (with nesting)                |
| `orderedList`    | Numbered list (with nesting)              |
| `taskList`       | `- [x]`/`- [ ]` task list (with nesting)  |
| `webEmbed`       | `[title](href)` with optional description |
| `blueskyPost`    | Linked blockquote via `at://` URI         |

## Facet support

Facets from all three platform namespaces are normalised to a shared internal representation before being applied. The `byteStart`/`byteEnd` byte offsets are handled correctly for multi-byte UTF-8 characters.

| Facet                    | Markdown                                                      |
| ------------------------ | ------------------------------------------------------------- |
| `bold`                   | `**text**`                                                    |
| `italic`                 | `*text*`                                                      |
| `code`                   | `` `text` ``                                                  |
| `link`                   | `[text](uri)`                                                 |
| `strikethrough`          | `~~text~~`                                                    |
| `underline`              | `<u>text</u>`                                                 |
| `highlight`              | `==text==`; Offprint colour variant uses `<mark style="...">` |
| `footnote`               | `text[^n]` + definition block (Leaflet only)                  |
| `mention` / `didMention` | Appends `(@handle)` link if handle is available               |
| `webMention`             | `[text](uri "title")` (Offprint only)                         |
| `atMention`, `id`        | Pass-through (no Markdown equivalent)                         |

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
