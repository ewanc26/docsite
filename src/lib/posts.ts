import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

export interface PostMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	draft: boolean;
}

export interface Post extends PostMeta {
	content: string;
}

const POSTS_DIR = resolve('src/content/documentation');

function toISODate(raw: unknown): string {
	if (!raw) return '';
	if (raw instanceof Date) return raw.toISOString().slice(0, 10);
	return String(raw).slice(0, 10);
}

function slugFrom(filename: string) {
	return filename.replace(/\.mdx?$/, '');
}

export function listPosts(): PostMeta[] {
	return readdirSync(POSTS_DIR)
		.filter((f) => /\.mdx?$/.test(f))
		.map((filename) => {
			const raw = readFileSync(`${POSTS_DIR}/${filename}`, 'utf-8');
			const { data } = matter(raw);
			return {
				slug: slugFrom(filename),
				title: data.title ?? slugFrom(filename),
				description: data.description ?? '',
				date: toISODate(data.date),
				tags: data.tags ?? [],
				draft: data.draft ?? false
			};
		})
		.filter((p) => !p.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post {
	const raw = readFileSync(`${POSTS_DIR}/${slug}.md`, 'utf-8');
	const { data, content } = matter(raw);
	return {
		slug,
		title: data.title ?? slug,
		description: data.description ?? '',
		date: toISODate(data.date),
		tags: data.tags ?? [],
		draft: data.draft ?? false,
		content
	};
}
