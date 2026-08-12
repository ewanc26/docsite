<script lang="ts">
	/**
	 * Root layout: terminal-themed shell with sidebar nav, mobile drawer, and
	 * SEO meta tags shared across all pages.
	 */
	import './layout.css';
	import { page } from '$app/stores';
	import { Menu, X, Coffee, Globe } from '@lucide/svelte';
	import type { LayoutData } from './$types';
	import { MetaTags } from '$lib/components/seo';
	import { defaultSiteMeta, type SiteMetadata } from '$lib/helper/metaTags';
	import type { PostMeta } from '$lib/posts';
	import type { Snippet } from 'svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
	let menuOpen = $state(false);

	// Close mobile sidebar when navigating to a new page
	$effect(() => {
		$page.url.pathname;
		menuOpen = false;
	});

	// Compute fediverse:creator from AP instance and username
	const fediverseCreator = $derived.by(() => {
		if (!data.apInstanceUrl || !data.apUsername) return null;
		try {
			return `${data.apUsername}@${new URL(data.apInstanceUrl).hostname}`;
		} catch {
			return null;
		}
	});

	const siteMeta = defaultSiteMeta;

	// Sidebar shows only a handful of the most recent docs — with 70+ published
	// posts, listing every single one made the sidebar unusable. Full browsing
	// happens on /projects, which has search and tag filtering.
	const recentPosts = $derived(data.posts.slice(0, 5));

	// The layout is the single source of truth for head metadata. Pages used to
	// emit their own <title>/description/og:* tags, but because the layout renders
	// first the site-wide defaults won and every document advertised the homepage
	// description and URL to crawlers.
	const post = $derived(($page.data as { post?: PostMeta }).post);

	const pageMeta = $derived.by<SiteMetadata>(() => {
		const path = $page.url.pathname;
		const url = `${siteMeta.url.replace(/\/$/, '')}${path === '/' ? '' : path}`;

		if (post) {
			return {
				title: `${post.title} | ${siteMeta.title}`,
				description: post.description || siteMeta.description,
				keywords: post.tags.length ? post.tags.join(', ') : siteMeta.keywords,
				url,
				image: siteMeta.image
			};
		}
		if (path === '/projects') {
			return {
				title: `projects | ${siteMeta.title}`,
				description: 'All projects and documentation published by ewan.',
				keywords: siteMeta.keywords,
				url,
				image: siteMeta.image
			};
		}
		return { ...siteMeta, title: `home | ${siteMeta.title}`, url };
	});
</script>

<MetaTags meta={pageMeta} {siteMeta} {fediverseCreator} type={post ? 'article' : 'website'} />

