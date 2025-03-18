<script lang="ts">
import '../app.css';
import type { Result } from '$lib/index'
let query= $state("");

async function search(){
  const type = "word"
  if (type === "vector"){
    const collection: String = "TheHateYouGive"
    const limit: int = 5
    const response = await fetch(`/api/search/vector?query=${query}&collection=${collection}&limit=${limit}`);
    const data : Result[] = await response.json() as Result[];
  }
  if (type === "word"){
    const collection: String = "TheHateYouGive"
    const chunk_size: int = 100
    const limit : int = 5
    const response = await fetch(`/api/search/word?query=${query}&chunk_size=${chunk_size}&limit=${limit}`);
    const data : Result[] = await response.json() as Result[];
  }
}
</script>

<main>
    <div class="search-container">
        <input bind:value={query} type="text" placeholder="Search..." class="search-bar" />
        <button onclick={search} class="submit-button">Search</button>
    </div>
</main>

<style>
    .search-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        gap: 0.5rem;
    }


    .search-bar {
        width: 50%;
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 25px;
        font-size: 1rem;
    }


    .submit-button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 25px;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
    }


    .submit-button:hover {
        background-color: #45a049;
    }
</style>
