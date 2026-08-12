<script lang="ts">
	/** Projects index — searchable, tag-filterable card grid of all documentation. */
	import { formatDate } from '$lib/date';
	import { Search, X } from '@lucide/svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let query = $state('');
	let activeTag = $state<string | null>(null);

	const topTags = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const post of data.posts) {
			for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
		return [...counts.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 16)
			.map(([tag]) => tag);
	});

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return data.posts.filter((post) => {
			if (activeTag && !post.tags.includes(activeTag)) return false;
			if (!q) return true;
			return (
				post.title.toLowerCase().includes(q) ||
				post.description.toLowerCase().includes(q) ||
				post.tags.some((t) => t.toLowerCase().includes(q))
			);
		});
	});

	function toggleTag(tag: string) {
		activeTag = activeTag === tag ? null : tag;
	}

	function clearFilters() {
		query = '';
		activeTag = null;
	}
</script>

<p class="mb-2 text-[0.72em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
	projects
</p>
<h1 class="mb-1 text-[1.6em] leading-[1.3] font-bold text-[var(--color-green)]">documentation</h1>
<p class="mb-6 text-[0.88em] leading-[1.7] text-[var(--color-subtext-0)]">
	{data.posts.length} projects, published to ATProto via
	<a
		href="https://sequoia.pub"
		target="_blank"
		rel="noopener"
		class="text-[var(--color-green)] underline underline-offset-[3px]">Sequoia</a
	>.
</p>

<!-- ── Search ────────────────────────────────────────────────────────────── -->
<div class="relative mb-4">
	<Search
		size={15}
		class="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--color-overlay-0)]"
	/>
	<input
		type="text"
		placeholder="search projects, tags, descriptions…"
		bind:value={query}
		class="w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--color-surface-0)] py-2.5 pr-9 pl-9 text-[0.88em] text-[var(--color-text)] placeholder-[var(--color-overlay-0)] transition-colors outline-none focus:border-[var(--border-strong)]"
	/>
	{#if query}
		<button
			aria-label="clear search"
			class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[var(--color-overlay-0)] transition-colors hover:text-[var(--color-green)]"
			onclick={() => (query = '')}
		>
			<X size={15} />
		</button>
	{/if}
</div>

<!-- ── Tag filter chips ──────────────────────────────────────────────────── -->
<div class="mb-6 flex flex-wrap gap-1.5">
	{#each topTags as tag}
		<button
			class="pill cursor-pointer transition-colors {activeTag === tag
				? 'border-[var(--color-green)]! bg-[var(--color-green)]! text-[var(--color-crust)]!'
				: 'hover:border-[var(--border-strong)]'}"
			onclick={() => toggleTag(tag)}>{tag}</button
		>
	{/each}
	{#if activeTag || query}
		<button
			class="pill cursor-pointer border-[var(--color-red)]/40 text-[var(--color-red)] transition-colors hover:border-[var(--color-red)]"
			onclick={clearFilters}>clear ×</button
		>
	{/if}
</div>

<p class="mb-4 text-[0.75em] text-[var(--color-overlay-0)]">
	showing {filtered.length} of {data.posts.length}
</p>

<!-- ── Post grid or empty state ──────────────────────────────────────── -->
{#if data.posts.length === 0}
	<p class="text-[0.88em] text-[var(--color-overlay-0)] italic">
		no docs yet — add markdown files to <code
			class="rounded border border-[var(--border-subtle)] bg-[var(--color-surface-0)] px-1.5 py-0.5 text-[0.88em] text-[var(--color-green)]"
			>src/content/documentation/</code
		>.
	</p>
{:else if filtered.length === 0}
	<p class="text-[0.88em] text-[var(--color-overlay-0)] italic">
		no projects match "{query}"{activeTag ? ` in #${activeTag}` : ''}.
	</p>
{:else}
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as post (post.slug)}
			<a href="/projects/{post.slug}" class="card interactive flex flex-col gap-2 p-4 no-underline">
				<h2 class="text-[0.95em] leading-tight font-semibold text-[var(--color-text)]">
					{post.title}
				</h2>
				{#if post.date}
					<p class="text-[0.72em] text-[var(--color-overlay-0)]">{formatDate(post.date)}</p>
				{/if}
				{#if post.description}
					<p class="line-clamp-3 text-[0.82em] leading-[1.6] text-[var(--color-subtext-0)]">
						{post.description}
					</p>
				{/if}
				{#if post.tags.length}
					<div class="mt-auto flex flex-wrap gap-1.5 pt-1">
						{#each post.tags.slice(0, 4) as tag}
							<span class="pill">{tag}</span>
						{/each}
						{#if post.tags.length > 4}
							<span class="pill opacity-60">+{post.tags.length - 4}</span>
						{/if}
					</div>
				{/if}
			</a>
		{/each}
	</div>
{/if}
