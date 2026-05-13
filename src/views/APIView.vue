<template>
  <div class="api-page">
    <!-- <div class="content">This is API page</div>
    <div class="display-data" v-if="show">{{ data }}</div>
    <div class="map-data">
      <ul>
        <li v-for="(item, index) in message" :key="index">
          {{ item.data }}
        </li>
      </ul>
    </div>
    <div class="button mt-4 mb-4">
      <v-btn @click="display()" color="primary">View More</v-btn>
    </div> -->
    <div class="v-model-content mt-4">
      <v-flex xs6>
        <v-text-field
          label="Email"
          v-model="email"
          prepend-icon="mdi-email"
          id="email"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          id="password"
        ></v-text-field>
      </v-flex>
      <v-btn @click="signin()"> Submit </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "api",
  // data: () => ({
  //   data: "Login",
  //   show: false,
  //   message: [{ data: "Foo" }, { data: "Bar" }],
  // }),
  // methods: {
  //   display() {
  //     alert("This is Alert function");
  //   },
  // },
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signin() {
      console.log(this.email);
    },
  },
};
</script>

<style></style>
