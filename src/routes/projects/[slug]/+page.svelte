<script lang="ts">
	/**
	 * Individual documentation post page: renders prose content alongside
	 * a sticky table-of-contents sidebar for multi-section articles.
	 */
	import { onMount } from 'svelte';
	import { formatDate } from '$lib/date';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let activeId = $state<string | null>(null);

	const readingMinutes = $derived(
		Math.max(1, Math.round(data.post.content.trim().split(/\s+/).filter(Boolean).length / 200))
	);

	onMount(() => {
		const headings = Array.from(document.querySelectorAll<HTMLElement>('.prose h2, .prose h3'));
		if (!headings.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
						break;
					}
				}
			},
			{ rootMargin: '-10% 0px -75% 0px', threshold: 0 }
		);
		headings.forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	});
</script>

<!--
	Title, description, canonical, og:* and twitter:* all come from the root
	layout, which reads this page's `post` out of `page.data`. Only the
	article-specific tags live here — duplicating the others made the layout's
	site-wide defaults win, since they are rendered into <head> first.
-->
<svelte:head>
	{#if data.post.date}<meta property="article:published_time" content={data.post.date} />{/if}
	{#each data.post.tags as tag}<meta property="article:tag" content={tag} />{/each}
	<!-- sequoia inject stamps the at-uri link tag here -->
</svelte:head>

<!-- ── Article content ──────────────────────────────────────────────────── -->

<div class="flex w-full items-start gap-10">
	<!-- Article — min-w-0 prevents flex child overflowing -->
	<div class="max-w-[860px] min-w-0 flex-1">
		<a
			href="/projects"
			class="mb-4 inline-flex items-center gap-1 text-[0.78em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)]"
			>← all docs</a
		>

		<h1 class="mb-2 text-[1.7em] leading-[1.25] font-bold tracking-tight text-[var(--color-green)]">
			{data.post.title}
		</h1>

		<div
			class="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78em] text-[var(--color-overlay-0)]"
		>
			{#if data.post.date}<span>{formatDate(data.post.date)}</span>{/if}
			{#if data.post.date}<span aria-hidden="true" class="opacity-50">·</span>{/if}
			<span>{readingMinutes} min read</span>
		</div>

		{#if data.post.tags.length}
			<div class="mb-6 flex flex-wrap gap-1.5">
				{#each data.post.tags as tag}
					<span class="pill">{tag}</span>
				{/each}
			</div>
		{/if}

		<div class="prose max-w-none">{@html data.html}</div>

		<hr class="my-7 border-0 border-t border-[var(--border-faint)]" />
		<a
			href="/projects"
			class="text-[0.85em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)]"
			>← all docs</a
		>
	</div>

	<!-- ToC -->
	{#if data.toc.length > 1}
		<aside
			class="sticky top-20 hidden max-h-[calc(100dvh-6rem)] w-48 shrink-0 overflow-y-auto border-l border-[var(--border-subtle)] pl-4 [@media(min-width:900px)]:block"
		>
			<p class="mb-2 text-[0.7em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
				on this page
			</p>
			<nav>
				<ul class="flex list-none flex-col gap-0.5">
					{#each data.toc as entry}
						<li>
							<a
								href="#{entry.id}"
								class="nav-link {entry.level === 3 ? 'pl-6! text-[0.92em] opacity-80' : ''}"
								aria-current={entry.id === activeId ? 'page' : undefined}>{entry.text}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
