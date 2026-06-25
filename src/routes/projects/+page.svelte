<script lang="ts">
	/** Projects index — lists all documentation posts sorted by date. */
	import { formatDate } from '$lib/date';
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

<p class="mb-2 text-[0.72em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
	projects
</p>
<h1 class="mb-1 text-[1.4em] leading-[1.3] font-bold text-[var(--color-green)]">documentation</h1>
<p class="mb-6 text-[0.88em] leading-[1.7] text-[var(--color-subtext-0)]">
	Published to ATProto via <a
		href="https://sequoia.pub"
		target="_blank"
		rel="noopener"
		class="text-[var(--color-green)] underline underline-offset-[3px]">Sequoia</a
	>.
</p>

<hr class="my-5 border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)]" />

<!-- ── Post list or empty state ──────────────────────────────────────── -->
{#if data.posts.length === 0}
	<p class="text-[0.88em] text-[var(--color-overlay-0)] italic">
		no docs yet — add markdown files to <code
			class="rounded border border-[color-mix(in_srgb,var(--color-green)_15%,transparent)] bg-[var(--color-surface-0)] px-1.5 py-0.5 text-[0.88em] text-[var(--color-green)]"
			>src/content/documentation/</code
		>.
	</p>
{:else}
	<ul class="my-3 flex list-none flex-col gap-1.5">
		{#each data.posts as post}
			<li class="before:text-[var(--color-green)] before:opacity-50 before:content-['→_']">
				<a
					href="/projects/{post.slug}"
					class="text-[0.88em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)]"
					>{post.title}</a
				>
				{#if post.date}<span class="ml-2 text-[0.8em] text-[var(--color-overlay-0)]"
						>{formatDate(post.date)}</span
					>{/if}
			</li>
		{/each}
	</ul>
{/if}
