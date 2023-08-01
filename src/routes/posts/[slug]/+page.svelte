<script>
	import { page } from '$app/stores';

	export let data;
	// console.log(data);
</script>

<article>
	<header>
		<h1>{data.meta.title}</h1>
	</header>
	<!-- render the post -->
	<div>
		<svelte:component this={data.content} />
	</div>
</article>
