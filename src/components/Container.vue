<template>
  <div class="hero-section">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Container",
};
</script>

<style>
.hero-section {
  text-align: left;
  max-width: 800px;
  margin: 50px auto;
}
</style>
