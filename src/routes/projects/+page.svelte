<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="section-label">projects</div>
<h1 style="color: var(--color-green); font-size: 1.4em; margin-bottom: 0.4rem;">documentation</h1>
<p style="color: var(--color-subtext-0); font-size: 0.88em; margin-bottom: 1.6rem;">
	Published to ATProto via <a href="https://sequoia.pub" target="_blank" rel="noopener"
		style="color: var(--color-green);">Sequoia</a>.
</p>

<hr class="divider" />

{#if data.posts.length === 0}
	<p style="color: var(--color-overlay-0); font-size: 0.88em; font-style: italic;">
		no docs yet — add markdown files to <code>src/content/documentation/</code>.
	</p>
{:else}
	<ul class="link-list">
		{#each data.posts as post}
			<li>
				<a href="/projects/{post.slug}">{post.title}</a>
				{#if post.date}
					<span style="color: var(--color-overlay-0); font-size: 0.8em; margin-left: 0.6rem;">
						{post.date}
					</span>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
