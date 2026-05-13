<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login Admin System</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLoginAdmin" ref="form">
              <v-text-field
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="[(v) => !!v || 'Username is required']"
                required
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :rules="[(v) => !!v || 'Password is required']"
                required
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
            <v-btn color="primary" @click="handleLoginAdmin" :loading="loading"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginAdminView",
  data() {
    return {
      username: "",
      password: "",
      role: "admin",
      errorMessage: "",
      successMessage: "",
      loading: false,
    };
  },
  methods: {
    async handleLoginAdmin() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const response = await this.axios.post("/login-admin", {
          username: this.username,
          password: this.password,
          role: "admin",
        });

        console.log("Login Admin Response:", response.data);

        // Store the token in both cookies and localStorage
        if (response.data.token) {
          this.$cookies.set("admin_token", response.data.token, "1d");
          localStorage.setItem("admin_token", response.data.token);
        }

        this.successMessage = "Login successful!";
        this.$router.push("/user");
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
    },
  },
};
</script>
