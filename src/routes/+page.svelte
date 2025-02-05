<script lang="ts">
	import '../output.css';
	import Result from '$lib/Result.svelte';
	type result = {
		index: number;
		str: string;
	};

	let query = '';
	let results: result[] = [];
	async function search() {
    collection: String = "TheHateYouGive"
    limit = 5
    const response = await fetch(`/api/search?query=${query}&collection=${collection}&limit=${limit}`);
    const data = await response.json();
    console.log("Output" + data.results)
	}
</script>

<form
	class="shadow-2xl border-2 focus:border-gray-950 rounded-3xl flex flex-row md:w-2/3 sm:w-full space-x-2 m-4 p-2"
>
	<input
		bind:value={query}
		on:submit={search}
		placeholder="Enter your quote..."
		class="m-auto outline-none active:border-none rounded-md p-2 flex-1"
	/>
	<button on:click={search}> submit </button>
</form>

{#each results as result}
	<Result content={result.str}/>
{/each}
