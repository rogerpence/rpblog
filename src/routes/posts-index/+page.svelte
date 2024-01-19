<script lang="js">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	export let data;
</script>

<h1>Home Page</h1>

<p>
	This page is intended not for human eyeballs, but rather to surface all dynamic markdown document
	links to the Svelte build process so that the pages are prendered to HTML.
</p>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href="/posts/{post.slug}" class="title">{post.title}</a>
			</li>
		{/each}
	</ul>
</section>
