<script lang="ts">
    import { page } from "$app/state";
    import logo from '$lib/images/svelte-logo.svg';
    import github from '$lib/images/github.svg';
    import '$lib/style/landing.css'
</script>

<main>
    <section class="relative h-[100vh]"
             style="background-image: url('/landing/background.png'););
             background-size: cover;
             background-position: center;">
        <nav>
            <div class="corner">
                <a href="https://svelte.dev/docs/kit">
                    <img src={logo} alt="SvelteKit" />
                </a>
            </div>
            <ul>
                <li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
                    <a href="/">
                        Home</a>
                </li>
                <li aria-current={page.url.pathname === '/ai' ? 'page' : undefined}>
                    <a href="/ai">
                        Ask ai</a>
                </li>
                <li aria-current={page.url.pathname === '/learn' ? 'page' : undefined}>
                    <a href="/learn">Learn</a>
                </li>
                <li aria-current={page.url.pathname.startsWith('/resources') ? 'page' : undefined}>
                    <a href="/resources">Resources</a>
                </li>
            </ul>
            <div class="corner">
                <a href="https://github.com/sveltejs/kit">
                    <img src={github} alt="GitHub" />
                </a>
            </div>
        </nav>
    </section>
</main>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
  }

  .corner {
    width: 3em;
    height: 3em;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .corner img {
    width: 2em;
    height: 2em;
    object-fit: contain;
  }

  nav {
    display: flex;
    justify-content: center;
    --background: rgba(255, 255, 255, 0);
  }

  svg {
    width: 2em;
    height: 3em;
    display: block;
  }

  path {
    fill: var(--background);
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    --color-text: white;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li[aria-current='page']::before {
    --size: 10px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--color-theme-1);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 0.5rem;
    color: var(--color-text);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--color-theme-1);
  }
</style>