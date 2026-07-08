<template>
  <v-container class="fill-height auth-page" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="auth-card pa-8 pa-md-10" elevation="2">
          <!-- Auth Header -->
          <div class="text-center mb-8">
            <div class="auth-logo mb-4">
              <v-icon color="indigo" large>mdi-account-plus-outline</v-icon>
            </div>
            <h2 class="auth-title font-weight-black mb-1">Create Account</h2>
            <p class="auth-subtitle">Sign up for a new customer account.</p>
          </div>

          <v-card-text class="pa-0">
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

              <v-btn
                depressed
                block
                large
                rounded
                color="indigo"
                class="auth-btn white--text font-weight-bold mt-4"
                @click="handleRegister"
                :loading="loading"
              >
                Register
              </v-btn>
            </v-form>
          </v-card-text>

          <div class="text-center mt-6">
            <span class="grey--text text--darken-1"
              >Already have an account?</span
            >
            <router-link to="/login" class="auth-link ml-1"
              >Sign in here</router-link
            >
          </div>
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
.auth-page {
  background-color: #f8fafc !important;
}

.auth-card {
  border-radius: 16px !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02) !important;
}

.auth-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: rgba(63, 81, 181, 0.08);
  border-radius: 50%;
}

.auth-title {
  font-size: 1.75rem;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.auth-subtitle {
  font-size: 0.95rem;
  color: #64748b;
}

.auth-btn {
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  border-radius: 28px !important;
  font-size: 1.05rem !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 12px rgba(63, 81, 181, 0.15) !important;
}

.auth-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(63, 81, 181, 0.25) !important;
}

.auth-btn:active {
  transform: translateY(0);
}

.auth-link {
  color: #3f51b5 !important;
  text-decoration: none;
  font-weight: 600;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>
