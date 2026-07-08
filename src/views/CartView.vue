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
            <span class="text-h5 green--text font-weight-bold">
              ฿{{ cartTotal.toLocaleString() }}
            </span>
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

    <v-dialog v-model="orderDialog.show" max-width="480" persistent>
      <v-card>
        <v-card-title
          class="d-flex flex-column align-center pa-6"
          style="background: #e8f5e9"
        >
          <v-icon size="64" color="green darken-2" class="mb-2"
            >mdi-check-circle</v-icon
          >
          <span class="text-h6 font-weight-bold green--text text--darken-2"
            >สั่งซื้อสำเร็จ!</span
          >
        </v-card-title>

        <v-card-text class="pa-5">
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="grey--text text--darken-1">รหัสออเดอร์</span>
            <span class="order-id-chip">{{
              shortId(orderDialog.orderId)
            }}</span>
          </div>
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="grey--text text--darken-1">วันที่สั่งซื้อ</span>
            <span class="font-weight-bold">{{
              formatDate(orderDialog.createdAt)
            }}</span>
          </div>
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="grey--text text--darken-1">ยอดชำระ</span>
            <span class="text-h6 green--text font-weight-bold">
              ฿{{ (orderDialog.totalPrice || 0).toLocaleString() }}
            </span>
          </div>

          <v-divider class="mb-4"></v-divider>

          <div class="d-flex justify-space-between align-center mb-2">
            <span class="grey--text text--darken-1">สถานะการชำระเงิน</span>
            <v-chip
              small
              :color="paymentColor(orderDialog.paymentStatus)"
              label
              class="font-weight-bold"
            >
              <v-icon small left>mdi-credit-card-outline</v-icon>
              {{ paymentLabel(orderDialog.paymentStatus) }}
            </v-chip>
          </div>
          <div class="d-flex justify-space-between align-center">
            <span class="grey--text text--darken-1">สถานะออเดอร์</span>
            <v-chip
              small
              :color="orderStatusColor(orderDialog.orderStatus)"
              label
              class="font-weight-bold"
            >
              <v-icon small left>mdi-package-variant</v-icon>
              {{ orderStatusLabel(orderDialog.orderStatus) }}
            </v-chip>
          </div>

          <v-alert type="info" outlined dense class="mt-4 text-caption">
            ระบบได้รับคำสั่งซื้อของคุณแล้ว รอการยืนยันจากร้านค้า
          </v-alert>
        </v-card-text>

        <v-card-actions class="pa-4 pt-0 d-flex flex-column" style="gap: 8px">
          <v-btn color="primary" block @click="goToMyOrders">
            <v-icon left>mdi-receipt-text-outline</v-icon>
            ดูประวัติการสั่งซื้อ
          </v-btn>
          <v-btn outlined block @click="closeDialogAndGoShop">
            <v-icon left>mdi-shopping-outline</v-icon>
            ช็อปต่อ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { useCart } from "@/hooks/useCart";

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

const orderDialog = ref({
  show: false,
  orderId: "",
  createdAt: "",
  totalPrice: 0,
  paymentStatus: "",
  orderStatus: "",
});

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
    const result = await checkout();
    const order = result.data;
    orderDialog.value = {
      show: true,
      orderId: order._id,
      createdAt: order.createdAt,
      totalPrice: order.total_price,
      paymentStatus: order.payment_status,
      orderStatus: order.status,
    };
  } catch (error) {
    console.error("Checkout Failed:", error);
    const msg = error.response?.data?.message || "เกิดข้อผิดพลาดในการสั่งซื้อ";
    showToast(`สั่งซื้อไม่สำเร็จ: ${msg}`, "error");
  }
};

const shortId = (id) => (id ? String(id).slice(-6).toUpperCase() : "-");

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const paymentLabel = (s) =>
  ({ pending: "รอชำระเงิน", paid: "ชำระแล้ว", failed: "ล้มเหลว" }[s] || s);
const paymentColor = (s) =>
  ({
    pending: "orange lighten-4",
    paid: "green lighten-4",
    failed: "red lighten-4",
  }[s] || "grey lighten-3");
const orderStatusLabel = (s) =>
  ({
    pending: "รอดำเนินการ",
    processing: "กำลังจัดส่ง",
    completed: "สำเร็จ",
    cancelled: "ยกเลิก",
  }[s] || s);
const orderStatusColor = (s) =>
  ({
    pending: "orange lighten-4",
    processing: "blue lighten-4",
    completed: "green lighten-4",
    cancelled: "red lighten-4",
  }[s] || "grey lighten-3");

const closeDialogAndGoShop = () => {
  orderDialog.value.show = false;
  router.push({ name: "shop" }).catch(() => {});
};

const goToMyOrders = () => {
  orderDialog.value.show = false;
  router.push({ name: "my-orders" }).catch(() => {});
};
</script>

<style scoped>
.order-id-chip {
  font-family: monospace;
  font-size: 14px;
  background: #e8eaf6;
  color: #3949ab;
  padding: 4px 10px;
  border-radius: 6px;
}
</style>
