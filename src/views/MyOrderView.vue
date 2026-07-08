<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h5 font-weight-bold">คำสั่งซื้อของฉัน</h2>
      <v-btn outlined @click="loadOrders" :loading="loading">
        <v-icon left>mdi-refresh</v-icon> รีเฟรช
      </v-btn>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-10">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-4 grey--text">กำลังโหลดคำสั่งซื้อ...</p>
    </div>

    <!-- Error -->
    <v-alert v-else-if="errorMsg" type="error" outlined>
      {{ errorMsg }}
    </v-alert>

    <!-- Empty -->
    <div v-else-if="orders.length === 0" class="text-center my-10">
      <v-icon size="80" color="grey lighten-2">mdi-inbox-outline</v-icon>
      <p class="text-h6 grey--text mt-4">ยังไม่มีคำสั่งซื้อ</p>
      <v-btn color="primary" :to="{ name: 'shop' }" class="mt-4" outlined>
        <v-icon left>mdi-shopping-outline</v-icon>
        ไปเลือกสินค้า
      </v-btn>
    </div>

    <!-- Orders -->
    <div v-else>
      <v-alert color="blue lighten-5" dense class="mb-4">
        <v-icon left color="blue">mdi-information-outline</v-icon>
        คำสั่งซื้อทั้งหมด <strong>{{ orders.length }} รายการ</strong>
      </v-alert>

      <v-card
        v-for="order in orders"
        :key="order.orderId"
        outlined
        class="mb-4 order-card"
      >
        <!-- Header -->
        <v-card-title
          class="d-flex justify-space-between align-center py-3 px-4"
          style="background: #f3f4f6"
        >
          <div class="d-flex align-center">
            <v-icon left color="blue darken-1">mdi-receipt-text-outline</v-icon>
            <div>
              <span class="text-body-1 font-weight-bold">
                รหัส:
                <span class="order-id-chip">{{ shortId(order.orderId) }}</span>
              </span>
              <div class="text-caption grey--text">
                {{ formatDate(order.orderDate) }}
              </div>
            </div>
          </div>
          <!-- Order Status -->
          <v-chip
            small
            label
            :color="orderStatusColor(order.orderStatus)"
            class="font-weight-bold"
          >
            <v-icon small left>mdi-package-variant</v-icon>
            {{ orderStatusLabel(order.orderStatus) }}
          </v-chip>
        </v-card-title>

        <v-card-text class="pt-3">
          <!-- Products -->
          <div v-for="(item, index) in order.products" :key="index">
            <div class="d-flex justify-space-between align-center py-2">
              <div>
                <div class="text-body-2 font-weight-bold">
                  {{ item.productName }}
                </div>
                <div class="text-caption grey--text">
                  ฿{{ item.unitPrice.toLocaleString() }} ×
                  {{ item.quantity }} ชิ้น
                </div>
              </div>
              <div class="text-body-2 font-weight-bold green--text">
                ฿{{ (item.subtotal || 0).toLocaleString() }}
              </div>
            </div>
            <v-divider v-if="index < order.products.length - 1"></v-divider>
          </div>

          <v-divider class="my-3"></v-divider>

          <!-- Footer: ยอดรวม + payment status -->
          <div class="d-flex justify-space-between align-center">
            <v-chip
              small
              label
              :color="paymentColor(order.paymentStatus)"
              class="font-weight-bold"
            >
              <v-icon small left>mdi-credit-card-outline</v-icon>
              {{ paymentLabel(order.paymentStatus) }}
            </v-chip>
            <div class="text-right">
              <div class="text-caption grey--text">ยอดรวม</div>
              <div class="text-h6 green--text font-weight-bold">
                ฿{{ (order.totalPrice || 0).toLocaleString() }}
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { useCart } from "@/hooks/useCart";

export default {
  name: "MyOrderView",
  setup() {
    const { fetchMyOrders } = useCart();
    return { fetchMyOrders };
  },
  data() {
    return {
      loading: false,
      orders: [],
      errorMsg: "",
    };
  },
  created() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      this.loading = true;
      this.errorMsg = "";
      try {
        const data = await this.fetchMyOrders();
        this.orders = data.orders || [];
      } catch (error) {
        this.errorMsg = "ไม่สามารถโหลดคำสั่งซื้อได้ กรุณาลองใหม่";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    shortId: (id) => (id ? String(id).slice(-6).toUpperCase() : "-"),

    formatDate(dateStr) {
      if (!dateStr) return "-";
      return new Date(dateStr).toLocaleString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    orderStatusLabel: (s) =>
      ({
        pending: "รอดำเนินการ",
        processing: "กำลังจัดส่ง",
        completed: "สำเร็จ",
        cancelled: "ยกเลิก",
      }[s] || s),
    orderStatusColor: (s) =>
      ({
        pending: "orange lighten-4",
        processing: "blue lighten-4",
        completed: "green lighten-4",
        cancelled: "red lighten-4",
      }[s] || "grey lighten-3"),
    paymentLabel: (s) =>
      ({ pending: "รอชำระเงิน", paid: "ชำระแล้ว", failed: "ล้มเหลว" }[s] || s),
    paymentColor: (s) =>
      ({
        pending: "orange lighten-4",
        paid: "green lighten-4",
        failed: "red lighten-4",
      }[s] || "grey lighten-3"),
  },
};
</script>

<style scoped>
.order-id-chip {
  font-family: monospace;
  background: #e8eaf6;
  color: #3949ab;
  padding: 2px 8px;
  border-radius: 4px;
}
.order-card {
  transition: box-shadow 0.2s;
}
.order-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
</style>
