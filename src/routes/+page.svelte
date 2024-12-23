<script lang="ts">
	import { goto } from '$app/navigation';

	async function login() {
		goto('/teacher');
	}

	export let placeholder = 'Search...';
	export let query = '';
  async function search(){
    console.log(query);
		const response = await fetch('api/search', {
			method: 'POST',
			body: JSON.stringify({
				query: "query"
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

  };
</script>

<input type="text" {placeholder} bind:value={query} on:input={() => search()} />
<button style="font-size: 1.2em; padding: 10px 20px;" on:click={login}> Teacher Login </button>
