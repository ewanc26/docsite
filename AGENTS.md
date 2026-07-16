# AGENTS.md

Guidance for agents working on Ewan's SvelteKit documentation site.

## Structure and publishing

- `src/routes/` owns documentation pages, posts, and server endpoints.
- `src/lib/` contains content loaders and reusable presentation.
- `static/` is copied directly to the deployed site.
- The README documents adding posts and AT Protocol publication; preserve frontmatter, slug, date, and publication identity conventions.

## Rules

- Use npm; `package-lock.json` is authoritative.
- Keep route URLs stable and validate content metadata at build time.
- AT Protocol publication is an external write: preserve DIDs, AT URIs, rkeys, facets, and record revisions, and never expose credentials to browser code.
- Reuse existing typography, navigation, code-block, and article components.
- Ensure prose remains readable, responsive, semantic, and accessible.
- Do not silently publish drafts or republish unchanged posts.

## Validation

Run `npm run check`, `npm run lint`, and `npm run build`, then preview the production build. Verify index ordering, direct post URLs, code highlighting, internal links, missing metadata errors, mobile layout, and AT Protocol publish dry-run/record construction without production credentials. Do not commit build output or `.env` files.
