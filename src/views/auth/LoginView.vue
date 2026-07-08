<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="form" lazy-validation>
              <v-text-field
                label="Username"
                name="username"
                prepend-inner-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="formValidated ? [(v) => !!v || 'Username is required'] : []"
                required
                outlined
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                type="password"
                v-model="password"
                :rules="formValidated ? [(v) => !!v || 'Password is required'] : []"
                required
                outlined
              ></v-text-field>

              <v-alert v-if="errorMessage" type="error" dense class="mt-3">
                {{ errorMessage }}
              </v-alert>

              <v-alert v-if="successMessage" type="success" dense class="mt-3">
                {{ successMessage }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              rounded
              depressed
              class="v-btn--soft px-6 font-weight-bold"
              @click="handleLogin"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-card-actions>
          <v-card-text>
            Sing up <router-link to="/resigter">here</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
      loading: false,
      formValidated: false,
    };
  },
  methods: {
    async handleLogin() {
      this.formValidated = true;
      this.$nextTick(async () => {
        if (!this.$refs.form.validate()) {
          return;
        }

        this.loading = true;
        this.errorMessage = "";
        this.successMessage = "";

        try {
          const response = await this.axios.post("/api/v1/login", {
            username: this.username,
            password: this.password,
          });

          console.log("Login Response:", response.data);

          if (response.data.token) {
            this.$cookies.set("token", response.data.token, "1h");
            localStorage.setItem("token", response.data.token);

            const userData = response.data.user || {
              username: this.username,
              role: "user",
            };
            localStorage.setItem("user", JSON.stringify(userData));
          }

          this.successMessage = "Login successful!";

          this.$router.push("/shop").catch((err) => {
            if (
              err.name !== "NavigationDuplicated" &&
              !err.message.includes("Redirected")
            ) {
              console.error(err);
            }
          });
        } catch (error) {
          console.error("Login API Error:", error);

          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage =
              "Login failed. Please check your credentials or API connection.";
          }
        } finally {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.v-btn--soft {
  background-color: rgba(91, 189, 213, 0.15) !important;
  color: #3da8c2 !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px;
  text-transform: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-btn--soft:hover {
  background-color: rgba(91, 189, 213, 0.25) !important;
  transform: translateY(-1px);
}

.v-btn--soft:active {
  transform: translateY(0);
}

.v-btn--soft::before {
  background-color: transparent !important;
}
</style>
