---
title: "@ewanc26/supporters"
description: SvelteKit component library for displaying Ko-fi supporters, backed by an ATProto PDS.
date: 2026-03-09
tags: [atproto, sveltekit, ko-fi, library, pkgs, webhook]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgni3iy5y52t"
---

[@ewanc26/supporters](https://github.com/ewanc26/pkgs/tree/main/packages/supporters) is a SvelteKit component library for displaying Ko-fi supporters. Ko-fi webhook events are stored as records on your ATProto PDS under the `uk.ewancroft.kofi.supporter` lexicon, and the library aggregates those records into a presentable supporter list.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## How it works

1. Ko-fi POSTs a webhook event to `/webhook` on each transaction
2. The handler verifies the `verification_token`, respects `is_public`, and calls `appendEvent`
3. `appendEvent` writes a record to your PDS under `uk.ewancroft.kofi.supporter`
4. `readStore` fetches all records and aggregates them into `KofiSupporter` objects
5. Pass the result to `<KofiSupporters>` or `<LunarContributors>`

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
ATPROTO_PDS_URL=https://your-pds.example.com
ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

Generate an app password under **Settings → App Passwords** on [witchsky](https://witchsky.app).

### Register the webhook

Set your webhook URL to `https://your-domain.com/webhook` in **ko-fi.com/manage/webhooks**.

### Add the route

Copy `src/routes/webhook/+server.ts` from the package into your SvelteKit app's routes directory.

### Use the component

```ts
// +page.server.ts
import { readStore } from '@ewanc26/supporters';

export const load = async () => ({
  supporters: await readStore()
});
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { KofiSupporters } from '@ewanc26/supporters';
  let { data } = $props();
</script>

<KofiSupporters supporters={data.supporters} />
```

## Components

### `<KofiSupporters>`

Displays all supporters with emoji type badges (☕ donation, ⭐ subscription, 🎨 commission, 🛍️ shop order).

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

## Server utilities

### `readStore(): Promise<KofiSupporter[]>`

Fetches all `uk.ewancroft.kofi.supporter` records from the PDS (no auth required) and aggregates them by name into `KofiSupporter` objects. Reads are paginated automatically.

### `appendEvent(name, type, tier, timestamp): Promise<void>`

Writes a single Ko-fi event as a new record. Uses `ATPROTO_APP_PASSWORD` for authentication. The rkey is a TID derived from the transaction timestamp via [`@ewanc26/tid`](/projects/tid).

### `parseWebhook(request): Promise<KofiWebhookPayload>`

Validates and parses an incoming Ko-fi `application/x-www-form-urlencoded` webhook request. Throws `WebhookError` on invalid token, wrong content-type, or malformed JSON.

## Types

```ts
type KofiEventType = 'Donation' | 'Subscription' | 'Commission' | 'Shop Order';

interface KofiSupporter {
  name: string;
  types: KofiEventType[];   // deduplicated across all events
  tiers: string[];          // deduplicated subscription tier names
}
```

## Importing historical data

Export your transaction history from **ko-fi.com/manage/transactions → Export CSV**, then run the bundled import script:

```bash
ATPROTO_DID=... ATPROTO_PDS_URL=... ATPROTO_APP_PASSWORD=... \
  node node_modules/@ewanc26/supporters/scripts/import-history.mjs transactions.csv --dry-run
```

Remove `--dry-run` to write records. The script is idempotent — re-running merges new event types and tiers into existing records.

## Lexicon

Records are stored under `uk.ewancroft.kofi.supporter`. Each record contains:

```ts
{
  name: string   // display name from Ko-fi
  type: string   // "Donation" | "Subscription" | "Commission" | "Shop Order"
  tier?: string  // subscription tier name, if applicable
}
```

rkeys are TIDs derived from the transaction timestamp, making them lexicographically sortable by time.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
