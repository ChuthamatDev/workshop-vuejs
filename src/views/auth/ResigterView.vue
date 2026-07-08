<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleRegister" ref="form" lazy-validation>
              <v-text-field
                label="Username"
                name="username"
                prepend-inner-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="
                  formValidated ? [(v) => !!v || 'Username is required'] : []
                "
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
                :rules="
                  formValidated ? [(v) => !!v || 'Password is required'] : []
                "
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
              @click="handleRegister"
              :loading="loading"
            >
              Register
            </v-btn>
          </v-card-actions>
          <v-card-text>
            back <router-link to="/login">to sign in page</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ResigterView",
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
    async handleRegister() {
      this.formValidated = true;
      this.$nextTick(async () => {
        if (!this.$refs.form.validate()) {
          return;
        }

        this.loading = true;
        this.errorMessage = "";
        this.successMessage = "";

        try {
          const response = await this.axios.post("/api/v1/register", {
            username: this.username,
            password: this.password,
          });

          if (response.status === 201) {
            this.successMessage = "Register successful!";
            setTimeout(() => {
              this.$router.push({ name: "login" }).catch(() => {});
            }, 3000);
          }
        } catch (error) {
          console.error("Register API Error:", error);

          if (error.response?.data?.message) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage =
              "Register failed. Please check your connection.";
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
