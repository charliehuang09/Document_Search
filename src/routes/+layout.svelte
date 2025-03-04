<script lang="ts">
    import '../app.css';
</script>


<header>
    <nav class="navbar">
        <div class="logo">
            <h1>DocSearch</h1>
        </div>
        <div class="nav-links">
            <a href="/" class="nav-item">Home</a>
            <a href="/teacher" class="nav-item">Teacher Portal</a>
        </div>
    </nav>
</header>


<main>
    <slot />
</main>


<footer>
    <p>© 2024 DocSearch. All rights reserved.</p>
</footer>






<!-- <style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #2563eb;
        color: white;
    }


    .logo h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
    }


    .nav-links {
        display: flex;
        gap: 2rem;
    }


    .nav-item {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s;
    }


    .nav-item:hover {
        background-color: #1d4ed8;
    }


    main {
        min-height: calc(100vh - 160px);
        padding: 2rem;
    }


    footer {
        text-align: center;
        padding: 1rem;
        background-color: #f3f4f6;
    }
</style> -->
