<script lang="ts">
import '../app.css';
let query= $state("");
let searchType = $state("");
let result = $state([]);
const chunk_size: int = 10

async function search(){
  console.log("Search")
  if (searchType === "vector"){
    console.log("Vector Search")
    const collection: String = "TheHateYouGive"
    const limit: int = 5
    const response = await fetch(`/api/search/vector?query=${query}&collection=${collection}&limit=${limit}`);
    const data = await response.json();
  }
  if (searchType === "word"){
    console.log("Word Search")
    const collection: String = "TheHateYouGive"
    const limit : int = 5
    const response = await fetch(`/api/search/word?query=${query}&chunk_size=${chunk_size}&limit=${limit}`);
    result = await response.json();
  }
}
</script>

<main>
    <div>
        <select bind:value={searchType} class="search-type-dropdown">
        <option value="vector">Vector Search</option>
        <option value="word">Word Search</option>
      </select>
    </div>
    <div class="search-container">
        <input bind:value={query} type="text" placeholder="Search..." class="search-bar" />
        <button onclick={search} class="submit-button">Search</button>
    </div>
  <div class="mt-10 w-full overflow-y-auto">
    <p>Found {result.length} results</p>
		{#each result as { data, idx}}
        <p class="quote">"{data}"</p>
        <p class="page-number">Page: {idx}</p>
		{/each}
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
