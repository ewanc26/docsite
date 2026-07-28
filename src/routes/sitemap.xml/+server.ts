import { PUBLIC_SITE_URL } from '$env/static/public';
import { listPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

// Prerendered alongside the rest of the site — no runtime server involved.
export const prerender = true;

/** Escape the five XML predefined entities. */
function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/** Emit a sitemap covering the homepage, the index, and every published doc. */
export const GET: RequestHandler = () => {
	const origin = PUBLIC_SITE_URL.replace(/\/$/, '');
	const posts = listPosts();

	const urls = [
		{ path: '/', priority: '1.0' },
		{ path: '/projects', priority: '0.8' },
		...posts.map((post) => ({
			path: `/projects/${post.slug}`,
			lastmod: post.date || undefined,
			priority: '0.6'
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ path, priority, ...rest }) =>
			`	<url>
		<loc>${escapeXml(origin + path)}</loc>
${'lastmod' in rest && rest.lastmod ? `		<lastmod>${escapeXml(rest.lastmod)}</lastmod>\n` : ''}		<priority>${priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml' }
	});
};
