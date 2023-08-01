import { json } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { compile } from 'mdsvex';

async function getPost(slug) {
	const path = `./src/posts/${slug}.md`;
	const md = readFileSync(path, 'utf8');
	//const compiledMd = await compile(md);
	//    console.log(`--->${JSON.stringify(compiledMd, null, 2)}`);
	//console.log(Object.keys(compiledMd));
	//const content = compiledMd.code;
	//console.log(content);

	const post = await import(`../../../../src/posts/${slug}.md`);

	return {
		content: post.default,
		meta: post.metadata
	};
}

export async function GET(context) {
	const slug = context.url.searchParams.get('slug');
	const post = await getPost(slug);
	return json(post);
}
