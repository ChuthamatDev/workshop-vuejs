<!-- <template>
  <div class="api-page">
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

      <div class="save-cookie mb-4 mt-4">
        <v-btn @click="setLocalStorage()">login</v-btn>
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
      localStorage.setItem("email", this.email);
      this.$cookies.set("email", this.email, "60s");
      this.$store.commit("setEmail", this.email);
    },
    removeLocalStorage() {
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
</style> -->
