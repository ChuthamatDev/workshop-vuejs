<template>
  <div>
    <Cards />
  </div>
</template>

<script>
import Cards from "./Cards.vue";
export default {
  name: "ProfileContent",
  components: {
    Cards,
  },
};
</script>

<style>
.header-with-icon {
  margin-bottom: 20px;
}

.header-with-icon h4 {
  font-weight: 400;
  font-size: medium;
}
</style>
