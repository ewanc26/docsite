import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import type { Root } from 'mdast';

export interface TocEntry {
	level: number;
	text: string;
	id: string;
}

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeSlug)
	.use(rehypeStringify);

/** Render markdown to an HTML string with heading id attributes. */
export async function renderMarkdown(markdown: string): Promise<string> {
	const result = await processor.process(markdown);
	return String(result);
}

/** Extract h2/h3 headings from raw markdown for the table of contents. */
export function extractToc(markdown: string): TocEntry[] {
	const tree = unified().use(remarkParse).parse(markdown) as Root;
	const entries: TocEntry[] = [];

	for (const node of tree.children) {
		if (node.type !== 'heading' || node.depth < 2 || node.depth > 3) continue;
		const text = node.children
			.filter((c) => c.type === 'text' || c.type === 'inlineCode')
			.map((c) => ('value' in c ? c.value : ''))
			.join('');
		// Match github-slugger exactly (used by rehype-slug):
		// replace each whitespace char individually (no collapse), strip non-word chars
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s/g, '-');
		entries.push({ level: node.depth, text, id });
	}

	return entries;
}
