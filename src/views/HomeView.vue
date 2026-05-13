<template>
  <main>
    <cards />
    <div class="hobbies-section">
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
    </div>
    <div>
      <h4>Books recommanded</h4>
      <hobbie />
    </div>
    <section class="mt-6 likes-section">
      <div class="section-header">
        <img
          src="@/assets/icons8-pixel-cat-48.png"
          alt="cat"
          class="section-icon"
        />
        <h4>Things I Like</h4>
      </div>
      <ul>
        <li>Flower - Lily</li>
        <li>Nature green forest</li>
        <li>Cat, Dog</li>
      </ul>
    </section>
    <section class="dislikes-section">
      <h4>Don't Like</h4>
      <ul>
        <li>Soy milk</li>
        <li>Sneak</li>
      </ul>
    </section>
  </main>
</template>

<script>
import Cards from "@/components/Cards.vue";
import Hobbie from "@/components/Hobbie.vue";

export default {
  name: "Home",
  components: {
    Hobbie,
    Cards,
  },
};
</script>

<style scoped>
.header-icon {
  width: 48px;
  height: 48px;
  animation: float 3s ease-in-out infinite;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.section-icon {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.hobbies-section {
  margin: 30px 0;
  padding: 20px;
  background-color: rgba(249, 178, 215, 0.15);
  border-radius: 8px;
  border-left: 4px solid #f9b2d7;
}

.likes-section {
  margin: 30px 0;
  padding: 20px;
  background-color: rgba(207, 236, 243, 0.15);
  border-radius: 8px;
  border-left: 4px solid #cfecf3;
}

.dislikes-section {
  margin: 30px 0;
  padding: 20px;
  background-color: rgba(246, 255, 220, 0.2);
  border-radius: 8px;
  border-left: 4px solid #f6ffdc;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.title {
  margin: 0;
}

ul {
  list-style-position: inside;
  line-height: 1.8;
}

li {
  margin: 8px 0;
}
</style>
