<script lang="ts">
	import { formatDate } from '$lib/format';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>projects | ewan's docs</title>
	<meta name="description" content="All projects and documentation published by ewan." />
	<meta property="og:title" content="projects | ewan's docs" />
	<meta property="og:description" content="All projects and documentation published by ewan." />
	<meta name="twitter:title" content="projects | ewan's docs" />
	<meta name="twitter:description" content="All projects and documentation published by ewan." />
</svelte:head>

<p class="text-[0.72em] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">projects</p>
<h1 class="text-[1.4em] font-bold leading-[1.3] text-[var(--color-green)] mb-1">documentation</h1>
<p class="text-[var(--color-subtext-0)] text-[0.88em] leading-[1.7] mb-6">
	Published to ATProto via <a href="https://sequoia.pub" target="_blank" rel="noopener" class="text-[var(--color-green)] underline underline-offset-[3px]">Sequoia</a>.
</p>

<hr class="border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] my-5" />

{#if data.posts.length === 0}
	<p class="text-[var(--color-overlay-0)] text-[0.88em] italic">
		no docs yet — add markdown files to <code class="bg-[var(--color-surface-0)] border border-[color-mix(in_srgb,var(--color-green)_15%,transparent)] rounded px-1.5 py-0.5 text-[0.88em] text-[var(--color-green)]">src/content/documentation/</code>.
	</p>
{:else}
	<ul class="list-none flex flex-col gap-1.5 my-3">
		{#each data.posts as post}
			<li class="before:content-['→_'] before:text-[var(--color-green)] before:opacity-50">
				<a href="/projects/{post.slug}" class="no-underline text-[0.88em] text-[var(--color-subtext-0)] transition-colors hover:text-[var(--color-green)]">{post.title}</a>
				{#if post.date}<span class="text-[var(--color-overlay-0)] text-[0.8em] ml-2">{formatDate(post.date)}</span>{/if}
			</li>
		{/each}
	</ul>
{/if}
