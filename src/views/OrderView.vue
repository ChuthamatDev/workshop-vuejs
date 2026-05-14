<template>
  <v-container>
    <!-- Summary Cards -->
    <v-row class="mb-4" v-if="summary">
      <v-col cols="12" sm="4">
        <v-card outlined class="pa-4 text-center">
          <div class="text-caption grey--text">คำสั่งซื้อทั้งหมด</div>
          <div class="text-h5 font-weight-medium mt-1">
            {{ summary.totalOrders }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card outlined class="pa-4 text-center">
          <div class="text-caption grey--text">ยอดรวม</div>
          <div class="text-h5 font-weight-medium mt-1">
            ฿{{ summary.totalAmount }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card outlined class="pa-4 text-center">
          <div class="text-caption grey--text">จำนวนสินค้า</div>
          <div class="text-h5 font-weight-medium mt-1">
            {{ summary.totalQuantity }}
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Orders Table -->
    <v-card outlined>
      <v-card-title class="subtitle-1">
        <v-icon left>mdi-format-list-bulleted</v-icon>
        รายการคำสั่งซื้อ
      </v-card-title>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Order ID</th>
              <th class="text-left">ชื่อสินค้า</th>
              <th class="text-right">ราคา/หน่วย</th>
              <th class="text-right">จำนวน</th>
              <th class="text-right">ราคารวม</th>
              <th class="text-center">Payment</th>
              <th class="text-center">Order Status</th>
              <th class="text-left">วันที่สั่ง</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loading -->
            <tr v-if="loading">
              <td colspan="8" class="text-center py-6">
                <v-progress-circular
                  indeterminate
                  color="deep-purple"
                  size="28"
                />
              </td>
            </tr>

            <!-- Empty -->
            <tr v-else-if="orders.length === 0">
              <td colspan="8" class="text-center py-6 grey--text">
                ยังไม่มีคำสั่งซื้อ
              </td>
            </tr>

            <!-- Data rows -->
            <tr v-for="(order, index) in orders" :key="order.orderId">
              <td>{{ index + 1 }}</td>
              <td>{{ order.productName }}</td>
              <td class="text-right">฿{{ order.unitPrice }}</td>
              <td class="text-right">{{ order.quantity }}</td>
              <td class="text-right font-weight-medium">
                ฿{{ order.totalPrice }}
              </td>
              <td class="text-center">
                <v-chip
                  x-small
                  :color="statusColor(order.paymentStatus)"
                  :text-color="statusTextColor(order.paymentStatus)"
                >
                  {{ order.paymentStatus }}
                </v-chip>
              </td>
              <td class="text-center">
                <v-chip
                  x-small
                  :color="statusColor(order.orderStatus)"
                  :text-color="statusTextColor(order.orderStatus)"
                >
                  {{ order.orderStatus }}
                </v-chip>
              </td>
              <td>{{ formatDate(order.orderDate) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "OrdersView",
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
      try {
        const response = await this.axios.get("/orders");
        const data = response.data.data;

        this.summary = data.summary; // { totalOrders, totalAmount, totalQuantity }
        this.orders = data.orders; // array of order objects
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      } finally {
        this.loading = false;
      }
    },

    // ย่อ orderId ให้อ่านง่าย: "6a0576...866"
    shortId(id) {
      if (!id) return "-";
      return id.slice(0, 6) + "..." + id.slice(-3);
    },

    // แปลง ISO date → วันที่อ่านง่าย
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

    // สีพื้น chip ตาม status
    statusColor(status) {
      const map = {
        pending: "#FFF3E0",
        paid: "#E8F5E9",
        cancelled: "#FFEBEE",
        completed: "#E8F5E9",
      };
      return map[status] || "#F5F5F5";
    },

    // สีตัวอักษร chip ตาม status
    statusTextColor(status) {
      const map = {
        pending: "#E65100",
        paid: "#2E7D32",
        cancelled: "#C62828",
        completed: "#2E7D32",
      };
      return map[status] || "#616161";
    },
  },
};
</script>

<style scoped>
.order-id {
  font-family: monospace;
  font-size: 12px;
  color: #9e9e9e;
}
</style>
