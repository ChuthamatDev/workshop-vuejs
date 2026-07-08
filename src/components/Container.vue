<template>
  <v-app>
    <v-app-bar app color="white" light flat class="app-navbar">
      <v-toolbar-title class="font-weight-bold navbar-title">
        POS & Shop System
      </v-toolbar-title>

      <v-spacer />

      <template v-if="isLoggedIn">
        <template v-if="userRole === 'admin'">
          <v-btn text to="/users" class="nav-btn">
            <v-icon left>mdi-account-group</v-icon> ผู้ใช้งาน
          </v-btn>
          <v-btn text to="/shop" class="nav-btn">
            <v-icon left>mdi-store</v-icon> สินค้า
          </v-btn>
          <v-btn text to="/orders" class="nav-btn">
            <v-icon left>mdi-receipt</v-icon> คำสั่งซื้อ
          </v-btn>
        </template>

        <template v-else>
          <v-btn text to="/shop" class="nav-btn">
            <v-icon left>mdi-food</v-icon> เมนูอาหาร
          </v-btn>
          <v-btn text to="/cart" class="nav-btn">
            <v-badge
              :content="cartItemCount"
              :value="cartItemCount > 0"
              color="indigo"
              overlap
            >
              <v-icon left>mdi-cart</v-icon>
            </v-badge>
            <span class="ml-2">ตะกร้าสินค้า</span>
          </v-btn>
        </template>
      </template>

      <template v-else>
        <v-btn text to="/login" class="nav-btn">Login</v-btn>
        <v-btn text to="/register" class="nav-btn">Register</v-btn>
      </template>

      <v-divider vertical class="mx-3 my-2" />

      <v-btn
        v-if="isLoggedIn"
        text
        class="logout-btn"
        @click="handleLogout"
      >
        <v-icon left>mdi-logout</v-icon> ออกจากระบบ
      </v-btn>
    </v-app-bar>

    <v-main class="app-main">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useCart } from "@/hooks/useCart";

export default {
  name: "ContainerView",
  setup() {
    const { cartItemCount } = useCart();
    return { cartItemCount };
  },
  data() {
    return {
      userRole: null,
      isLoggedIn: false,
    };
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    },
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      this.isLoggedIn = !!token;

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          this.userRole = user.role || null;
        } catch (e) {
          this.userRole = null;
        }
      } else {
        this.userRole = null;
      }
    },
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      this.isLoggedIn = false;
      this.userRole = null;
      this.$router.push("/login").catch(() => {});
    },
  },
};
</script>

<style scoped>
.app-navbar {
  border-bottom: 1px solid #e2e8f0 !important;
  background-color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02) !important;
}

.navbar-title {
  color: #1e293b !important;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
}

.nav-btn {
  color: #475569 !important;
  text-transform: none !important;
  letter-spacing: 0.3px !important;
  font-weight: 600 !important;
  transition: all 0.25s ease !important;
  border-radius: 8px !important;
  margin: 0 4px;
}

.nav-btn:hover {
  background-color: rgba(63, 81, 181, 0.06) !important;
  color: #3f51b5 !important;
}

.nav-btn.v-btn--active {
  background-color: rgba(63, 81, 181, 0.1) !important;
  color: #3f51b5 !important;
}

.logout-btn {
  color: #ef4444 !important;
  text-transform: none !important;
  letter-spacing: 0.3px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  transition: all 0.25s ease !important;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.06) !important;
}

.app-main {
  background-color: #f8fafc !important;
  min-height: 100vh;
}
</style>
