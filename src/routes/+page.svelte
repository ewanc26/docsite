<!-- Homepage — terminal-style hero with quick links and a snapshot of recent docs -->
<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/date';
	import { ArrowRight, Github } from '@lucide/svelte';

	const posts = $derived($page.data.posts ?? []);
	const featured = $derived(posts.slice(0, 6));
	const tagCount = $derived(new Set(posts.flatMap((p: { tags: string[] }) => p.tags)).size);
</script>

<!-- ── Hero ──────────────────────────────────────────────────────────────── -->
<div class="mb-2 text-[0.85em]">
	<span class="text-[var(--color-green)]">ewan@ewancroft.uk</span><span
		class="text-[var(--color-subtext-0)]">:~/projects</span
	><span class="text-[var(--color-overlay-0)]"> $</span>
	<span class="text-[var(--color-text)] opacity-80"> ls --docs</span>
</div>

<h1
	class="gradient-text mb-3 text-[clamp(1.8em,5vw,2.6em)] leading-[1.15] font-bold tracking-tight"
>
	central documentation hub<br />for all of ewan's projects
</h1>

<p class="mb-6 max-w-[60ch] text-[0.92em] leading-[1.75] text-[var(--color-subtext-0)]">
	A collection of tools, bots, and utilities — mostly built around
	<a
		href="https://atproto.com"
		target="_blank"
		rel="noopener"
		class="text-[var(--color-green)] underline underline-offset-[3px]">ATProto</a
	>
	and the Bluesky ecosystem. Every doc here is published to the AT Protocol via
	<a
		href="https://sequoia.pub"
		target="_blank"
		rel="noopener"
		class="text-[var(--color-green)] underline underline-offset-[3px]">Sequoia</a
	>.
</p>

<div class="mb-8 flex flex-wrap items-center gap-3">
	<a href="/projects" class="btn btn-primary">browse all projects<ArrowRight size={14} /></a>
	<a href="https://github.com/ewanc26" target="_blank" rel="noopener" class="btn btn-ghost"
		><Github size={14} />github</a
	>
	<div class="ml-auto flex gap-2 max-sm:ml-0">
		<span class="pill">{posts.length} projects documented</span>
		<span class="pill">{tagCount} tags</span>
	</div>
</div>

<hr class="my-7 border-0 border-t border-[var(--border-faint)]" />

<!-- ── Recently added ────────────────────────────────────────────────────── -->
<div class="mb-4 flex items-baseline justify-between gap-4">
	<p class="text-[0.72em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
		recently added
	</p>
	<a
		href="/projects"
		class="text-[0.8em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)]"
		>view all →</a
	>
</div>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each featured as post (post.slug)}
		<a href="/projects/{post.slug}" class="card interactive flex flex-col gap-2 p-4 no-underline">
			<div class="flex items-start justify-between gap-2">
				<h2 class="text-[0.95em] leading-tight font-semibold text-[var(--color-text)]">
					{post.title}
				</h2>
			</div>
			{#if post.date}
				<p class="text-[0.72em] text-[var(--color-overlay-0)]">{formatDate(post.date)}</p>
			{/if}
			{#if post.description}
				<p class="line-clamp-2 text-[0.82em] leading-[1.6] text-[var(--color-subtext-0)]">
					{post.description}
				</p>
			{/if}
			{#if post.tags?.length}
				<div class="mt-auto flex flex-wrap gap-1.5 pt-1">
					{#each post.tags.slice(0, 3) as tag}
						<span class="pill">{tag}</span>
					{/each}
				</div>
			{/if}
		</a>
	{/each}
</div>

<hr class="my-7 border-0 border-t border-[var(--border-faint)]" />

<p class="mb-2 text-[0.72em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
	quick links
</p>
<ul class="my-3 flex list-none flex-col gap-1">
	{#each [{ href: '/projects', label: 'all projects', ext: false }, { href: 'https://ewancroft.uk', label: 'my website', ext: true }, { href: 'https://github.com/ewanc26', label: 'github', ext: true }] as link}
		<li class="before:text-[var(--color-green)] before:opacity-50 before:content-['→_']">
			<a
				href={link.href}
				target={link.ext ? '_blank' : undefined}
				rel={link.ext ? 'noopener' : undefined}
				class="text-[0.88em] text-[var(--color-subtext-0)] no-underline transition-colors hover:text-[var(--color-green)]"
				>{link.label}</a
			>
		</li>
	{/each}
</ul>
