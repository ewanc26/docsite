---
title: Tourmaline
description: AT Protocol scrobble analyser for Teal.fm listening history — genre map, mood profile, personality archetype, and shareable recaps.
date: 2026-08-20
tags: [tourmaline, atproto, tealfm, music, analysis, tools]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mo7b3gimrq27'
---

Tourmaline is a scrobble analyser for [Teal.fm](https://teal.fm) listening history on the AT Protocol. Point it at any public handle or DID and it ingests `fm.teal.feed.play` (and legacy `fm.teal.alpha.feed.play`) records, cross-references them against free music APIs, and builds a listener profile — genre map, mood profile, personality archetype, diversity and obscurity scores, listening streaks and milestones, and a Stories-style yearly recap. Browsing needs no sign-in; sign-in is only required to post a share card.

The name follows the same mineral-sigil convention as its siblings: tourmaline is a pleochroic gemstone that shows different colours from different angles — the [watermelon variety](https://en.wikipedia.org/wiki/Tourmaline#Colors) in particular, green rind and rose-pink core, which the logo's crystal zoning echoes.

Try it at [tourmaline.croft.click](https://tourmaline.croft.click), part of the [croft.click](/projects/croft-click) toolkit. Source: [`packages/tourmaline`](https://github.com/ewanc26/pkgs/tree/main/packages/tourmaline) in the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## How it works

1. Enter a handle (e.g. `ewancroft.uk`) or DID (`did:plc:...` / `did:web:...`)
2. Resolves identity via [Slingshot](https://slingshot.microcosm.blue), then fetches the DID document for the PDS URL
3. Fetches `fm.teal.feed.play` and legacy `fm.teal.alpha.feed.play` records from the user's PDS
4. Aggregates play counts, timelines, streaks, and listening patterns entirely client-side
5. Enriches artists with MusicBrainz (genres), Last.fm (tags, similar artists, listener counts), and Deezer (art, genre fallback, 30-second track previews) — progressively, in the background
6. Renders the profile as soon as the first pass completes, filling in genre/mood/recommendation detail as enrichment continues

Only identity resolution and third-party API calls happen server-side, via four small API routes. Aggregation and every derived stat are computed in the browser from the fetched data.

## Listener profile

- **Genre map** — weighted by play count, from MusicBrainz + Last.fm tags
- **Mood profile** — radar chart from tag keywords (Energetic, Melancholic, Chill, etc.)
- **Diversity score** — Shannon entropy normalised to 0–100
- **Obscurity index** — log-scaled Last.fm listener counts, 0 (mainstream) to 100 (deep cuts)
- **Era preference** — decade distribution from MusicBrainz release dates
- **Timeline heatmap** — hour × day listening patterns from scrobble timestamps
- **Personality archetype** — a listener "type" (The Curator, The Explorer, ...) derived from diversity, obscurity, mood, and genre range
- **Streaks & milestones** — longest scrobble/artist/track streaks, biggest listening gap, round-number milestones
- **Listening phases & sessions** — detects distinct eras in your taste over time and groups scrobbles into discrete listening sessions
- **On this day / remarkable days** — surfaces standout or unusual days from your history
- **Discovery** — first-listen dates for every artist, track, and album
- **Recommendations** — "You might like" artists, built entirely from Last.fm similar-artist data already fetched during enrichment, filtered to artists not already in your library
- **Yearly Wrapped & Story recap** — a Spotify-Wrapped-style summary and a Stories-style narrative card sequence, each exportable as a share image

### Listening context & comparisons

Tourmaline has no database, so it doesn't track a live distribution of other listeners' stats to compare you against. Two features handle this honestly instead:

- **Listening context** frames your diversity/obscurity scores against their own documented 0–100 scale, plus one externally-referenced band for daily listening pace, clearly labelled as illustrative rather than a live ranking.
- **Compare** sidesteps the problem entirely — every Teal.fm scrobbler has a public DID and public PDS records, so comparing two *specific* listeners needs no tracked distribution, just fetching both profiles the same way one is already fetched.

## Compare

`/compare` computes music-taste compatibility between any two Teal.fm listeners — no account linking needed on either side. Enter two handles or DIDs (prefillable via `?with=`, e.g. from a profile page's "Compare with…" link), and it:

- Fetches and enriches both profiles in parallel
- Computes a 0–100 compatibility score — cosine similarity over each listener's top-50 artists (60% weight) and genre distribution (40%)
- Lists shared artists/genres, each listener's unique top artists, and artists both discovered within 30 days of each other

## Share cards

Every card renders as an SVG with embedded fonts (so it converts cleanly to PNG for upload), goes through the same OAuth sign-in + post flow at `/share`, and logs a `click.croft.toolkit.use` record.

| Card | Trigger | Description |
| ---- | ------- | ----------- |
| Personality | "Share to Bluesky" on the personality card | Archetype, traits, genre/mood bars |
| Receipt | "Receipt" next to Top Tracks | Receiptify-style till receipt of your top 10 tracks |
| Festival lineup | "Lineup" next to Top Artists | Instafest-style poster, top artists sized by rank tier |
| Story recap | "Share" on the story recap card | Whichever recap card you're currently viewing, as a portrait Stories-shaped image |

## Track previews

Deezer's track-search API also returns a 30-second preview clip per track. Every entry in Top Tracks has a play button that fetches and plays it — one preview plays at a time.

## Since your last visit

Each completed profile load snapshots your scrobble/artist counts to `localStorage`; on your next visit, Tourmaline diffs against that snapshot before overwriting it and shows what's new (scrobble count, newly-discovered artists) since you last checked. This is a stateless-app workaround, not a subscription — there's no scheduler, email provider, or subscriber list behind it.

## APIs used

| API         | Purpose                                            | Auth       | Rate limit   |
| ----------- | --------------------------------------------------- | ---------- | ------------ |
| Slingshot   | Handle → DID resolution                             | None       | None         |
| MusicBrainz | Genres, MBIDs, release dates                        | User-Agent | 1 req/sec    |
| Last.fm     | Tags, similar artists, listener counts              | API key    | Undocumented |
| Deezer      | Artist images, genre fallback, 30s track previews   | None       | Undocumented |

Caching is two-layer and non-persistent — there's no database. Server-side, an in-memory `Map` scoped to one warm serverless instance caches artist enrichment for 7 days and track previews for 24 hours; it's gone on a cold start. Client-side, `localStorage` caches per artist name for 30 days, so repeat visits and other profiles sharing artists with yours skip the API calls entirely.

## Development

```bash
git clone https://github.com/ewanc26/pkgs.git
cd pkgs
pnpm install

pnpm --filter tourmaline dev
```

Copy `.env.example` to `.env` and add a [Last.fm API key](https://www.last.fm/api/account/create) (optional, enables tag/similar-artist enrichment):

```bash
cp packages/tourmaline/.env.example packages/tourmaline/.env
```

## Licence

AGPL-3.0-only.

## Trademark

“AT Protocol”, “atproto”, and “atprotocol” are trademarks of Bluesky Social PBC. Tourmaline is an independent project, not affiliated with or endorsed by Bluesky Social PBC; the terms are used only to describe compatibility. See the [AT Protocol trademark policy](https://atproto.com/about/trademarks/atproto-trademark-policy).
