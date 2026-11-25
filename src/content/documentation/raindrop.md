---
title: raindrop
description: A Firefox fork with first-class support for the AT Protocol and its at:// URI schema, so the browser speaks the protocol itself instead of routing through a gateway.
date: 2026-11-23
tags: [firefox, atproto, browser, c, rust, mozilla]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n33vrmwq532s"
---

[raindrop](https://github.com/ewanc26/raindrop) is a Firefox fork that has first-class support for the AT Protocol and its URI schema.

## Why

The AT Protocol addresses every record on the open social web with an `at://` URI: `at://did:plc:example/app.bsky.feed.post/3l...`. No mainstream browser understands that scheme, so today the only way to reach such content is an HTTP gateway or an app-specific web client, which reintroduces a trusted third party into a protocol designed not to need one.

raindrop's premise is that the browser should speak the protocol itself. Instead of teaching users about gateways, `at://` becomes a first-class citizen of the address bar, the same way `http://`, `mailto:` and `file://` already are.

## Why the name?

The ecosystem built on the AT Protocol is known as the Atmosphere, and rain is what an atmosphere is for. It is also the architecture in one image: a raindrop leaves the cloud (the author's repository) and lands exactly where it is pointed, with nothing in between. No gateway intermediates a raindrop. Each `at://` URI is a drop — small, precisely addressed, and fetched directly from its own PDS rather than routed through anyone else's sky.

## Status

The pristine, signed Firefox 160.0.1 release source is imported on the `upstream` branch and tagged `firefox-160.0.1`; raindrop's work is the patch queue on `main`. The `at://` scheme handler, DID and handle resolution, PDS record fetch, record views and honest failure pages are implemented in `netwerk/protocol/atproto/`. The tree builds locally, the module's GTests and xpcshell tests pass, and v0.11.0 has been released on Firefox 160.0.1.

The design and trademark sign-offs are recorded. See the [roadmap](https://github.com/ewanc26/raindrop/blob/main/docs/ROADMAP.md), [architecture](https://github.com/ewanc26/raindrop/blob/main/docs/ARCHITECTURE.md), [building](https://github.com/ewanc26/raindrop/blob/main/docs/BUILDING.md) and [AT Protocol setup](https://github.com/ewanc26/raindrop/blob/main/docs/ATPROTO_SETUP.md) docs for current gates.

## Licence

raindrop is licensed under the Mozilla Public License 2.0, keeping it compatible with the Firefox code it is built from — see [LICENSE](https://github.com/ewanc26/raindrop/blob/main/LICENSE).