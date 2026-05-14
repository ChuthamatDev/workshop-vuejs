<template>
  <div class="hobbies-container">
    <div class="book-item" v-for="(book, index) in books" :key="index">
      <img :src="book.image" :alt="book.name" class="book-cover" />
      <h4 class="book-title mt-2">{{ book.name }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hobbie",
  data() {
    return {
      books: [
        {
          name: "The Seven Husbands of Evely Hugo",
          image: require("@/assets/books/seven-husbands.jpg"),
        },
        {
          name: "The Atomic Habits",
          image: require("@/assets/books/atomic_habits.webp"),
        },
        {
          name: "The Psychology of Money",
          image: require("@/assets/books/psychology_of-money.jpg"),
        },
        {
          name: "101 Essays That will Change The Way You Think",
          image: require("@/assets/books/101_essays.jpg"),
        },
        {
          name: "Emotional First Aids",
          image: require("@/assets/books/emational_first.webp"),
        },
        {
          name: "A Gentle Reminder",
          image: require("@/assets/books/gentle_reminder.jpg"),
        },
        {
          name: "The Silent Patient",
          image: require("@/assets/books/slient_patient.jpg"),
        },
      ],
    };
  },
};
</script>

<style scoped>
.hobbies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.book-item {
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.book-item:hover {
  transform: scale(1.05);
}
.book-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.book-title {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin-top: 10px;
  line-height: 1.3;
}
</style>
