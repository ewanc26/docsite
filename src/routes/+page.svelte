<svelte:head>
	<title>home | ewan's docs</title>
	<meta name="description" content="Central documentation hub for ewan's projects." />
	<meta property="og:title" content="home | ewan's docs" />
	<meta property="og:description" content="Central documentation hub for ewan's projects." />
	<meta name="twitter:title" content="home | ewan's docs" />
	<meta name="twitter:description" content="Central documentation hub for ewan's projects." />
</svelte:head>

<div class="text-[0.9em] mb-1">
	<span class="text-[var(--color-green)]">ewan@ewancroft.uk</span><span class="text-[var(--color-subtext-0)]">:~/projects</span><span class="text-[var(--color-overlay-0)]"> $</span>
</div>
<p class="text-[var(--color-subtext-0)] text-[0.88em] mb-5">central documentation hub for all projects</p>

<hr class="border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] my-5" />

<p class="text-[0.72em] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">about</p>
<p class="text-[var(--color-subtext-0)] text-[0.88em] leading-[1.7] mb-6">
	A collection of tools, bots, and utilities — mostly built around
	<a href="https://atproto.com" target="_blank" rel="noopener" class="text-[var(--color-green)] underline underline-offset-[3px]">ATProto</a>
	and the Bluesky ecosystem. Posts are published to the AT Protocol via
	<a href="https://sequoia.pub" target="_blank" rel="noopener" class="text-[var(--color-green)] underline underline-offset-[3px]">Sequoia</a>.
</p>

<hr class="border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)] my-5" />

<p class="text-[0.72em] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">quick links</p>
<ul class="list-none flex flex-col gap-1.5 my-3">
	{#each [{ href: '/projects', label: 'all projects', ext: false }, { href: 'https://ewancroft.uk', label: 'my website', ext: true }, { href: 'https://github.com/ewanc26', label: 'github', ext: true }] as link}
		<li class="before:content-['→_'] before:text-[var(--color-green)] before:opacity-50">
			<a href={link.href} target={link.ext ? '_blank' : undefined} rel={link.ext ? 'noopener' : undefined} class="no-underline text-[0.88em] text-[var(--color-subtext-0)] transition-colors hover:text-[var(--color-green)]">{link.label}</a>
		</li>
	{/each}
</ul>
