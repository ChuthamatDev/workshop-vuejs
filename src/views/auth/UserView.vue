<template>
  <v-container>
    <div class="user-approve-contant">
      <h2 class="mb-4">User Management (Approve)</h2>

      <!-- Filter buttons to switch between All, Pending, Approved -->
      <v-btn-toggle v-model="statusFilter" mandatory class="mb-4">
        <v-btn value="all">All</v-btn>
        <v-btn value="pending">Pending</v-btn>
        <v-btn value="approved">Approved</v-btn>
      </v-btn-toggle>

      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :items-per-page="10"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <!-- Custom formatting for status column -->
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="item.status === 'approved' ? 'green' : 'orange'"
            dark
            small
          >
            {{ item.status }}
          </v-chip>
        </template>

        <!-- Custom formatting for actions column -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            v-if="item.status !== 'approved'"
            color="primary"
            small
            @click="approveUser(item._id || item.id)"
          >
            Approve
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "UserView",
  data() {
    return {
      loading: false,
      statusFilter: "all", // "all", "pending", "approved"
      headers: [
        { text: "Username", align: "start", value: "username" },
        { text: "Role", value: "role" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
    };
  },
  computed: {
    filteredUsers() {
      if (this.statusFilter === "all") {
        return this.users;
      }
      return this.users.filter((user) => user.status === this.statusFilter);
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await this.axios.get("/users"); // ลบ headers ออกได้เลย

        let usersData = response.data;
        if (response.data && response.data.data) {
          usersData = response.data.data;
        }

        this.users = usersData;
      } catch (error) {
        console.error("Fetch Users Error:", error);
      } finally {
        this.loading = false;
      }
    },
    async approveUser(id) {
      try {
        await this.axios.put(`/users/${id}/approve`);

        const user = this.users.find((u) => u._id === id || u.id === id);
        if (user) {
          this.$set(user, "status", "approved");
        } else {
          this.fetchUsers();
        }
      } catch (error) {
        console.error("Approve User Error:", error);
        alert(
          "Failed to approve user. Please check if you have Admin permissions.",
        );
      }
    },
  },
};
</script>

<style scoped>
.user-approve-contant {
  padding: 20px;
}
</style>
