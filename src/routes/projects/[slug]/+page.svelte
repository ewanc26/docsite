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

<div class="flex gap-10 items-start w-full">
	<!-- Article — min-w-0 prevents flex child overflowing -->
	<div class="flex-1 min-w-0 max-w-[860px]">
		<p class="text-[0.72em] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">projects</p>
		<h1 class="text-[1.4em] font-bold leading-[1.3] text-[var(--color-green)] mb-1">{data.post.title}</h1>

		{#if data.post.date}
			<p class="text-[var(--color-overlay-0)] text-[0.8em] mb-5">{formatDate(data.post.date)}</p>
		{/if}

		{#if data.post.tags.length}
			<div class="flex gap-1.5 flex-wrap mb-5">
				{#each data.post.tags as tag}
					<span class="text-[0.75em] text-[var(--color-green)] opacity-70"># {tag}</span>
				{/each}
			</div>
		{/if}

		<hr class="border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] my-5" />

		<div class="prose max-w-none">{@html data.html}</div>

		<hr class="border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] my-5" />
		<a href="/projects" class="text-[0.85em] no-underline text-[var(--color-subtext-0)] transition-colors hover:text-[var(--color-green)]">← all docs</a>
	</div>

	<!-- ToC -->
	{#if data.toc.length > 1}
		<aside class="shrink-0 w-44 sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto pl-5 border-l border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] hidden [@media(min-width:900px)]:block">
			<p class="text-[0.7em] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">on this page</p>
			<nav>
				<ul class="list-none flex flex-col gap-1">
					{#each data.toc as entry}
						<li class:pl-3={entry.level === 3}>
							<a href="#{entry.id}" class="text-[0.8em] no-underline text-[var(--color-subtext-0)] leading-[1.4] block transition-colors hover:text-[var(--color-green)] {entry.level === 3 ? 'opacity-75' : ''}">{entry.text}</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
