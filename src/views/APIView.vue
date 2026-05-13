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
    <h4>Workshop 3</h4>
    <div class="v-model-content mt-4">
      <v-flex xs>
        <v-text-field
          label="Email"
          v-model="email"
          prepend-icon="mdi-email"
          id="email"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs>
        <v-text-field
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          id="password"
        ></v-text-field>
      </v-flex>
      <!-- <v-btn @click="signin()"> Submit </v-btn> -->

      <div class="save-cookie mb-4 mt-4">
        <v-btn @click="setLocalStorage()">login</v-btn>
        <!-- <v-btn @click="removeLocalStorage()">Delete</v-btn> -->
      </div>
      <div class="show-email">
        <send_dialog :send_dialog="data_send_props" />
      </div>
    </div>
  </div>
</template>

<script>
import send_dialog from "../components/SimpleCom.vue";

export default {
  name: "api",
  data: () => {
    return {
      email: "",
      password: "",
      data: "Login",
      show: false,
      message: [{ data: "Foo" }, { data: "Bar" }],
      data_send_props: "send value from simple",
    };
  },
  methods: {
    display() {
      alert("This is Alert function");
    },
    signin() {
      console.log(this.email);
    },
    setLocalStorage() {
      // save localstorage
      localStorage.setItem("email", this.email);
      this.$cookies.set("email", this.email, "60s");
      this.$store.commit("setEmail", this.email);
    },
    removeLocalStorage() {
      // delete localstorage
      localStorage.removeItem("email");
      this.$store.commit("setEmail", "");
    },
    sendData() {
      this.show = true;
    },
  },
  watch: {
    email(value) {
      this.$store.commit("setEmail", value);
    },
  },
  created() {
    // get localstorage or cookie email
    const savedEmail =
      localStorage.getItem("email") || this.$cookies.get("email");
    if (savedEmail) {
      this.email = savedEmail;
      this.$store.commit("setEmail", savedEmail);
    }
  },
  components: { send_dialog },
};
</script>

<style>
.save-cookie {
  display: flex;
  justify-content: space-between;
}
</style>
