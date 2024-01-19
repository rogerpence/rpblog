import { json } from '@sveltejs/kit';

async function getAllTags() {
	let tags = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug };
			console.log(file.metadata.tags);
			tags = [...tags, ...file.metadata.tags];
		}
	}

	const uniqueTags = [...new Set(tags)].sort();

	const result = [
		...uniqueTags.map((item) => {
			return { tag: item, count: 0 };
		})
	];

	for (const tag of tags) {
		result.find((obj) => obj.tag == tag).count++;
	}

	return result;
}

export async function GET(context) {
	let tags = await getAllTags();

	return json(tags);
}
