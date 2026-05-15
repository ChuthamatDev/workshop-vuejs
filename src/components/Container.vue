<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="font-weight-bold">
        POS & Shop System
      </v-toolbar-title>

      <v-spacer />

      <template v-if="isLoggedIn">
        <template v-if="userRole === 'admin'">
          <v-btn text to="/users">
            <v-icon left>mdi-account-group</v-icon> ผู้ใช้งาน
          </v-btn>
          <v-btn text to="/shop">
            <v-icon left>mdi-store</v-icon> สินค้า
          </v-btn>
          <v-btn text to="/orders">
            <v-icon left>mdi-receipt</v-icon> คำสั่งซื้อ
          </v-btn>
        </template>

        <template v-else>
          <v-btn text to="/shop">
            <v-icon left>mdi-food</v-icon> เมนูอาหาร
          </v-btn>
          <v-btn text to="/cart">
            <v-badge
              :content="cartItemCount"
              :value="cartItemCount > 0"
              color="red"
              overlap
            >
              <v-icon left>mdi-cart</v-icon>
            </v-badge>
            <span class="ml-2">ตะกร้าสินค้า</span>
          </v-btn>
        </template>
      </template>

      <template v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </template>

      <v-divider vertical class="mx-3 my-2" />

      <v-btn
        v-if="isLoggedIn"
        text
        color="red lighten-10"
        @click="handleLogout"
      >
        <v-icon left>mdi-logout</v-icon> ออกจากระบบ
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useCart } from "@/composables/useCart";

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
