<script lang="js">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	export let data;
</script>

<h1>Home Page</h1>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href="/posts/{post.slug}" class="title">{post.title}</a>
				<p class="date">{formatDate(post.datePublished)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>
