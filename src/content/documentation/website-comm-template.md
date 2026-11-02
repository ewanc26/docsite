---
title: Website Commission Template
description: A SvelteKit + Tailwind CSS starter template for Ko-fi website commissions, with CC BY-SA 4.0 licensing.
date: 2026-04-11
tags: [sveltekit, tailwind, template, commission]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mj7zf7lykp2r"
---

[website-comm-template](https://github.com/ewanc26/website-comm-template) is a SvelteKit + Tailwind CSS starter template for Ko-fi website commissions.

## Using this template

For client setup instructions, see **[SETUP.md](https://github.com/ewanc26/website-comm-template/blob/main/SETUP.md)**.

## What's included

- **Config-driven site** — site name, tagline, author, contact addresses, social links, and navigation all live in `src/lib/config.ts`.
- **Responsive navigation** — a sticky desktop nav and an accessible mobile menu that closes on route change, Escape, or an outside click.
- **Automatic light/dark palette** — semantic colour tokens switch with `prefers-color-scheme`.
- **Contact form** — server-side validation, a honeypot, and a per-IP in-memory rate limit (three submissions per ten minutes). [Resend](https://resend.com) is the default provider, and the sender is isolated in `src/lib/email.ts` so it can be swapped.
- **Sitemap and robots** — both are generated routes. The sitemap is derived from `navLinks`, and `PUBLIC_SITE_URL` overrides the configured origin for absolute URLs.
- **Server rendering** — `adapter-auto` produces an SSR deployment on supported hosts, which the contact form's server action requires.

## Project structure

```
src/
  lib/
    components/
      Nav.svelte          ← sticky top nav, mobile-responsive
      Footer.svelte       ← copyright, licence attribution, social links
    config.ts             ← ✏️  edit this first for every commission
    email.ts              ← contact form email sender (swap provider here)
    siteUrl.ts            ← resolves the canonical origin for sitemap/robots
    index.ts
  routes/
    +layout.svelte        ← wraps all pages with Nav + Footer
    +page.svelte          ← homepage
    layout.css            ← Tailwind entry point
    about/
      +page.svelte
    contact/
      +page.svelte
      +page.server.ts     ← form action: validation, rate limit, send
    robots.txt/
      +server.ts
    sitemap.xml/
      +server.ts
static/                   ← put images, fonts, etc. here
```

## Configuration

Set `site.url` in `src/lib/config.ts` to the live domain without a trailing slash, or set `PUBLIC_SITE_URL` in the deployment environment. For the contact form, set `RESEND_API_KEY`, then configure `contactEmailTo` and `contactEmailFrom` (or the `CONTACT_EMAIL_TO` and `CONTACT_EMAIL_FROM` environment overrides). See `.env.example` for the full set.

## Adding a new page

1. Create a folder under `src/routes/`, e.g. `src/routes/portfolio/`
2. Add a `+page.svelte` file inside it
3. Add a matching entry to `navLinks` in `src/lib/config.ts` — this also adds the page to the sitemap

## Recreate from scratch

```sh
pnpm dlx sv@0.12.5 create --template minimal --types ts \
  --add prettier tailwindcss="plugins:typography,forms" \
  sveltekit-adapter="adapter:auto" \
  --install pnpm ./
```

## Support

If you found this useful, consider [buying me a ko-fi](https://ko-fi.com/ewancroft)!

## Licence

Copyright © Ewan Croft (<https://ewancroft.uk>)
Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

You are free to use, adapt, and redistribute this template — including for commercial commissions — provided you give appropriate credit to Ewan Croft, link to the licence, and distribute any derivative work under the same licence. The attribution notice in `Footer.svelte` satisfies this requirement for deployed sites.
