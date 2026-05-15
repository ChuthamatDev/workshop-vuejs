<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h5">จัดการผู้ใช้งาน</h2>
    </div>

    <v-card outlined>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        loading-text="กำลังโหลดข้อมูล..."
        no-data-text="ไม่มีข้อมูลผู้ใช้งาน"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            small
            :color="item.status === 'approved' ? 'success' : 'warning'"
            dark
          >
            {{ item.status === "approved" ? "อนุมัติแล้ว" : "รออนุมัติ" }}
          </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            v-if="item.status !== 'approved'"
            color="primary"
            small
            @click="approveUser(item._id || item.id)"
          >
            <v-icon left small>mdi-check</v-icon> อนุมัติ
          </v-btn>
          <span v-else class="grey--text text-caption">-</span>
        </template>
      </v-data-table>
    </v-card>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top right>
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">ปิด</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "UserManageView",
  data() {
    return {
      loading: false,
      users: [],
      headers: [
        { text: "Username", value: "username" },
        { text: "Role", value: "role" },
        { text: "สถานะ", value: "status" },
        { text: "จัดการ", value: "actions", sortable: false, align: "center" },
      ],
      snackbar: { show: false, message: "", color: "success" },
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get("/api/v1/users");
        this.users = response.data.data || response.data;
      } catch (error) {
        console.error("Fetch Users Error:", error);
        this.showToast("ดึงข้อมูลผู้ใช้ไม่สำเร็จ", "error");
      } finally {
        this.loading = false;
      }
    },
    async approveUser(userId) {
      if (!confirm("ยืนยันการอนุมัติผู้ใช้งานนี้?")) return;

      try {
        await axios.put(`/api/v1/users/${userId}/approve`);
        this.showToast("อนุมัติผู้ใช้งานสำเร็จ!");
        this.fetchUsers();
      } catch (error) {
        console.error("Approve User Error:", error);
        this.showToast("เกิดข้อผิดพลาดในการอนุมัติ", "error");
      }
    },
    showToast(message, color = "success") {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  },
};
</script>
