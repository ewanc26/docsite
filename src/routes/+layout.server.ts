import { listPosts } from '$lib/posts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({ posts: listPosts() });
