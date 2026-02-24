<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<svelte:head>
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
	</header>

	<nav class="sidebar">
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
	</nav>

	<main class="main">
		{@render children()}
	</main>

	<footer class="footer">
		published via
		<a href="https://sequoia.pub" target="_blank" rel="noopener">sequoia</a>
		·
		<a href="https://tangled.org/ewancroft.uk" target="_blank" rel="noopener">tangled</a>
	</footer>
</div>
