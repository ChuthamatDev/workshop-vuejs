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
  max-width: 900px;
  margin: 40px auto;
}
</style>
