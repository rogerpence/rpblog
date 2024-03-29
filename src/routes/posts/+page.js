export const prerender = true;

export async function load({ fetch }) {
	const response = await fetch('api/posts?limit=3');
	//const response = await fetch('api/posts');
	const posts = await response.json();
	return { posts };
}
