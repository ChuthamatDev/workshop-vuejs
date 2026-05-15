<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h4 font-weight-bold">ตะกร้าสินค้าของคุณ</h2>
    </div>

    <v-row v-if="cartItems.length > 0">
      <v-col cols="12" md="8">
        <v-card outlined class="mb-4">
          <v-list>
            <div v-for="(item, index) in cartItems" :key="item.productId">
              <v-list-item>
                <v-list-item-avatar rounded size="80" class="mr-4">
                  <v-img :src="getImageUrl(item.image)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="text-h6 font-weight-bold">
                    {{ item.productName }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="green--text font-weight-bold">
                    ฿{{ item.price.toLocaleString() }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action class="d-flex flex-row align-center">
                  <v-btn icon small @click="updateQuantity(item.productId, -1)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-3 font-weight-bold">{{ item.quantity }}</span>
                  <v-btn icon small @click="updateQuantity(item.productId, 1)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    color="red"
                    class="ml-4"
                    @click="removeFromCart(item.productId)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="index < cartItems.length - 1"
                :key="'div-' + index"
              ></v-divider>
            </div>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card outlined class="pa-5 bg-grey-lighten-4">
          <h3 class="text-h6 mb-4">สรุปคำสั่งซื้อ</h3>
          <div class="d-flex justify-space-between mb-2">
            <span class="grey--text text--darken-2">จำนวนสินค้าทั้งหมด</span>
            <strong>{{ cartItemCount }} ชิ้น</strong>
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="d-flex justify-space-between mb-6">
            <span class="text-h6 font-weight-bold">ยอดรวมทั้งสิ้น</span>
            <span class="text-h5 green--text font-weight-bold"
              >฿{{ cartTotal.toLocaleString() }}</span
            >
          </div>

          <v-btn
            color="primary"
            block
            large
            elevation="2"
            :loading="isLoading"
            @click="submitCheckout"
          >
            ยืนยันการสั่งซื้อ
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <v-icon size="100" color="grey lighten-2">mdi-cart-outline</v-icon>
        <h3 class="text-h5 grey--text mt-4">ตะกร้าของคุณว่างเปล่า</h3>
        <v-btn color="primary" to="/shop" class="mt-6" outlined>
          ไปเลือกสินค้ากันเลย
        </v-btn>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top right>
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">ปิด</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router/composables";
import { useCart } from "@/composables/useCart";

const router = useRouter();
const {
  cartItems,
  updateQuantity,
  removeFromCart,
  cartTotal,
  cartItemCount,
  checkout,
  isLoading,
} = useCart();

const snackbar = ref({ show: false, message: "", color: "success" });

const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://cdn.vuetifyjs.com/images/cards/cooking.png";
  if (imagePath.startsWith("http")) return imagePath;
  let path = imagePath.replace(/\\/g, "/");
  if (path.startsWith("public/")) path = path.substring(7);
  else if (path.startsWith("/public/")) path = path.substring(8);
  if (!path.startsWith("/")) path = "/" + path;
  return `http://localhost:3000${path}`;
};

const showToast = (message, color = "success") => {
  snackbar.value = { show: true, message, color };
};

const submitCheckout = async () => {
  try {
    await checkout();
    showToast("สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ", "success");
    router.push("/shop").catch(() => {});
  } catch (error) {
    console.error("Checkout Failed:", error);
    const msg = error.response?.data?.message || "เกิดข้อผิดพลาดในการสั่งซื้อ";
    showToast(`สั่งซื้อไม่สำเร็จ: ${msg}`, "error");
  }
};
</script>
