<!-- Homepage — terminal-style landing with quick links to projects -->

<div class="mb-1 text-[0.9em]">
	<span class="text-[var(--color-green)]">ewan@ewancroft.uk</span><span
		class="text-[var(--color-subtext-0)]">:~/projects</span
	><span class="text-[var(--color-overlay-0)]"> $</span>
</div>
<p class="mb-5 text-[0.88em] text-[var(--color-subtext-0)]">
	central documentation hub for all projects
</p>

<hr class="my-5 border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)]" />

<p class="mb-2 text-[0.72em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
	about
</p>
<p class="mb-6 text-[0.88em] leading-[1.7] text-[var(--color-subtext-0)]">
	A collection of tools, bots, and utilities — mostly built around
	<a
		href="https://atproto.com"
		target="_blank"
		rel="noopener"
		class="text-[var(--color-green)] underline underline-offset-[3px]">ATProto</a
	>
	and the Bluesky ecosystem. Posts are published to the AT Protocol via
	<a
		href="https://sequoia.pub"
		target="_blank"
		rel="noopener"
		class="text-[var(--color-green)] underline underline-offset-[3px]">Sequoia</a
	>.
</p>

<hr class="my-5 border-0 border-t border-[color-mix(in_srgb,var(--color-green)_12%,transparent)]" />

<p class="mb-2 text-[0.72em] font-bold tracking-[0.12em] text-[var(--color-green)] uppercase">
	quick links
</p>
<ul class="my-3 flex list-none flex-col gap-1.5">
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
