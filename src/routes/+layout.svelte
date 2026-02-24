<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import { Menu, X, Coffee, Globe } from '@lucide/svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
	let menuOpen = $state(false);

	// Close menu on navigation
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
	<header class="titlebar">
		<div class="titlebar-dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span class="titlebar-title">ewan's projects — docs</span>
		<button
			class="menu-toggle"
			aria-label={menuOpen ? 'close menu' : 'open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X size={16} />{:else}<Menu size={16} />{/if}
		</button>
	</header>

	<!-- Mobile overlay -->
	{#if menuOpen}
		<div class="nav-overlay" role="presentation" onclick={() => (menuOpen = false)}></div>
	{/if}

	<nav class="sidebar" class:open={menuOpen}>
		<div>
			<div class="nav-group-label">overview</div>
			<ul class="nav-links">
				<li>
					<a href="/" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>home</a>
				</li>
			</ul>
		</div>

		<div>
			<div class="nav-group-label">projects</div>
			<ul class="nav-links">
				<li>
					<a href="/projects" aria-current={$page.url.pathname === '/projects' ? 'page' : undefined}>
						all projects
					</a>
				</li>
				{#each data.posts as post}
					<li>
						<a
							href="/projects/{post.slug}"
							aria-current={$page.url.pathname === `/projects/${post.slug}` ? 'page' : undefined}
						>
							{post.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="nav-kofi">
			<a href="https://ewancroft.uk" target="_blank" rel="noopener" class="kofi-btn">
				<Globe size={14} />
				my website
			</a>
			<a href="https://ko-fi.com/ewancroft" target="_blank" rel="noopener" class="kofi-btn">
				<Coffee size={14} />
				tip me on ko-fi
			</a>
		</div>
	</nav>

	<main class="main">
		<div class="content-wrap">
			{@render children()}
		</div>
	</main>

	<footer class="footer">
		<a href="https://ewancroft.uk" target="_blank" rel="noopener">ewancroft.uk</a>
		·
		<a href="https://github.com/ewanc26" target="_blank" rel="noopener">github</a>
		·
		published via
		<a href="https://sequoia.pub" target="_blank" rel="noopener">sequoia</a>
	</footer>
</div>
