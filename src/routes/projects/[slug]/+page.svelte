<script lang="ts">
	import { formatDate } from '$lib/date';
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
	{#if data.post.tags.length}{#each data.post.tags as tag}<meta
				property="article:tag"
				content={tag}
			/>{/each}{/if}
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{data.post.title} | ewan's docs" />
	<meta name="twitter:description" content={data.post.description} />
	<!-- sequoia inject stamps the at-uri link tag here -->
</svelte:head>

<div class="flex w-full items-start gap-10">
	<!-- Article — min-w-0 prevents flex child overflowing -->
	<div class="max-w-[860px] min-w-0 flex-1">
		<p class="mb-2 text-[0.72em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
			projects
		</p>
		<h1 class="mb-1 text-[1.4em] leading-[1.3] font-bold text-[var(--color-green)]">
			{data.post.title}
		</h1>

		{#if data.post.date}
			<p class="mb-5 text-[0.8em] text-[var(--color-overlay-0)]">{formatDate(data.post.date)}</p>
		{/if}

		{#if data.post.tags.length}
			<div class="mb-5 flex flex-wrap gap-1.5">
				{#each data.post.tags as tag}
					<span class="text-[0.75em] text-[var(--color-green)] opacity-70"># {tag}</span>
				{/each}
			</div>
		{/if}

		<hr
			class="my-5 border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)]"
		/>

		<div class="prose max-w-none">{@html data.html}</div>

		<hr
			class="my-5 border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)]"
		/>
		<a
			href="/projects"
			class="text-[0.85em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)]"
			>← all docs</a
		>
	</div>

	<!-- ToC -->
	{#if data.toc.length > 1}
		<aside
			class="sticky top-6 hidden max-h-[calc(100dvh-3rem)] w-44 shrink-0 overflow-y-auto border-l border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] pl-5 [@media(min-width:900px)]:block"
		>
			<p class="mb-2 text-[0.7em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
				on this page
			</p>
			<nav>
				<ul class="flex list-none flex-col gap-1">
					{#each data.toc as entry}
						<li class:pl-3={entry.level === 3}>
							<a
								href="#{entry.id}"
								class="block text-[0.8em] leading-[1.4] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)] {entry.level ===
								3
									? 'opacity-75'
									: ''}">{entry.text}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
