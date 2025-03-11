<script lang="ts">
    import '../app.css';

    let query = '';
    let results: result[] = [];
    async function search() {
      const collection: String = "TheHateYouGive"
      const limit: int = 5
      const response = await fetch(`/api/search?query=${query}&collection=${collection}&limit=${limit}`);
      const data = await response.json();
      console.log("Output" + data.results)
    }
//     let query = '';
//     let results: result[] = [];
//     async function search() {
//         let chunkSize = 100;
//         console.log('searching...');
//         results = [];
//         let book = '';
//         await fetch('/book.txt')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch file: ${response.status}`);
//                 }
//                 return response.text();
//             })
//             .then((data) => {
//                 book = data;
//             })
//             .catch((error) => {
//                 console.error(error);
//                 book = 'Error loading file';
//             });
//         const indexes = [...book.matchAll(new RegExp(query, 'gi'))].map((a) => a.index);
//         for (let index of indexes) {
//             if (index - chunkSize < 0) {
//                 chunkSize = index;
//             }
//             if (index + chunkSize >= book.length) {
//                 chunkSize = book.length - 1 - index;
//             }
//             results = [
//                 ...results,
//                 {
//                     index: index,
//                     str: book.substr(index - chunkSize, query.length + chunkSize * 2)
//                 }
//             ];
//         }
//         console.log(results);
//         console.log(results.length);
//     }
</script>


<main>
    <div class="search-container">
        <input type="text" placeholder="Search..." class="search-bar" />
        <button on:click={search} class="submit-button">Search</button>
    </div>
    <slot />
</main>


<style>
    nav {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
    }


    .nav-button {
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: #333;
        margin: 0 0.5rem;
    }


    .right {
        display: flex;
        gap: 1rem;
    }


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
