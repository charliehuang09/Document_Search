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
