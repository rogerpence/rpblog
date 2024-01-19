<script>
	import Test from '$lib/Test.md';
	import CallOut from '$lib/CallOut.svelte';
</script>

<p>
	This Sveltekit spike hows how to process Markdown posts with Sveltekit and mdsvex. See the Posts
	page for more info.
</p>

<p>It also shows a little bit of cool Svelte component capabilities. See below for more info.</p>

<h2>Import HTML with a Svelte component</h2>

<p>"Hello, dere" appears becuase the Callout.svelte component is imported.</p>

<CallOut heading="Hello, dere" />

<h2>Import Markdown as a Svelte component</h2>

<p>This shows how a markdown file can be included as a component.</p>

<blockquote>
	Svelete can't import Markdown directly, but the mdsvex plugin easily enables that. See the "Fetch
	a markdown post with mdsvex" post for more on mdsvex.
</blockquote>

<div class="component-example">
	<Test />
</div>

<p>This page includes this code:</p>

<pre>
&lt;script&gt;
    import Test from '$lib/Test.md';
&lt;/script&gt;
</pre>

<p>
	which enables it to use that Markdown file as a component and inject as needed with the Type tag
	as shown below to product the output immediately above in the red box.
</p>

<pre>
&lt;Type&gt;
</pre>

<p>The Test.md component contents are:</p>

<pre>
    &lt;script&gt;
        import Nested from './Nested.md'
    &lt;/script&gt;

    ### Hello world

    &lt;Nested /&gt;

    This is text
    
    * Monday
    * Tuesday
    * Wednesday
    
    [rogerpence](rogerpence.dev)    
</pre>

<p>
	Note that Svelte component import can be nested (event with Markdown components). Svelte also Very
	cool, huh?
</p>

<style>
	.component-example {
		border: 1px solid red;
		margin-bottom: 1rem;
	}
</style>
