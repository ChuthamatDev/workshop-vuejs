<template>
  <v-container class="py-6 px-4" fluid>
    <v-row>
      <!-- Left Column: Profile Card -->
      <v-col cols="12" md="4" class="mb-6 mb-md-0">
        <cards />
      </v-col>

      <!-- Right Column: Personal Sections -->
      <v-col cols="12" md="8">
        <!-- Hobbies Section Card -->
        <v-card class="hobbies-card pa-6 mb-6" elevation="2">
          <div class="section-header">
            <img
              src="@/assets/icons8-pixel-heart-48.png"
              alt="heart"
              class="section-icon"
            />
            <h2 class="section-title font-weight-bold">Hobbies</h2>
          </div>
          <ul class="hobby-list">
            <li>Reading a book (Fiction, Non-Fiction, Self-Development)</li>
            <li>Playing Guitar</li>
            <li>Drinking Coffee and Matcha</li>
          </ul>
        </v-card>

        <!-- Recommended Books Card -->
        <v-card class="books-card pa-6 mb-6" elevation="2">
          <div class="section-header">
            <img
              src="@/assets/icons8-pixel-star-40.png"
              alt="star"
              class="section-icon"
            />
            <h2 class="section-title font-weight-bold">Books Recommended</h2>
          </div>
          <hobbie />
        </v-card>

        <!-- Likes & Dislikes Grid -->
        <v-row>
          <!-- Likes Card -->
          <v-col cols="12" sm="6">
            <v-card class="likes-card pa-6 h-100" elevation="2">
              <div class="section-header">
                <img
                  src="@/assets/icons8-pixel-cat-48.png"
                  alt="cat"
                  class="section-icon"
                />
                <h3 class="section-title font-weight-bold">Things I Like</h3>
              </div>
              <ul class="likes-list">
                <li>Flower - Lily</li>
                <li>Nature green forest</li>
                <li>Cat, Dog</li>
              </ul>
            </v-card>
          </v-col>

          <!-- Dislikes Card -->
          <v-col cols="12" sm="6">
            <v-card class="dislikes-card pa-6 h-100" elevation="2">
              <div class="section-header">
                <v-icon color="deep-orange lighten-1" class="section-icon mr-2" large>
                  mdi-close-circle-outline
                </v-icon>
                <h3 class="section-title font-weight-bold">Don't Like</h3>
              </div>
              <ul class="dislikes-list">
                <li>Soy milk</li>
                <li>Snake, gecko</li>
              </ul>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-icon {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.section-title {
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
}

/* Card Styles */
.hobbies-card {
  background-color: #fff9fb !important;
  border-left: 6px solid #ffb2d9 !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.books-card {
  background-color: #ffffff !important;
  border-left: 6px solid #ffd54f !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.likes-card {
  background-color: #f0faff !important;
  border-left: 6px solid #81d4fa !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dislikes-card {
  background-color: #fffbfa !important;
  border-left: 6px solid #ffab91 !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effect on cards */
.hobbies-card:hover,
.books-card:hover,
.likes-card:hover,
.dislikes-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Lists styling */
ul {
  list-style-type: none;
  padding-left: 0 !important;
  margin-top: 10px;
}

li {
  display: flex;
  align-items: center;
  margin: 12px 0;
  font-size: 1.05rem;
  color: #37474f;
}

.hobby-list li::before {
  content: "✦";
  color: #ff80ab;
  font-weight: bold;
  margin-right: 12px;
  font-size: 1.1rem;
}

.likes-list li::before {
  content: "❤";
  color: #29b6f6;
  margin-right: 12px;
  font-size: 1rem;
}

.dislikes-list li::before {
  content: "✕";
  color: #ff7043;
  font-weight: bold;
  margin-right: 12px;
  font-size: 1rem;
}
</style>
