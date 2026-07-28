<script lang="ts">
	/**
	 * SEO meta-tag component: renders Open Graph, Twitter Card, and
	 * fediverse:creator meta tags into <svelte:head>.
	 */
	import type { SiteMetadata } from '$lib/helper/metaTags';

	interface Props {
		meta: SiteMetadata;
		siteMeta: SiteMetadata;
		fediverseCreator?: string | null;
		/** Open Graph object type — `article` for documentation pages. */
		type?: string;
	}

	let { meta, siteMeta, fediverseCreator, type = 'website' }: Props = $props();

	/** Resolve a possibly-relative value against the site origin. */
	function absolute(value: string, base: string): string {
		try {
			return new URL(value, base).href;
		} catch {
			return value;
		}
	}

	// Merge page-level meta with site defaults — page values take precedence
	const finalMeta = $derived({
		title: meta.title || siteMeta.title,
		description: meta.description || siteMeta.description,
		keywords: meta.keywords || siteMeta.keywords,
		// og:url, twitter:url and canonical must be absolute and page-specific
		url: absolute(meta.url || siteMeta.url, siteMeta.url),
		// og:image must be an absolute URL — relative paths are not resolved by
		// most social crawlers
		image: absolute(meta.image || siteMeta.image, siteMeta.url),
		imageWidth: meta.imageWidth || siteMeta.imageWidth,
		imageHeight: meta.imageHeight || siteMeta.imageHeight
	});
</script>

<svelte:head>
	<title>{finalMeta.title}</title>
	<meta name="description" content={finalMeta.description} />
	<meta name="keywords" content={finalMeta.keywords} />
	<link rel="canonical" href={finalMeta.url} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={finalMeta.url} />
	<meta property="og:title" content={finalMeta.title} />
	<meta property="og:description" content={finalMeta.description} />
	<meta property="og:site_name" content={siteMeta.title} />
	<meta property="og:image" content={finalMeta.image} />
	{#if finalMeta.imageWidth}
		<meta property="og:image:width" content={finalMeta.imageWidth.toString()} />
	{/if}
	{#if finalMeta.imageHeight}
		<meta property="og:image:height" content={finalMeta.imageHeight.toString()} />
	{/if}
	{#if fediverseCreator}
		<meta name="fediverse:creator" content={fediverseCreator} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={finalMeta.url} />
	<meta name="twitter:title" content={finalMeta.title} />
	<meta name="twitter:description" content={finalMeta.description} />
	<meta name="twitter:image" content={finalMeta.image} />
</svelte:head>
