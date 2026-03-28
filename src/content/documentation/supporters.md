---
title: "@ewanc26/supporters"
description: SvelteKit component library for displaying Ko-fi supporters and GitHub Sponsors, backed by an ATProto PDS.
date: 2026-03-09
tags: [atproto, sveltekit, ko-fi, github-sponsors, library, pkgs, webhook]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgni3iy5y52t"
---

[@ewanc26/supporters](https://github.com/ewanc26/pkgs/tree/main/packages/supporters) is a SvelteKit component library for displaying Ko-fi supporters and GitHub Sponsors. Webhook events from both platforms are stored as records on your ATProto PDS and aggregated into presentable supporter lists.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## How it works

### Ko-fi

1. Ko-fi POSTs a webhook event to `/webhook` on each transaction
2. The handler verifies the `verification_token`, respects `is_public`, and calls `appendEvent`
3. `appendEvent` writes a record to your PDS under `uk.ewancroft.support.kofi`
4. `readStore` fetches all records and aggregates them into `KofiSupporter` objects
5. Pass the result to `<KofiSupporters>` or `<LunarContributors>`

### GitHub Sponsors

1. GitHub POSTs a `sponsorship` webhook event to `/webhook/github` on each sponsorship change
2. The handler verifies the HMAC-SHA256 signature, respects `privacy_level`, and skips `pending_*` actions
3. `appendSponsorEvent` writes a record to your PDS under `uk.ewancroft.support.github`
4. `readSponsors` fetches all records and replays them chronologically to derive the current state (active/inactive, current tier) per sponsor
5. Pass the result to `<GitHubSponsors>`

## Install

```bash
pnpm add @ewanc26/supporters
```

Requires `svelte >= 5` and `@atproto/api >= 0.13.0` as peer dependencies.

## Setup

### Environment variables

```env
# Required — copy from ko-fi.com/manage/webhooks → Advanced → Verification Token
KOFI_VERIFICATION_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Required — your ATProto identity and a dedicated app password
ATPROTO_DID=did:plc:yourdidhex
ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx

# Required for GitHub Sponsors — set when registering the webhook on GitHub
GITHUB_WEBHOOK_SECRET=your-webhook-secret
```

Generate an app password under **Settings → App Passwords** on [witchsky](https://witchsky.app).

### Register the Ko-fi webhook

Set your webhook URL to `https://your-domain.com/webhook` in **ko-fi.com/manage/webhooks**.

### Register the GitHub Sponsors webhook

In your GitHub Sponsors settings, add a webhook pointing to `https://your-domain.com/webhook/github`. Set the content type to `application/json`, choose a secret, and subscribe to **Sponsorship** events only.

### Add the routes

Copy `src/routes/webhook/+server.ts` and `src/routes/webhook/github/+server.ts` from the package into your SvelteKit app's routes directory.

### Use the components

```ts
// +page.server.ts
import { readStore, readSponsors } from '@ewanc26/supporters';

export const load = async () => ({
  supporters: await readStore(),
  sponsors: await readSponsors()
});
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { KofiSupporters, GitHubSponsors } from '@ewanc26/supporters';
  let { data } = $props();
</script>

<KofiSupporters supporters={data.supporters} />
<GitHubSponsors sponsors={data.sponsors} />
```

## Components

### `<KofiSupporters>`

Displays all Ko-fi supporters with emoji type badges (☕ donation, ⭐ subscription, 🎨 commission, 🛍️ shop order).

| Prop | Type | Default |
|---|---|---|
| `supporters` | `KofiSupporter[]` | `[]` |
| `heading` | `string` | `'Supporters'` |
| `description` | `string` | `'People who support my work on Ko-fi.'` |
| `filter` | `KofiEventType[]` | `undefined` (show all) |
| `loading` | `boolean` | `false` |
| `error` | `string \| null` | `null` |

### `<LunarContributors>`

Convenience wrapper around `<KofiSupporters>` pre-filtered to `Subscription` events only.

### `<GitHubSponsors>`

Displays GitHub Sponsors with their tier name. Each card links to the sponsor's GitHub profile.

| Prop | Type | Default |
|---|---|---|
| `sponsors` | `GitHubSponsor[]` | `[]` |
| `heading` | `string` | `'GitHub Sponsors'` |
| `description` | `string` | `'People who sponsor my work on GitHub.'` |
| `activeOnly` | `boolean` | `true` |
| `loading` | `boolean` | `false` |
| `error` | `string \| null` | `null` |

## Server utilities

### Ko-fi

#### `readStore(): Promise<KofiSupporter[]>`

Fetches all `uk.ewancroft.support.kofi` records from the PDS (no auth required) and aggregates them by name into `KofiSupporter` objects. Reads are paginated automatically.

#### `appendEvent(name, type, tier, timestamp, opts?): Promise<void>`

Writes a single Ko-fi event as a new record. Uses `ATPROTO_APP_PASSWORD` for authentication. The rkey is a TID derived from the transaction timestamp via [`@ewanc26/tid`](/projects/tid).

#### `parseWebhook(request, opts?): Promise<KofiWebhookPayload>`

Validates and parses an incoming Ko-fi `application/x-www-form-urlencoded` webhook request. Throws `WebhookError` on invalid token, wrong content-type, or malformed JSON.

### GitHub Sponsors

#### `fetchSponsorEvents(did): Promise<GitHubSponsorEvent[]>`

Fetches all `uk.ewancroft.support.github` records from the PDS (no auth required) and returns them as a flat chronological timeline — one entry per event, sorted most-recent-first. Used by the website's unified supporters feed.

#### `readSponsors(): Promise<GitHubSponsor[]>`

Fetches all `uk.ewancroft.support.github` records from the PDS (no auth required) and replays them chronologically to produce the current state per sponsor. A sponsor is considered active if their most recent event is `created` or `tier_changed`, and inactive after `cancelled`.

#### `appendSponsorEvent(login, name, action, tierName, monthlyUsd, timestamp): Promise<void>`

Writes a single GitHub sponsorship event as a new PDS record. Uses `ATPROTO_APP_PASSWORD` for authentication.

#### `parseGitHubSponsorsWebhook(request, opts?): Promise<GitHubSponsorshipWebhookPayload>`

Validates an incoming GitHub `sponsorship` webhook request by verifying its HMAC-SHA256 signature against `GITHUB_WEBHOOK_SECRET` using the Web Crypto API. Throws `GitHubWebhookError` on signature mismatch, wrong event type, or malformed JSON.

## Types

```ts
// Ko-fi
type KofiEventType = 'Donation' | 'Subscription' | 'Commission' | 'Shop Order';

interface KofiSupporter {
  name: string;
  types: KofiEventType[];   // deduplicated across all events
  tiers: string[];          // deduplicated subscription tier names
}

// GitHub Sponsors
type GitHubSponsorshipAction =
  | 'created' | 'cancelled' | 'edited'
  | 'tier_changed' | 'pending_cancellation' | 'pending_tier_change';

interface GitHubSponsor {
  login: string;
  name?: string;
  tierName: string;
  monthlyUsd: number;
  isActive: boolean;
}
```

## Importing historical Ko-fi data

Export your transaction history from **ko-fi.com/manage/transactions → Export CSV**, then run the bundled import script:

```bash
ATPROTO_DID=... ATPROTO_APP_PASSWORD=... \
  node node_modules/@ewanc26/supporters/scripts/import-history.mjs transactions.csv --dry-run
```

Remove `--dry-run` to write records. The script is idempotent — re-running merges new event types and tiers into existing records.

## Lexicons

### `uk.ewancroft.support.kofi`

```ts
{
  name: string   // display name from Ko-fi
  type: string   // "Donation" | "Subscription" | "Commission" | "Shop Order"
  tier?: string  // subscription tier name, if applicable
}
```

### `uk.ewancroft.support.github`

```ts
{
  login: string        // GitHub username
  name?: string        // display name, if known
  action: string       // "created" | "cancelled" | "edited" | "tier_changed" | ...
  tierName: string     // sponsorship tier name
  monthlyUsd: number   // monthly amount in USD
}
```

rkeys are TIDs derived from the event timestamp, making all records lexicographically sortable by time.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
