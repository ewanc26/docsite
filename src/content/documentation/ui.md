---
title: "@ewanc26/ui"
description: Svelte UI component library extracted from ewancroft.uk — pluggable layout, card, SEO, and UI primitive components alongside Svelte stores and a multi-theme config system.
date: 2026-03-06
tags: [library, svelte, ui, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgghylndnh25"
---

[@ewanc26/ui](https://github.com/ewanc26/pkgs/tree/main/packages/ui) is the Svelte component library extracted from [ewancroft.uk](https://ewancroft.uk). It provides layout components, a rich set of card types, UI primitives, SEO tags, Svelte stores, badge helpers, and a central multi-theme configuration — all built for SvelteKit 2 + Svelte 5 + Tailwind CSS 4.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Installation

```bash
pnpm add @ewanc26/ui
```

Requires `svelte >= 5`, `@sveltejs/kit >= 2`, and `tailwindcss >= 4` as peer dependencies. `@ewanc26/atproto` is an optional peer dependency needed for the AT Protocol card components.

## Components

### Layout Toggles

```svelte
<script>
  import { ThemeToggle, WolfToggle } from '@ewanc26/ui';
</script>

<ThemeToggle />   <!-- colour theme picker dropdown -->
<WolfToggle />    <!-- toggles wolf mode -->
```

### Layout: Main

```svelte
<script>
  import { DynamicLinks, ScrollToTop } from '@ewanc26/ui';
</script>

<DynamicLinks />   <!-- renders nav links from a NavItem[] prop -->
<ScrollToTop />    <!-- floating back-to-top button -->
```

### Cards

The AT Protocol card components accept typed props from `@ewanc26/atproto`:

```svelte
<script>
  import {
    ProfileCard, PostCard, BlueskyPostCard,
    LinkCard, MusicStatusCard, KibunStatusCard,
    TangledRepoCard
  } from '@ewanc26/ui';
</script>

<ProfileCard {profile} />
<BlueskyPostCard {post} />
<MusicStatusCard {status} />
<KibunStatusCard {status} />
<TangledRepoCard {repo} />
```

#### FeedCard

`FeedCard` is a generic, protocol-agnostic feed list card. Pass any array of `FeedItem` objects and it renders a titled list with avatar/icon slots, optional descriptions, relative timestamps, optional badges, and clickable rows — all using the same hover-state pattern as the rest of the card family.

```svelte
<script>
  import { FeedCard } from '@ewanc26/ui';
  import type { FeedItem } from '@ewanc26/ui';

  const items: FeedItem[] = [
    {
      id: '1',
      title: 'New release: v2.0.0',
      description: 'Major update with breaking changes and new APIs.',
      href: 'https://github.com/example/repo/releases/tag/v2.0.0',
      iconFallback: '🚀',
      timestamp: '2026-03-15T10:00:00Z',
      badge: 'release'
    },
    {
      id: '2',
      title: 'RFC: new config format',
      description: 'Proposal to simplify the configuration surface.',
      avatarUrl: 'https://example.com/avatar.jpg',
      timestamp: '2026-03-14T08:30:00Z'
    }
  ];
</script>

<!-- Pass null to show the loading skeleton -->
<FeedCard items={null} />

<!-- Populated -->
<FeedCard {items} title="Latest Activity" />

<!-- Empty state -->
<FeedCard items={[]} emptyMessage="No activity yet." />
```

The `FeedItem` interface:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | No | Unique key for Svelte's keyed `{#each}`. Falls back to `title + index`. |
| `title` | `string` | **Yes** | Primary row label. |
| `description` | `string` | No | Secondary copy, clamped to two lines. |
| `href` | `string` | No | When present, the row renders as an `<a>`. |
| `avatarUrl` | `string` | No | Image URL shown in the leading avatar slot. |
| `iconFallback` | `string` | No | Emoji or initials shown when `avatarUrl` is absent. |
| `timestamp` | `string` | No | ISO-8601 string rendered as a relative time label. |
| `badge` | `string` | No | Short label shown as a trailing badge. |

Props on `FeedCard`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `FeedItem[] \| null` | `null` | `null` triggers the loading skeleton. |
| `title` | `string` | `'Feed'` | Section heading inside the card. |
| `emptyMessage` | `string` | `'Nothing here yet.'` | Copy shown when `items` is an empty array. |

### UI Primitives

```svelte
<script>
  import {
    Card, InternalCard, Dropdown, Pagination,
    SearchBar, Tabs, PostsGroupedView,
    DocumentCard, BlogPostCard
  } from '@ewanc26/ui';
</script>
```

- **`Card`** — base card wrapper
- **`InternalCard`** — card variant for internal links and interactive rows
- **`DocumentCard`** — Standard.site document preview
- **`BlogPostCard`** — blog post listing item with badges
- **`Dropdown`** — accessible dropdown menu
- **`Pagination`** — numbered page navigation
- **`SearchBar`** — text search input
- **`Tabs`** — tab bar with active state
- **`PostsGroupedView`** — posts grouped by year/month with tag filtering

### SEO

```svelte
<script>
  import { MetaTags } from '@ewanc26/ui';
  import type { SiteMetadata } from '@ewanc26/ui';

  const meta: SiteMetadata = {
    title: 'My Site',
    description: 'A personal site',
    keywords: 'svelte, atproto',
    url: 'https://mysite.com',
    image: 'https://mysite.com/og.png'
  };
</script>

<MetaTags {meta} />
```

## Stores

```typescript
import { wolfMode, colorTheme, colorThemeDropdownOpen, happyMacStore } from '@ewanc26/ui';
import type { ColorTheme } from '@ewanc26/ui';

// Toggle wolf mode
wolfMode.set(true);

// Change colour theme
colorTheme.set('ocean');
```

| Store | Type | Description |
|-------|------|-------------|
| `wolfMode` | `Writable<boolean>` | Activates wolf mode text transformation |
| `colorTheme` | `Writable<ColorTheme>` | Active colour theme value |
| `colorThemeDropdownOpen` | `Writable<boolean>` | Controls theme picker dropdown visibility |
| `happyMacStore` | `Writable<boolean>` | Happy Mac easter egg state |

## Theme Configuration

12 named themes across four categories, using OKLCH colour values:

```typescript
import { THEMES, DEFAULT_THEME, getTheme, getThemesByCategory } from '@ewanc26/ui';

THEMES;           // readonly ThemeDefinition[]
DEFAULT_THEME;    // 'slate'

getTheme('ocean');
// { value: 'ocean', label: 'Ocean', description: 'Deep blue', color: 'oklch(…)', category: 'cool' }

getThemesByCategory();
// { neutral: […], warm: […], cool: […], vibrant: […] }
```

Categories: `neutral` (Sage, Monochrome, Slate), `warm` (Ruby, Coral, Sunset, Amber), `cool` (Forest, Teal, Ocean), `vibrant` (Lavender, Rose).

## Helpers

### Post Badges

```typescript
import { getPostBadges, getBadgeClasses } from '@ewanc26/ui';
import type { PostBadge } from '@ewanc26/ui';

const badges = getPostBadges(blogPost);
// [{ text: 'Standard.site', color: 'jade', variant: 'solid' }, …]

const classes = getBadgeClasses(badges[0]);
// Tailwind class string
```

### Post Utilities

```typescript
import { filterPosts, groupPostsByDate, getSortedMonths, getSortedYears, getAllTags } from '@ewanc26/ui';

const filtered = filterPosts(posts, 'svelte', ['typescript']);
const grouped  = groupPostsByDate(filtered);
const months   = getSortedMonths(grouped);
const tags     = getAllTags(posts);
```

## Types

```typescript
import type { SiteMetadata, NavItem, ColorTheme, ThemeDefinition, FeedItem } from '@ewanc26/ui';
```

## Tech Stack

Svelte 5, SvelteKit 2, Tailwind CSS 4, TypeScript 5.9+, `@lucide/svelte`. Built with `svelte-package`.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
