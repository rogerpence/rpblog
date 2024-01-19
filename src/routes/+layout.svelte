<header>
	<a href="/">Home</a>
	<a href="/posts">Posts</a>
	<a href="/posts-index">All posts</a>
	<a href="/api/posts" target="_blank">Get posts with API</a>
	<a href="/api/tags" target="_blank">Get tags with API</a>
</header>

<main>
	<slot />
</main>

<footer>My Footer</footer>

<style>
	header {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}
</style>
