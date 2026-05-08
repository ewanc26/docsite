<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import { Menu, X, Coffee, Globe } from '@lucide/svelte';
	import type { LayoutData } from './$types';
	import { MetaTags } from '$lib/components/seo';
	import { defaultSiteMeta, createSiteMeta } from '$lib/helper/metaTags';

	let { children, data }: { children: any; data: LayoutData } = $props();
	let menuOpen = $state(false);

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
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<MetaTags meta={siteMeta} {siteMeta} {fediverseCreator} />

<div class="shell">
	<!-- Titlebar -->
	<header
		class="area-titlebar flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--color-green)_15%,transparent)] bg-[var(--color-surface-0)] px-5 py-2 text-[0.8em] text-[var(--color-green)]"
	>
		<div class="flex gap-1.5">
			{#each [0, 1, 2] as _}
				<span
					class="h-2.5 w-2.5 shrink-0 rounded-full border border-[color-mix(in_srgb,var(--color-green)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-green)_25%,transparent)]"
				></span>
			{/each}
		</div>
		<span class="ml-1 flex-1">ewan's projects — docs</span>
		<button
			class="ml-auto hidden cursor-pointer items-center justify-center rounded border border-[color-mix(in_srgb,var(--color-green)_50%,transparent)] bg-transparent px-2 py-1 text-[var(--color-green)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_12%,transparent)] max-sm:flex"
			aria-label={menuOpen ? 'close menu' : 'open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X size={16} />{:else}<Menu size={16} />{/if}
		</button>
	</header>

	<!-- Mobile overlay -->
	{#if menuOpen}
		<div
			class="fixed inset-0 z-[199] bg-black/50"
			role="presentation"
			onclick={() => (menuOpen = false)}
		></div>
	{/if}

	<!-- Sidebar -->
	<nav
		class="area-sidebar flex flex-col gap-6 border-r border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] bg-[var(--color-mantle)] p-5"
		class:open={menuOpen}
	>
		<div>
			<p class="mb-2 text-[0.7em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
				overview
			</p>
			<ul class="flex list-none flex-col gap-1">
				<li class="before:text-[var(--color-green)] before:opacity-50 before:content-['→_']">
					<a
						href="/"
						class="text-[0.88em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)] aria-[current=page]:text-[var(--color-green)]"
						aria-current={$page.url.pathname === '/' ? 'page' : undefined}>home</a
					>
				</li>
				<li class="before:text-[var(--color-green)] before:opacity-50 before:content-['→_']">
					<a
						href="https://devlog.croft.click"
						target="_blank"
						rel="noopener"
						class="text-[0.88em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)]"
						>devlog</a
					>
				</li>
			</ul>
		</div>
		<div>
			<p class="mb-2 text-[0.7em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
				projects
			</p>
			<ul class="flex list-none flex-col gap-1">
				<li class="before:text-[var(--color-green)] before:opacity-50 before:content-['→_']">
					<a
						href="/projects"
						class="text-[0.88em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)] aria-[current=page]:text-[var(--color-green)]"
						aria-current={$page.url.pathname === '/projects' ? 'page' : undefined}>all projects</a
					>
				</li>
				{#each data.posts as post}
					<li class="before:text-[var(--color-green)] before:opacity-50 before:content-['→_']">
						<a
							href="/projects/{post.slug}"
							class="text-[0.88em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)] aria-[current=page]:text-[var(--color-green)]"
							aria-current={$page.url.pathname === `/projects/${post.slug}` ? 'page' : undefined}
							>{post.title}</a
						>
					</li>
				{/each}
			</ul>
		</div>
		<div
			class="mt-auto flex flex-col gap-1.5 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] pt-4"
		>
			<a
				href="https://ewancroft.uk"
				target="_blank"
				rel="noopener"
				class="flex w-full items-center gap-1.5 rounded border border-[color-mix(in_srgb,var(--color-green)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-green)_8%,transparent)] px-3 py-1.5 text-[0.82em] text-[var(--color-green)] no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] hover:text-[var(--color-text)]"
				><Globe size={14} />my website</a
			>
			<a
				href="https://ko-fi.com/ewancroft"
				target="_blank"
				rel="noopener"
				class="flex w-full items-center gap-1.5 rounded border border-[color-mix(in_srgb,var(--color-green)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-green)_8%,transparent)] px-3 py-1.5 text-[0.82em] text-[var(--color-green)] no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] hover:text-[var(--color-text)]"
				><Coffee size={14} />tip me on ko-fi</a
			>
		</div>
	</nav>

	<!-- Main -->
	<main class="area-main flex justify-center overflow-x-hidden">
		<div
			class="w-full max-w-[1200px] min-w-0 px-[clamp(1.2rem,4vw,3rem)] py-[clamp(1.5rem,4vw,3rem)]"
		>
			{@render children()}
		</div>
	</main>

	<!-- Footer -->
	<footer
		class="area-footer border-t border-[color-mix(in_srgb,var(--color-green)_10%,transparent)] p-4 text-center text-[0.75em] text-[color-mix(in_srgb,var(--color-green)_35%,transparent)]"
	>
		<a
			href="https://ewancroft.uk"
			target="_blank"
			rel="noopener"
			class="underline hover:text-[var(--color-green)]">ewancroft.uk</a
		>
		·
		<a
			href="https://github.com/ewanc26"
			target="_blank"
			rel="noopener"
			class="underline hover:text-[var(--color-green)]">github</a
		>
		· published via
		<a
			href="https://sequoia.pub"
			target="_blank"
			rel="noopener"
			class="underline hover:text-[var(--color-green)]">sequoia</a
		>
		·
		<span title="GDPR-compliant, cookie-free analytics">privacy-first analytics</span>
	</footer>
</div>
