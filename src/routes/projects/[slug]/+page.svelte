<script lang="ts">
	import { marked } from 'marked';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const html = $derived(marked(data.post.content));
</script>

<svelte:head>
	<title>{data.post.title}</title>
	<meta name="description" content={data.post.description} />
	<!-- sequoia inject stamps the at-uri link tag here -->
</svelte:head>

<div class="section-label">projects</div>
<h1 style="color: var(--color-green); font-size: 1.4em; margin-bottom: 0.25rem;">{data.post.title}</h1>

{#if data.post.date}
	<p style="color: var(--color-overlay-0); font-size: 0.8em; margin-bottom: 1.2rem;">{data.post.date}</p>
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
