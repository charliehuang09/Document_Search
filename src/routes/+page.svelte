<script lang="ts">
	import '../output.css';

	export let query = '';
	async function search() {
		console.log(query);
		const response = await fetch('api/search', {
			method: 'POST',
			body: JSON.stringify({
				query: 'query'
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<form
	class="shadow-2xl border-2 focus:border-gray-950 rounded-3xl flex flex-row md:w-2/3 sm:w-full space-x-2 m-4 p-2"
>
	<input
		bind:value={query}
		on:submit={search}
		placeholder="Enter your message..."
		class="m-auto outline-none active:border-none rounded-md p-2 flex-1"
	/>
	<button on:click={search}> </button>

	<button on:click={search}> </button>
</form>

