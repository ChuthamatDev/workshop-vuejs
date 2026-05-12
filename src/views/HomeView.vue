<template>
	<main class="hero-section">
		<header>
			<h1 class="display-1 font-weight-bold mb-4">Welcome to My Portfolio</h1>
			<h4>I am Chuthamat Buaban (Praew) - Frontend (Focus)</h4>
			<h4 class="subheading font-weight-bold mb-4">INET Innovation Hub - Nakhon Ratchasima</h4>
		</header>
		<hero />
		<aside class="education-section">
			<h2 class="title font-weight-bold mb-2">Education</h2>
			<ul>
				<li>Bachelor of Engineering in Electrical Engineering | Major: Power and Electronics</li>
				<li>Ubon Ratchathani University, Thailand</li>
			</ul>
		</aside>
		<aside>
			<h2 class="title font-weight-bold mb-2 mt-2">Hobbies</h2>
			<ul class="hobby-list">
				<li>Reading a book (Fiction, Non-Fiction, Self-Development)</li>
				<li>Playing Guitar</li>
				<li>Drinking Coffee and Matcha</li>
			</ul>
		</aside>
		<article>
			<hobbie/>
		</article>
		<section class="mt-2">
			<h2>Like</h2>
			<ul>
				<li>Flower - Lily</li>
				<li>Nature green forest</li>
				<li>Cat</li>
				<li>Dog</li>
			</ul>
		</section>
	</main>
</template>

<script>
	import Hero from '@/components/Hero.vue';
	import Hobbie from '@/components/Hobbie.vue';
	export default {
		name: 'Home',
		components: {
			Hero,
			Hobbie
		},
	}
</script>

<style>
	.hero-section {
		text-align: left;
		max-width: 900px;
		margin: 50px auto;
		padding: 50px 20px;
	}
</style>