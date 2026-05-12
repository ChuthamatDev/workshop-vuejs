<template>
    <main class="hero-section">
        <header>
			<h1 class="display-1 font-weight-bold mb-4">Welcome to My Portfolio</h1>
        <h3 class="headline font-weight-bold mb-4">69198 - Chuthamat Buaban (Praew)</h3>
        <h4 class="subheading font-weight-bold mb-4">INET Innovation Hub - Nakhon Ratchasima</h4>
		</header>
        <hero />
		<aside class="education-section">
			<h2 class="title font-weight-bold mb-4">Education</h2>
			<ul>
				<li>Bachelor of Engineering in Electrical Engineering | Major: Power and Electronics</li>
				<li>Ubon Ratchathani University, Thailand | June 2021 - July 2025 </li>
			</ul>
		</aside>
		<aside>
			<h2 class="title font-weight-bold mb-2 mt-2">Hobbies</h2>
			<ul>
				<li>Reading a book (Fiction, Non-Fiction, Self-Development)</li>
				<li>Playing Guitar</li>
				<li>Drinking Coffee and Matcha</li>
			</ul>
		</aside>
		<aside>

		</aside>
    </main>
</template>

<script>
  import Hero from '@/components/Hero.vue';
  export default {
    name: 'Home',
    components: {
      Hero
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