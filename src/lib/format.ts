import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import type { Root } from 'mdast';

/**
 * Markdown rendering and table-of-contents extraction for documentation pages.
 */

export interface TocEntry {
	level: number;
	text: string;
	id: string;
}

// Unified pipeline renders markdown to HTML — rehype-slug adds id attributes
// to headings so the ToC can anchor-link into the prose
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

// ── Table of contents ──────────────────────────────────────────────────────

/** Extract h2/h3 headings from raw markdown for the table of contents. */
export function extractToc(markdown: string): TocEntry[] {
	const tree = unified().use(remarkParse).parse(markdown) as Root;
	const entries: TocEntry[] = [];
	// github-slugger de-duplicates repeated headings by suffixing an incrementing
	// counter (`foo`, `foo-1`, `foo-2`). rehype-slug does this in the rendered
	// HTML, so the ToC must do it too or repeated headings all anchor to the first.
	const occurrences = new Map<string, number>();

	for (const node of tree.children) {
		if (node.type !== 'heading' || node.depth < 2 || node.depth > 3) continue;
		const text = node.children
			.filter((c) => c.type === 'text' || c.type === 'inlineCode')
			.map((c) => ('value' in c ? c.value : ''))
			.join('');
		// Match github-slugger exactly (used by rehype-slug):
		// replace each whitespace char individually (no collapse), strip non-word chars
		const base = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s/g, '-');
		const seen = occurrences.get(base) ?? 0;
		occurrences.set(base, seen + 1);
		entries.push({ level: node.depth, text, id: seen === 0 ? base : `${base}-${seen}` });
	}

	return entries;
}
