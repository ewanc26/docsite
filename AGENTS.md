# AGENTS.md

Guidance for agents working on `docs.ewancroft.uk`, a fully prerendered SvelteKit 5 documentation catalogue whose Markdown is also published as Standard.site records through Sequoia.

## Read First

- Read `README.md`, `package.json`, `flake.nix`, `sequoia.json`, and the touched route/library/content. Documentation claims should be checked against the relevant project, not inferred from an old post.
- `src/content/documentation/` is the corpus. `src/lib/posts.ts` synchronously reads frontmatter, filters drafts, and sorts by date; `src/lib/format.ts` renders GFM and separately derives h2/h3 ToC entries.
- `src/routes/+layout.svelte` owns the terminal-themed shell and navigation. `/projects` lists entries and `/projects/[slug]` prerenders each document. `static/` is copied unchanged, including the Standard.site publication proof.
- `sequoia.json` fixes the production origin, content directory, `/projects` prefix, identity DID resolution, and publication AT URI. `.sequoia-state.json` is local reconciliation state, not ordinary source.

## Content and Publication Contracts

- Entry filenames are canonical slugs: `name.md` becomes `/projects/name`. Renames affect web URLs and AT publication state; plan redirects/reconciliation rather than silently changing them.
- Expected frontmatter is `title`, `description`, `date`, `tags`, and optional `draft`. The loader currently substitutes defaults and does not validate dates, array types, duplicate slugs, or malformed metadata. Add explicit build validation before claiming bad entries fail cleanly.
- `listPosts()` excludes drafts, but `getPost()` itself does not. Preserve draft exclusion in generated entries and avoid introducing runtime/fallback routing that makes an unpublished slug reachable.
- Markdown is repository-authored and rendered without raw-HTML passthrough before `{@html}`. If content becomes remote or raw HTML is enabled, add a deliberate sanitizer and URL policy.
- The hand-built ToC slug algorithm does not fully reproduce `rehype-slug` for duplicate headings and all Unicode. Test anchor parity whenever changing Markdown processing.
- `src/content/documentation/docsite.md` contains example frontmatter inside its prose; do not confuse examples with a second document record during simplistic text checks.

## Site Rules

- Preserve the Catppuccin-inspired green terminal shell, JetBrains Mono typography, responsive sidebar drawer, readable tables/code, semantic headings, keyboard focus, and 900px ToC breakpoint.
- Site metadata comes from build-time `PUBLIC_SITE_TITLE`, `PUBLIC_SITE_DESCRIPTION`, and `PUBLIC_SITE_URL`; optional fediverse creator values are read in the server layout. `.env.example` is placeholder data, so production builds must supply real values.
- All routes are prerendered. `svelte.config.js` currently warns rather than fails for HTTP and missing-ID errors, so inspect warnings and generated pages instead of treating exit zero as proof of link correctness.
- AT Protocol publication is an external write. Before `sequoia publish`, inspect the exact Markdown diff, configured identity/publication URI, credentials, and state; afterward verify the record and injected canonical AT URI.
- Do not republish unchanged records, expose credentials to client bundles, or edit the `.well-known/site.standard.publication` proof independently of publication identity.

## Tooling and Validation

- pnpm is authoritative (`pnpm-lock.yaml`, `pnpm-workspace.yaml`, and `.npmrc` are tracked; no npm lockfile exists). The Nix shell provides Node 22 and pnpm. Run `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm lint`, and `pnpm build`; there is no automated test script.
- Preview the build and verify date ordering, draft exclusion, every direct slug, 404 behavior, malformed metadata handling, duplicate/Unicode headings, GFM tables/code/links, sidebar overflow, mobile drawer/focus, and production SEO/fediverse values.
- Inspect prerender warnings and `build/` output locally, but do not commit `node_modules/`, `.svelte-kit/`, `build/`, `dist/`, `.vercel/`, `.env`, or `.sequoia-state.json`.
- Preserve unrelated worktree changes—especially package/workspace configuration—and stage only the intended files.
