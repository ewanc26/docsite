<script lang="ts">
	import { marked } from 'marked';
	import { formatDate, extractToc, makeRenderer } from '$lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const toc = $derived(extractToc(data.post.content));
	const html = $derived(marked(data.post.content, { renderer: makeRenderer() }));
</script>

<svelte:head>
	<title>{data.post.title} | ewan's docs</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content="{data.post.title} | ewan's docs" />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:type" content="article" />
	{#if data.post.date}<meta property="article:published_time" content={data.post.date} />{/if}
	{#if data.post.tags.length}{#each data.post.tags as tag}<meta property="article:tag" content={tag} />{/each}{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{data.post.title} | ewan's docs" />
	<meta name="twitter:description" content={data.post.description} />
	<!-- sequoia inject stamps the at-uri link tag here -->
</svelte:head>

<div class="doc-layout">
	<div class="doc-body">
		<div class="section-label">projects</div>
		<h1 style="color: var(--color-green); font-size: 1.4em; margin-bottom: 0.25rem;">{data.post.title}</h1>

		{#if data.post.date}
			<p style="color: var(--color-overlay-0); font-size: 0.8em; margin-bottom: 1.2rem;">{formatDate(data.post.date)}</p>
		{/if}

		{#if data.post.tags.length}
			<div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:1.2rem;">
				{#each data.post.tags as tag}
					<span style="font-size:0.75em; color:var(--color-green); opacity:0.7;"># {tag}</span>
				{/each}
			</div>
		{/if}

		<hr class="divider" />

		<div class="prose">{@html html}</div>

		<hr class="divider" />
		<a href="/projects" style="color:var(--color-subtext-0); font-size:0.85em; text-decoration:none;">← all docs</a>
	</div>

	{#if toc.length > 1}
		<aside class="toc">
			<div class="toc-label">on this page</div>
			<nav>
				<ul class="toc-list">
					{#each toc as entry}
						<li class="toc-item" class:toc-h3={entry.level === 3}>
							<a href="#{entry.id}">{entry.text}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>

<style>
	.doc-layout {
		display: flex;
		gap: 2.5rem;
		align-items: flex-start;
		width: 100%;
	}

	.doc-body {
		flex: 1;
		min-width: 0;
		max-width: 760px;
	}

	.toc {
		flex-shrink: 0;
		width: 180px;
		position: sticky;
		top: 1.5rem;
		max-height: calc(100dvh - 3rem);
		overflow-y: auto;
		padding-left: 1.2rem;
		border-left: 1px solid color-mix(in srgb, var(--color-green) 12%, transparent);
	}

	.toc-label {
		font-size: 0.7em;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-green);
		margin-bottom: 0.6rem;
	}

	.toc-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.toc-item a {
		font-size: 0.8em;
		text-decoration: none;
		color: var(--color-subtext-0);
		line-height: 1.4;
		display: block;
		transition: color 0.15s;
	}

	.toc-item a:hover {
		color: var(--color-green);
	}

	.toc-h3 a {
		padding-left: 0.75rem;
		opacity: 0.75;
	}

	@media (max-width: 900px) {
		.toc {
			display: none;
		}
	}
</style>