<div class="shell">
	<!-- ── Titlebar ────────────────────────────────────────────────────── -->
	<header
		class="area-titlebar sticky top-0 z-[150] flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--color-mantle)_88%,transparent)] px-5 py-2.5 text-[0.8em] text-[var(--color-green)] backdrop-blur-md"
	>
		<div class="flex gap-1.5">
			{#each [0, 1, 2] as _}
				<span
					class="h-2.5 w-2.5 shrink-0 rounded-full border border-[color-mix(in_srgb,var(--color-green)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-green)_25%,transparent)] shadow-[0_0_6px_color-mix(in_srgb,var(--color-green)_35%,transparent)]"
				></span>
			{/each}
		</div>
		<span class="ml-1 flex-1 font-semibold tracking-tight">ewan's projects — docs</span>
		<button
			class="ml-auto hidden cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-transparent px-2 py-1 text-[var(--color-green)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_12%,transparent)] max-sm:flex"
			aria-label={menuOpen ? 'close menu' : 'open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X size={16} />{:else}<Menu size={16} />{/if}
		</button>
	</header>

	<!-- ── Mobile overlay ─────────────────────────────────────────────── -->
	{#if menuOpen}
		<div
			class="fixed inset-0 z-[199] bg-black/50"
			role="presentation"
			onclick={() => (menuOpen = false)}
		></div>
	{/if}

	<!-- ── Sidebar ─────────────────────────────────────────────────────── -->
	<nav
		class="area-sidebar flex flex-col gap-6 border-r border-[var(--border-subtle)] bg-[var(--color-mantle)] p-5"
		class:open={menuOpen}
	>
		<div>
			<p class="mb-2 text-[0.7em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
				overview
			</p>
			<ul class="flex list-none flex-col gap-0.5">
				<li>
					<a
						href="/"
						class="nav-link"
						aria-current={$page.url.pathname === '/' ? 'page' : undefined}>home</a
					>
				</li>
				<li>
					<a href="https://devlog.croft.click" target="_blank" rel="noopener" class="nav-link"
						>devlog</a
					>
				</li>
			</ul>
		</div>
		<div>
			<p class="mb-2 text-[0.7em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
				projects
			</p>
			<ul class="flex list-none flex-col gap-0.5">
				<li>
					<a
						href="/projects"
						class="nav-link"
						aria-current={$page.url.pathname === '/projects' ? 'page' : undefined}>all projects</a
					>
				</li>
			</ul>
		</div>
		<div>
			<p class="mb-2 text-[0.7em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
				recently added
			</p>
			<ul class="flex list-none flex-col gap-0.5">
				{#each recentPosts as post}
					<li>
						<a
							href="/projects/{post.slug}"
							class="nav-link truncate"
							title={post.title}
							aria-current={$page.url.pathname === `/projects/${post.slug}` ? 'page' : undefined}
							>{post.title}</a
						>
					</li>
				{/each}
			</ul>
		</div>
		<div class="mt-auto flex flex-col gap-1.5 border-t border-[var(--border-subtle)] pt-4">
			<a href="https://ewancroft.uk" target="_blank" rel="noopener" class="btn btn-ghost w-full"
				><Globe size={14} />my website</a
			>
			<a
				href="https://ko-fi.com/ewancroft"
				target="_blank"
				rel="noopener"
				class="btn btn-ghost w-full"><Coffee size={14} />tip me on ko-fi</a
			>
		</div>
	</nav>

	<!-- ── Main ────────────────────────────────────────────────────────── -->
	<main class="area-main flex justify-center overflow-x-hidden">
		<div
			class="w-full max-w-[1200px] min-w-0 px-[clamp(1.2rem,4vw,3rem)] py-[clamp(1.5rem,4vw,3rem)]"
		>
			{@render children()}
		</div>
	</main>

	<!-- ── Footer ──────────────────────────────────────────────────────────── -->
	<footer
		class="area-footer flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-[var(--border-faint)] p-5 text-center text-[0.75em] text-[color-mix(in_srgb,var(--color-green)_45%,transparent)]"
	>
		<a
			href="https://ewancroft.uk"
			target="_blank"
			rel="noopener"
			class="underline decoration-[color-mix(in_srgb,var(--color-green)_35%,transparent)] underline-offset-2 transition-colors hover:text-[var(--color-green)]"
			>ewancroft.uk</a
		>
		<span aria-hidden="true" class="opacity-40">·</span>
		<a
			href="https://github.com/ewanc26"
			target="_blank"
			rel="noopener"
			class="underline decoration-[color-mix(in_srgb,var(--color-green)_35%,transparent)] underline-offset-2 transition-colors hover:text-[var(--color-green)]"
			>github</a
		>
		<span aria-hidden="true" class="opacity-40">·</span>
		<a
			href="https://github.com/sponsors/ewanc26"
			target="_blank"
			rel="noopener"
			class="underline decoration-[color-mix(in_srgb,var(--color-green)_35%,transparent)] underline-offset-2 transition-colors hover:text-[var(--color-green)]"
			>GitHub Sponsors</a
		>
		<span aria-hidden="true" class="opacity-40">·</span>
		published via
		<a
			href="https://sequoia.pub"
			target="_blank"
			rel="noopener"
			class="underline decoration-[color-mix(in_srgb,var(--color-green)_35%,transparent)] underline-offset-2 transition-colors hover:text-[var(--color-green)]"
			>sequoia</a
		>
		<span aria-hidden="true" class="opacity-40">·</span>
		<span title="GDPR-compliant, cookie-free analytics">privacy-first analytics</span>
	</footer>
</div>
