---
title: inkwell-website
description: Landing page, legal pages and OAuth metadata host for the Inkwell apps — maintained in the inkwell monorepo's website/ directory.
date: 2026-06-30
tags: [sveltekit, website, atprotocol, standard-site, oauth, archived]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mpht4rhw5x27"
---

> **Archived standalone repo.** [inkwell-website](https://github.com/ewanc26/inkwell-website) is archived — GitHub describes it as "Archived: consolidated into https://github.com/ewanc26/inkwell (website/)". The site now lives in the [`website/`](https://github.com/ewanc26/inkwell/tree/main/website) directory of the [Inkwell monorepo](https://github.com/ewanc26/inkwell). See [Inkwell](/projects/inkwell) for the apps.

The website at [inkwell.ewancroft.uk](https://inkwell.ewancroft.uk) is the landing page, legal and OAuth-metadata site for the [Inkwell iOS and Android apps](/projects/inkwell). It is a SvelteKit app deployed to Vercel with pnpm.

## Purpose

The website serves several functions:

1. **Landing page** — Public-facing site describing Inkwell, its features and its current install routes.
2. **Distribution metadata** — Hosts the self-hosted [AltStore Classic](https://inkwell.ewancroft.uk/altstore/source.json) source for iOS and the signed F-Droid repository index for Android, plus web-optimised screenshots for both platforms.
3. **OAuth metadata host** — Hosts the live `/client-metadata.json` OAuth client identity and redirect URIs required for AT Protocol OAuth sign-in, enabling both apps to authenticate users via their AT Protocol handle.
4. **Legal pages** — `/privacy` and `/terms` are rendered from the monorepo's `legal/*.md` sources, the same documents shown natively in both apps.

## Localisation

British English is the source locale and is served unprefixed, so every existing address remains canonical. Additional locales live under one path segment — French is at `/fr`, `/fr/features`, `/fr/privacy`, and so on. Locale is decided by the URL alone; there is no `Accept-Language` redirect.

## Development

```sh
pnpm install
pnpm dev       # start dev server
pnpm check     # svelte-kit sync + svelte-check
pnpm build     # production build
pnpm preview   # preview production build
```

There is no lint or test script; use `pnpm exec prettier --check --ignore-unknown .` for a non-mutating formatting check.

## Related

- [Inkwell](/projects/inkwell) — the monorepo containing the iOS app, Android app, shared KMP core and this website
- [Inkwell for Android](/projects/inkwell-android) — the Android client

## Licence

AGPL-3.0 with the [App Store Distribution Exception](https://github.com/ewanc26/inkwell/blob/main/APP_STORE_EXCEPTION.md). See the repository's [LICENSE](https://github.com/ewanc26/inkwell/blob/main/LICENSE) for the base licence.
