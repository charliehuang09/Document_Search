<script lang="ts">
	import { goto } from '$app/navigation';

	async function login() {
		goto('/teacher');
	}
</script>

<button style="font-size: 1.2em; padding: 10px 20px;" on:click={login}> Teacher Login </button>
