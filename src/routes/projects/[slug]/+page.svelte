<script lang="ts">
	import { formatDate } from '$lib/format';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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
		<h1 class="page-title">{data.post.title}</h1>

		{#if data.post.date}
			<p class="page-date">{formatDate(data.post.date)}</p>
		{/if}

		{#if data.post.tags.length}
			<div class="tag-list">
				{#each data.post.tags as tag}
					<span class="tag"># {tag}</span>
				{/each}
			</div>
		{/if}

		<hr class="divider" />

		<div class="prose">{@html data.html}</div>

		<hr class="divider" />
		<a href="/projects" class="back-link">← all docs</a>
	</div>

	{#if data.toc.length > 1}
		<aside class="toc">
			<div class="toc-label">on this page</div>
			<nav>
				<ul class="toc-list">
					{#each data.toc as entry}
						<li class="toc-item" class:toc-h3={entry.level === 3}>
							<a href="#{entry.id}">{entry.text}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
