export const prerender = true;

//import { readFileSync } from 'fs';

export const load = async ({ params }) => {
	// try {
	// 	const exists = fs.existsSync(`../../../../src/posts/${params.slug}.md`);
	// 	console.log(exists);
	// } catch {}
	//console.log(params);

	const post = await import(`../../markdown/posts/${params.slug}.md`);
	//console.log('post', post);

	// console.log(post.default);
	// console.log(post.metadata);

	// const component = await import(`../../../../src/posts/${data.post.meta.slug}.md`);

	//https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#preloading-page-data-server-side

	return {
		content: post.default,
		meta: post.metadata
	};
};
