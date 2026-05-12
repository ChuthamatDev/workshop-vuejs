<template>
  <main>
    <header class="header-with-icon">
      <h1 class="display-1 font-weight-bold mb-4">Welcome to My Portfolio</h1>
      <h4>I am Chuthamat Buaban (Praew) - Frontend (Focus)</h4>
      <h4>INET Innovation Hub - Nakhon Ratchasima</h4>
    </header>
    <Hero />
    <aside class="hobbies-section">
      <div class="section-header">
        <img
          src="@/assets/icons8-pixel-heart-48.png"
          alt="heart"
          class="section-icon"
        />
        <h2 class="title font-weight-bold mb-2 mt-2">Hobbies</h2>
      </div>
      <ul class="hobby-list">
        <li>Reading a book (Fiction, Non-Fiction, Self-Development)</li>
        <li>Playing Guitar</li>
        <li>Drinking Coffee and Matcha</li>
      </ul>
    </aside>
    <article>
      <h4>Books recommanded</h4>
      <Hobbie />
    </article>
  </main>
</template>

<script>
import Hero from "@/components/Hero.vue";
import Hobbie from "@/components/Hobbie.vue";

export default {
  name: "hobbie",
  components: {
    Hero,
    Hobbie,
  },
};
</script>

<style></style>
