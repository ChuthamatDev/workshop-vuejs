<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h5">เมนูอาหาร</h2>
      <v-btn color="primary" dark @click="openAdd">
        <v-icon left>mdi-plus</v-icon>เพิ่มเมนู
      </v-btn>
    </div>

    <v-row v-if="productsData && productsData.length > 0">
      <v-col
        v-for="product in productsData"
        :key="product._id || product.id"
        cols="12"
        sm="6"
        md="4"
        class="d-flex"
      >
        <v-card
          :loading="loading"
          class="mx-auto my-2 d-flex flex-column"
          width="374"
          style="width: 100%"
        >
          <v-img
            :src="getImageUrl(product.image || product.imageUrl)"
            cover
            style="height: 200px; min-height: 200px; max-height: 200px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-icon size="48" color="grey lighten-1">mdi-food</v-icon>
              </v-row>
            </template>
          </v-img>

          <v-card-title class="text-truncate" style="max-width: 100%">
            {{ product.productName || "Product Name" }}
          </v-card-title>

          <v-card-subtitle>
            <v-chip x-small color="primary" dark class="mt-1">
              {{ product.category || "Category" }}
            </v-chip>
          </v-card-subtitle>
          <v-card-text class="flex-grow-1">
            <div class="text-h6 font-weight-bold green--text mb-1">
              ฿{{ product.price || "0.00" }}
            </div>
            <div
              class="text-body-2 grey--text"
              style="
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
            >
              {{ product.description || "Product description goes here." }}
            </div>
            <div class="text-caption mt-2">สต็อก: {{ product.stock || 0 }}</div>
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-actions>
            <v-btn color="primary" dark small @click="addToCart(product)">
              <v-icon left small>mdi-cart-plus</v-icon>สั่ง
            </v-btn>
            <v-spacer />
            <v-btn icon small @click="openEdit(product)">
              <v-icon small color="blue">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small @click="openDelete(product)">
              <v-icon small color="red">mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="!loading">
      <v-col class="text-center mt-12">
        <v-icon size="64" color="grey lighten-1">mdi-food-off</v-icon>
        <p class="mt-4 grey--text">
          ยังไม่มีเมนูอาหาร หรือยังไม่ได้เข้าสู่ระบบ
        </p>
        <v-btn color="primary" class="mt-4" to="/login">ไปหน้า Login</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="loading && productsData.length === 0">
      <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="480" persistent>
      <v-card>
        <v-card-title class="text-h6">
          {{ editMode ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่" }}
        </v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="form.productName"
              label="ชื่อเมนู"
              outlined
              dense
              :rules="[(v) => !!v || 'กรุณาใส่ชื่อเมนู']"
              required
            />

            <v-select
              v-model="form.category"
              :items="categories"
              label="หมวดหมู่"
              outlined
              dense
            />

            <v-text-field
              v-model="form.price"
              label="ราคา (฿)"
              type="number"
              outlined
              dense
              :rules="[(v) => !!v || 'กรุณาใส่ราคา']"
              required
            />

            <v-text-field
              v-model="form.stock"
              label="สต็อก"
              type="number"
              outlined
              dense
            />

            <v-textarea
              v-model="form.description"
              label="คำอธิบาย"
              outlined
              dense
              rows="3"
            />

            <v-file-input
              v-if="!editMode"
              v-model="form.image"
              label="รูปภาพ"
              accept="image/*"
              outlined
              dense
              prepend-icon="mdi-camera"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">ยกเลิก</v-btn>
          <v-btn
            color="deep-purple"
            dark
            :loading="saving"
            @click="saveProduct"
          >
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="380">
      <v-card>
        <v-card-title class="text-h6">ยืนยันการลบ</v-card-title>
        <v-card-text>
          คุณต้องการลบเมนู
          <strong>{{
            selectedProduct ? selectedProduct.productName : ""
          }}</strong>
          ออกจากระบบใช่ไหม?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="deleteDialog = false">ยกเลิก</v-btn>
          <v-btn color="red" dark :loading="deleting" @click="confirmDelete">
            ลบเลย
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      top
      right
      timeout="2500"
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">ปิด</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "ProductView",

  data() {
    return {
      loading: false,
      saving: false,
      deleting: false,

      productsData: [],

      dialog: false,
      editMode: false,
      deleteDialog: false,
      selectedProduct: null,

      form: {
        productName: "",
        category: "อาหารจานหลัก",
        price: "",
        stock: "",
        description: "",
        image: null,
      },

      categories: ["อาหารจานหลัก", "เครื่องดื่ม", "ของหวาน", "ของทานเล่น"],

      snackbar: {
        show: false,
        message: "",
        color: "success",
      },
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await this.axios.get("/products");
        let data = response.data;
        if (response.data && response.data.data) {
          data = response.data.data;
        }
        this.productsData = data;
      } catch (error) {
        console.error("Fetch Error:", error);
        if (error.response?.status === 401) {
          this.productsData = [];
          this.showToast("กรุณาเข้าสู่ระบบก่อน", "error");
        }
      } finally {
        this.loading = false;
      }
    },
    openAdd() {
      this.editMode = false;
      this.resetForm();
      this.dialog = true;
    },
    openEdit(product) {
      this.editMode = true;
      this.selectedProduct = product;
      this.form = {
        productName: product.productName || "",
        category: product.category || "อาหารจานหลัก",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        image: null,
      };
      this.dialog = true;
    },

    async saveProduct() {
      if (!this.$refs.form.validate()) return;

      this.saving = true;
      try {
        if (this.editMode) {
          const body = {
            productName: this.form.productName,
            category: this.form.category,
            price: this.form.price,
            stock: this.form.stock,
            description: this.form.description,
          };

          const response = await this.axios.put(
            `/products/${this.selectedProduct._id || this.selectedProduct.id}`,
            body,
          );

          // อัปเดต local array โดยไม่ต้อง fetch ใหม่
          const updatedProduct = response.data.data || response.data;
          const index = this.productsData.findIndex(
            (p) =>
              p._id === (this.selectedProduct._id || this.selectedProduct.id),
          );
          if (index !== -1) {
            this.$set(this.productsData, index, updatedProduct);
          } else {
            await this.fetchData();
          }

          this.showToast("แก้ไขเมนูสำเร็จ ✓");
        } else {
          // POST
          const formData = new FormData();
          formData.append("productName", this.form.productName);
          formData.append("category", this.form.category);
          formData.append("price", this.form.price);
          formData.append("stock", this.form.stock);
          formData.append("description", this.form.description);
          if (this.form.image) {
            formData.append("image", this.form.image);
          }

          const response = await this.axios.post("/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const newProduct = response.data.data || response.data;
          this.productsData.push(newProduct);
          this.showToast("เพิ่มเมนูใหม่สำเร็จ");
        }

        this.closeDialog();
      } catch (error) {
        console.error("Save Error:", error);
        this.showToast("เกิดข้อผิดพลาด กรุณาลองใหม่", "error");
      } finally {
        this.saving = false;
      }
    },

    openDelete(product) {
      this.selectedProduct = product;
      this.deleteDialog = true;
    },

    async confirmDelete() {
      this.deleting = true;
      try {
        await this.axios.delete(
          `/products/${this.selectedProduct._id || this.selectedProduct.id}`,
        );

        const index = this.productsData.findIndex(
          (p) =>
            p._id === (this.selectedProduct._id || this.selectedProduct.id),
        );
        if (index !== -1) {
          this.$delete(this.productsData, index);
        } else {
          await this.fetchData();
        }

        this.showToast("ลบเมนูสำเร็จ");
        this.deleteDialog = false;
      } catch (error) {
        console.error("Delete Error:", error);
        this.showToast("ลบไม่สำเร็จ กรุณาตรวจสอบสิทธิ์", "error");
      } finally {
        this.deleting = false;
      }
    },

    addToCart(product) {
      // TODO: เชื่อมกับ cart store หรือ API
      this.showToast(`เพิ่ม "${product.productName}" ลงตะกร้าแล้ว 🛒`);
    },

    resetForm() {
      this.form = {
        productName: "",
        category: "อาหารจานหลัก",
        price: "",
        stock: "",
        description: "",
        image: null,
      };
      this.$nextTick(() => {
        if (this.$refs.form) this.$refs.form.resetValidation();
      });
    },

    closeDialog() {
      this.dialog = false;
      this.selectedProduct = null;
      this.resetForm();
    },

    showToast(message, color = "success") {
      this.snackbar = { show: true, message, color };
    },

    getImageUrl(imagePath) {
      if (!imagePath)
        return "https://cdn.vuetifyjs.com/images/cards/cooking.png";
      if (imagePath.startsWith("http")) return imagePath;

      let path = imagePath.replace(/\\/g, "/");
      if (path.startsWith("public/")) path = path.substring(7);
      else if (path.startsWith("/public/")) path = path.substring(8);
      if (!path.startsWith("/")) path = "/" + path;

      return `http://localhost:3000${path}`;
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.2s;
}
.v-card:hover {
  box-shadow: 0 4px 20px rgba(83, 74, 183, 0.15) !important;
}
</style>
