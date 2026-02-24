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

<div class="section-label">projects</div>
<h1 class="page-title">documentation</h1>
<p class="page-desc">
	Published to ATProto via <a href="https://sequoia.pub" target="_blank" rel="noopener" class="accent-link">Sequoia</a>.
</p>

<hr class="divider" />

{#if data.posts.length === 0}
	<p class="empty-state">
		no docs yet — add markdown files to <code>src/content/documentation/</code>.
	</p>
{:else}
	<ul class="link-list">
		{#each data.posts as post}
			<li>
				<a href="/projects/{post.slug}">{post.title}</a>
				{#if post.date}
					<span class="inline-date">{formatDate(post.date)}</span>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
