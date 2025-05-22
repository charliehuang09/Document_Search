<script lang="ts">
import '../app.css';
let query= $state("");
let searchType = $state("");
let results = $state([]);
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
    results = await response.json();
  }
}

</script>
<main>
  <header>
    <h1>Quote Searcher</h1>
  </header>

        <select bind:value={searchType} class="search-type-dropdown">
        <option value="vector">Vector Search</option>
        <option value="word">Word Search</option>
      </select>

  <section class="search-and-results-section">
    <div class="search-container">
      <input bind:value={query} type="text" placeholder="Search..." class="search-bar" />
      <button onclick={search} class="submit-button">Search</button>
    </div>

  <div class="results-box">
    {#if results.length}
      {#each results as result}
          <p class = "quote">"{result.data}"</p>
          <p class="page-number">Page; {result.idx}</p>
      {/each}
    {:else}
      <p>No results found{#if query} for &quot;{query}&quot;{/if}.</p>
    {/if}
  </div>
  </section>
</main>


<style>
  /* CSS Variables for easy theme adjustments */
  :root {
    --primary-bg-color: #f0f0f0;  
    --box-bg-color: #d3d3d3;    
    --text-color: #333;
    --header-height: 80px;      
    --padding-sides: 50px;      
    --link-color: #007bff;      
  }

  /* Global body styling */
  body {
    margin: 0;
    font-family: sans-serif;
    background-color: var(--primary-bg-color); }
  /* Main container for the entire page content */
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    align-items: center; 
    width: 100%; 
  }

  /* Header spacing, with home, quotesearcher, teacher portal) */
  header {
    width: 100%;
    height: var(--header-height);
    display: flex;
    justify-content: space-between; /* Distributes items evenly across the header */
    align-items: center; /* Vertically aligns items in the header */
    padding: 0 var(--padding-sides);
    box-sizing: border-box; /* Includes padding in the element's total width */
    color: var(--text-color);
  }

  /*bigger font size for title */
  header h1 {
    margin: 0;
    font-size: 2em;
  }

  /* Container for the links */
  .nav-link-container {
    display: flex;
    align-items: center;
  }

  /* Styling for individual  links */
  .nav-link {
    font-size: 1.2em;
    color: var(--link-color);
    text-decoration: none; /* Removes underline*/
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.2s ease, text-decoration 0.2s ease; 
  }

  .nav-link:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  /* Section containing both the search bar and results box */
  .search-and-results-section {
    width: calc(100% - (10 * var(--padding-sides))); /* Calculates width with side padding */
    display: flex;
    flex-direction: column; /* Stacks search and results vertically */
    gap: 20px; /* Space between the search container and results box */
    margin-bottom: 20px; /* Space below this section */
  }

  /* Container for the search input and button */
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem; /* Space between input and button */
  }

  /*  search input field */
  .search-bar {
    flex-grow: 1; /* Allows the input to take available space */
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 1rem;
    background-color: var(--box-bg-color);
    color: var(--text-color);
  }

  /* placeholder text inside the search bar */
  .search-bar::placeholder {
    color: var(--text-color);
    opacity: 0.7;
  }

  /* search button */
  .submit-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 25px;
    background-color: #4caf50; /* Green background */
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease; /*hover effect*/

  }

  .submit-button:hover {
    background-color: #45a049; /* Darker green on hover */
  }

  /* results display box */
  .results-box {
    background-color: var(--box-bg-color);
    padding: 20px;
    min-height: 300px; /* min height for the box */
    border-radius: 5px;
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Aligns content to the top when results appear */
    text-align: center; /* Centers text horizontally */
  }

  /* "Search Results:" heading */
  .results-box h2 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-color);
  }

  /* list of results */
  .results-box ul {
    list-style: none; /* Removes default bullet points */
    padding: 0;
    width: 100%; /* Ensures list takes full width of its parent */
    text-align: left; /* Aligns list items' text to the left */
  }

  /* individual result list items */
  .results-box li {
    background-color: rgba(0, 0, 0, 0.05); /* Subtle background for readability */
    margin-bottom: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer; /* Indicates the item is clickable */
  }

  /* Styling for the quote text within a result item */
  .results-box li p {
    margin: 0;
    font-size: 1.1em;
  }

  /* Styling for the page number text within a result item */
  .results-box li small {
    display: block; /* Puts page number on a new line */
    margin-top: 5px;
    font-size: 0.8em;
    color: #666;
  }
</style>
