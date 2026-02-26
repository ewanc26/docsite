<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import { Menu, X, Coffee, Globe } from '@lucide/svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
	let menuOpen = $state(false);

	$effect(() => {
		$page.url.pathname;
		menuOpen = false;
	});
</script>

<svelte:head>
	<title>ewan's docs</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Central documentation hub for ewan's projects." />
	<meta name="author" content="Ewan" />
	<meta property="og:site_name" content="ewan's docs" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="ewan's docs" />
	<meta property="og:description" content="Central documentation hub for ewan's projects." />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="ewan's docs" />
	<meta name="twitter:description" content="Central documentation hub for ewan's projects." />
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="shell">
	<!-- Titlebar -->
	<header class="area-titlebar flex items-center gap-2 px-5 py-2 text-[0.8em] bg-[var(--color-surface-0)] border-b border-[color-mix(in_srgb,var(--color-green)_15%,transparent)] text-[var(--color-green)]">
		<div class="flex gap-1.5">
			{#each [0,1,2] as _}
				<span class="w-2.5 h-2.5 rounded-full shrink-0 bg-[color-mix(in_srgb,var(--color-green)_25%,transparent)] border border-[color-mix(in_srgb,var(--color-green)_40%,transparent)]"></span>
			{/each}
		</div>
		<span class="ml-1 flex-1">ewan's projects — docs</span>
		<button
			class="hidden max-sm:flex items-center justify-center ml-auto bg-transparent border border-[color-mix(in_srgb,var(--color-green)_50%,transparent)] text-[var(--color-green)] px-2 py-1 rounded cursor-pointer transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_12%,transparent)]"
			aria-label={menuOpen ? 'close menu' : 'open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X size={16} />{:else}<Menu size={16} />{/if}
		</button>
	</header>

	<!-- Mobile overlay -->
	{#if menuOpen}
		<div class="fixed inset-0 z-[199] bg-black/50" role="presentation" onclick={() => (menuOpen = false)}></div>
	{/if}

	<!-- Sidebar -->
	<nav
		class="area-sidebar flex flex-col gap-6 p-5 bg-[var(--color-mantle)] border-r border-[color-mix(in_srgb,var(--color-green)_12%,transparent)]"
		class:open={menuOpen}
	>
		<div>
			<p class="text-[0.7em] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">overview</p>
			<ul class="flex flex-col gap-1 list-none">
				<li class="before:content-['→_'] before:text-[var(--color-green)] before:opacity-50">
					<a href="/" class="no-underline text-[0.88em] text-[var(--color-subtext-0)] transition-colors hover:text-[var(--color-green)] aria-[current=page]:text-[var(--color-green)]" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>home</a>
				</li>
			</ul>
		</div>
		<div>
			<p class="text-[0.7em] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">projects</p>
			<ul class="flex flex-col gap-1 list-none">
				<li class="before:content-['→_'] before:text-[var(--color-green)] before:opacity-50">
					<a href="/projects" class="no-underline text-[0.88em] text-[var(--color-subtext-0)] transition-colors hover:text-[var(--color-green)] aria-[current=page]:text-[var(--color-green)]" aria-current={$page.url.pathname === '/projects' ? 'page' : undefined}>all projects</a>
				</li>
				{#each data.posts as post}
					<li class="before:content-['→_'] before:text-[var(--color-green)] before:opacity-50">
						<a href="/projects/{post.slug}" class="no-underline text-[0.88em] text-[var(--color-subtext-0)] transition-colors hover:text-[var(--color-green)] aria-[current=page]:text-[var(--color-green)]" aria-current={$page.url.pathname === `/projects/${post.slug}` ? 'page' : undefined}>{post.title}</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="mt-auto pt-4 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] flex flex-col gap-1.5">
			<a href="https://ewancroft.uk" target="_blank" rel="noopener" class="flex items-center gap-1.5 w-full px-3 py-1.5 text-[0.82em] no-underline text-[var(--color-green)] border border-[color-mix(in_srgb,var(--color-green)_30%,transparent)] rounded bg-[color-mix(in_srgb,var(--color-green)_8%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] hover:text-[var(--color-text)]"><Globe size={14} />my website</a>
			<a href="https://ko-fi.com/ewancroft" target="_blank" rel="noopener" class="flex items-center gap-1.5 w-full px-3 py-1.5 text-[0.82em] no-underline text-[var(--color-green)] border border-[color-mix(in_srgb,var(--color-green)_30%,transparent)] rounded bg-[color-mix(in_srgb,var(--color-green)_8%,transparent)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-green)_18%,transparent)] hover:text-[var(--color-text)]"><Coffee size={14} />tip me on ko-fi</a>
		</div>
	</nav>

	<!-- Main -->
	<main class="area-main flex justify-center overflow-x-hidden">
		<div class="w-full min-w-0 max-w-[1200px] px-[clamp(1.2rem,4vw,3rem)] py-[clamp(1.5rem,4vw,3rem)]">
			{@render children()}
		</div>
	</main>

	<!-- Footer -->
	<footer class="area-footer text-center p-4 text-[0.75em] text-[color-mix(in_srgb,var(--color-green)_35%,transparent)] border-t border-[color-mix(in_srgb,var(--color-green)_10%,transparent)]">
		<a href="https://ewancroft.uk" target="_blank" rel="noopener" class="underline hover:text-[var(--color-green)]">ewancroft.uk</a>
		·
		<a href="https://github.com/ewanc26" target="_blank" rel="noopener" class="underline hover:text-[var(--color-green)]">github</a>
		·
		published via
		<a href="https://sequoia.pub" target="_blank" rel="noopener" class="underline hover:text-[var(--color-green)]">sequoia</a>
	</footer>
</div>
