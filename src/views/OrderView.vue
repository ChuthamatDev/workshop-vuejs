<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h5 font-weight-bold">รายการสั่งซื้อทั้งหมด (Orders)</h2>
      <v-btn color="primary" outlined @click="fetchOrders" :loading="loading">
        <v-icon left>mdi-refresh</v-icon> รีเฟรชข้อมูล
      </v-btn>
    </div>

    <!-- Summary Cards -->
    <v-row class="mb-4" v-if="summary">
      <v-col cols="12" sm="4">
        <v-card outlined class="pa-4 text-center bg-blue-lighten-5">
          <v-icon color="blue" size="36" class="mb-2"
            >mdi-receipt-text-outline</v-icon
          >
          <div class="text-caption grey--text text--darken-1">
            คำสั่งซื้อทั้งหมด
          </div>
          <div class="text-h4 font-weight-bold blue--text text--darken-2">
            {{ summary.totalOrders }}
            <span class="text-subtitle-1">รายการ</span>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card outlined class="pa-4 text-center bg-green-lighten-5">
          <v-icon color="green" size="36" class="mb-2"
            >mdi-cash-multiple</v-icon
          >
          <div class="text-caption grey--text text--darken-1">ยอดขายรวม</div>
          <div class="text-h4 font-weight-bold green--text text--darken-2">
            ฿{{ (summary.totalAmount || 0).toLocaleString() }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card outlined class="pa-4 text-center bg-orange-lighten-5">
          <v-icon color="orange" size="36" class="mb-2"
            >mdi-package-variant-closed</v-icon
          >
          <div class="text-caption grey--text text--darken-1">
            จำนวนสินค้าที่ขายได้
          </div>
          <div class="text-h4 font-weight-bold orange--text text--darken-2">
            {{ summary.totalQuantity }}
            <span class="text-subtitle-1">ชิ้น</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-4">กำลังโหลดข้อมูลคำสั่งซื้อ...</p>
    </div>

    <!-- Empty -->
    <div v-else-if="orders.length === 0" class="text-center my-8">
      <v-icon size="80" color="grey lighten-2">mdi-inbox-outline</v-icon>
      <p class="text-h6 grey--text mt-4">ยังไม่มีคำสั่งซื้อในระบบ</p>
    </div>

    <!-- Orders List -->
    <v-row v-else>
      <v-col
        cols="12"
        v-for="order in orders"
        :key="order.orderId"
        class="pb-4"
      >
        <v-card outlined class="order-card">
          <!-- Card Header -->
          <v-card-title
            class="bg-blue-lighten-5 d-flex justify-space-between align-center"
          >
            <div class="d-flex align-center">
              <v-icon left color="blue">mdi-receipt-text-outline</v-icon>
              <div>
                <div class="text-h6">
                  รหัสออเดอร์:
                  <span class="order-id">{{ shortId(order.orderId) }}</span>
                </div>
                <div class="text-caption grey--text">
                  {{ formatDate(order.orderDate) }}
                </div>
              </div>
            </div>
            <v-chip
              :color="statusColor(order.orderStatus)"
              :text-color="statusTextColor(order.orderStatus)"
              class="font-weight-bold"
            >
              {{ order.orderStatus?.toUpperCase() }}
            </v-chip>
          </v-card-title>

          <v-card-text>
            <!-- Customer + Total -->
            <v-row class="mb-4 mt-2">
              <v-col cols="12" sm="4">
                <div class="text-subtitle-2 grey--text">ชื่อลูกค้า</div>
                <div class="text-h6 font-weight-bold">
                  {{ order?.customerName }}
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-subtitle-2 grey--text">จำนวนสินค้ารวม</div>
                <div class="text-h6 font-weight-bold">
                  {{ order.totalQuantity }} ชิ้น
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="text-subtitle-2 grey--text">ยอดรวมคำสั่งซื้อ</div>
                <!-- ✅ แก้จาก totalAmount → totalPrice ตาม JSON -->
                <div class="text-h6 green--text font-weight-bold">
                  ฿{{ (order.totalPrice || 0).toLocaleString() }}
                </div>
              </v-col>
            </v-row>

            <v-divider class="my-3"></v-divider>

            <!-- Product List -->
            <div class="text-subtitle-2 font-weight-bold mb-3">
              <v-icon small left>mdi-shopping-outline</v-icon>
              รายละเอียดสินค้า ({{ order.products?.length || 0 }} รายการ)
            </div>

            <v-list class="pa-0">
              <!-- ✅ แก้จาก order.items → order.products ตาม JSON -->
              <div
                v-for="(item, index) in order.products || []"
                :key="index"
                class="mb-2"
              >
                <v-list-item class="pa-0">
                  <v-list-item-content>
                    <div class="d-flex justify-space-between align-center">
                      <div class="flex-grow-1">
                        <v-list-item-title class="text-body-1 font-weight-bold">
                          {{ item.productName }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <span>ราคา/หน่วย: </span>
                          <strong class="green--text"
                            >฿{{ item.unitPrice.toLocaleString() }}</strong
                          >
                          <span class="ml-4">จำนวน: </span>
                          <strong>{{ item.quantity }} ชิ้น</strong>
                        </v-list-item-subtitle>
                      </div>
                      <div class="text-right ml-4">
                        <div class="text-caption grey--text">รวม</div>
                        <!-- ✅ แก้จาก item.totalPrice → item.subtotal ตาม JSON -->
                        <div class="text-h6 green--text font-weight-bold">
                          ฿{{ (item.subtotal || 0).toLocaleString() }}
                        </div>
                      </div>
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index < (order.products?.length || 0) - 1"
                  class="my-2"
                ></v-divider>
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderView",
  data() {
    return {
      loading: false,
      orders: [],
      summary: null,
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      this.loading = true;
      this.summary = null;
      try {
        const token = localStorage.getItem("token"); // ✅ ต้องส่ง token ด้วย
        const response = await axios.get("/api/v1/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data;
        // ✅ แยก summary และ orders จาก response โดยตรง
        this.summary = data.summary || null;
        this.orders = data.orders || [];
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      } finally {
        this.loading = false;
      }
    },

    // ✅ ลบ buildOrderRows() ออกทั้งหมด — ไม่จำเป็นแล้ว
    // Backend จัดโครงสร้างมาให้พร้อมแล้ว

    shortId(id) {
      if (!id) return "-";
      return String(id).slice(0, 6).toUpperCase();
    },
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
    statusColor(status) {
      const map = {
        pending: "#FFF3E0",
        completed: "#E8F5E9",
        cancelled: "#FFEBEE",
      };
      return map[status?.toLowerCase()] || "#F5F5F5";
    },
    statusTextColor(status) {
      const map = {
        pending: "#E65100",
        completed: "#2E7D32",
        cancelled: "#C62828",
      };
      return map[status?.toLowerCase()] || "#616161";
    },
  },
  // ✅ ลบ computed.orderSummary ออก เนื่องจาก API ส่ง summary มาให้แล้ว
};
</script>

<style scoped>
.order-id {
  font-family: monospace;
  font-weight: bold;
  color: #5c6bc0;
  background-color: #e8eaf6;
  padding: 4px 8px;
  border-radius: 4px;
}
.order-card {
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.order-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
