<script>
	// load content (dynamic images, etc)
    import Header from './Header.svelte'
    import Hero from '$lib/Landing/Hero.svelte';
    import About from '$lib/Landing/About.svelte';
    import Contribute from '$lib/Landing/Contribute.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
    <Header />
    <Hero />
    <About />
    <Contribute />
</main>


