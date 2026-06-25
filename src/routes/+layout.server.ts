import { listPosts } from '$lib/posts';
import type { LayoutServerLoad } from './$types';

/**
 * Root server load: provides the post list to the sidebar and fediverse metadata
 * for the `<meta name="fediverse:creator">` tag.
 */
export const load: LayoutServerLoad = () => ({
	posts: listPosts(),
	apInstanceUrl: process.env.PUBLIC_AP_INSTANCE_URL ?? null,
	apUsername: process.env.PUBLIC_AP_USERNAME ?? null
});
