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
		let chunkSize = 100;
		console.log('searching...');
		results = [];
		let book = '';
		await fetch('/book.txt')
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Failed to fetch file: ${response.status}`);
				}
				return response.text();
			})
			.then((data) => {
				book = data;
			})
			.catch((error) => {
				console.error(error);
				book = 'Error loading file';
			});
		const indexes = [...book.matchAll(new RegExp(query, 'gi'))].map((a) => a.index);
		for (let index of indexes) {
			if (index - chunkSize < 0) {
				chunkSize = index;
			}
			if (index + chunkSize >= book.length) {
				chunkSize = book.length - 1 - index;
			}
			results = [
				...results,
				{
					index: index,
					str: book.substr(index - chunkSize, query.length + chunkSize * 2)
				}
			];
		}
		console.log(results);
		console.log(results.length);
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
