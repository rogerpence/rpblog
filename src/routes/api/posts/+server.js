import { json } from '@sveltejs/kit';
import { getQueryStringObject } from '$lib/utils.js';

async function getAllPosts() {
	let posts = [];

	const paths = import.meta.glob('/src/routes/markdown/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		// = /src/posts/appsettings.md

		// Get last element of split array and remove .md extension.
		const slug = path.split('/').at(-1)?.replace('.md', '');
		// = 'appsettings;

		// Fetch meta data and slug. No content fetched here.
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post = { ...metadata, slug };
			// console.log(post);
			!post.draft && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) =>
			new Date(second.datePublished).getTime() - new Date(first.datePublished).getTime()
	);

	return posts;
}

async function getFirstNPosts(posts, limit) {
	return posts.filter((i, index) => index < limit);
}

export async function GET(context) {
	//const qs = getQueryStringObject(context.url.searchParams);

	let posts = await getAllPosts();

	// if (qs.hasOwnProperty('limit')) {
	// 	posts = await getFirstNPosts(posts, qs.limit);
	// }

	return json(posts);
}
