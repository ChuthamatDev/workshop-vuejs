<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-4">
      <h2 class="text-h5">เมนูอาหาร</h2>
      <v-btn v-if="userRole === 'admin'" color="primary" dark @click="openAdd">
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

          <v-card-text class="flex-grow-1">
            <div class="text-h6 font-weight-bold green--text mb-1">
              ฿{{ product.price || "0.00" }}
            </div>
            <div
              class="text-body-2 grey--text"
              style="
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
            >
              {{ product.description || "ไม่มีคำอธิบาย" }}
            </div>
            <div class="text-caption mt-2">สต็อก: {{ product.stock || 0 }}</div>
          </v-card-text>

          <v-divider class="mx-4" />

          <v-card-actions class="pa-3">
            <template v-if="userRole === 'user'">
              <!-- <v-btn
                icon
                small
                :disabled="getQty(product) <= 1"
                @click="changeQty(product, -1)"
              >
                <v-icon small>mdi-minus</v-icon>
              </v-btn>

              <span class="mx-2 text-body-2 font-weight-medium">
                {{ getQty(product) }}
              </span>

              <v-btn
                icon
                small
                :disabled="getQty(product) >= (product.stock || 99)"
                @click="changeQty(product, 1)"
              >
                <v-icon small>mdi-plus</v-icon>
              </v-btn> -->

              <v-spacer />

              <v-btn
                color="primary"
                dark
                small
                @click="handleAddToCart(product)"
              >
                <v-icon left small>mdi-cart-plus</v-icon>
                หยิบใส่ตะกร้า
              </v-btn>
            </template>

            <template v-if="userRole === 'admin'">
              <v-spacer></v-spacer>
              <v-btn color="blue" text small @click="openEdit(product)">
                <v-icon left small>mdi-pencil</v-icon> แก้ไข
              </v-btn>
              <v-btn color="red" text small @click="openDelete(product)">
                <v-icon left small>mdi-trash-can-outline</v-icon> ลบ
              </v-btn>
            </template>
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
          <v-form ref="formRef" lazy-validation>
            <v-text-field
              v-model="form.productName"
              label="ชื่อสินค้า"
              outlined
              dense
              :rules="[(v) => !!v || 'กรุณาใส่ชื่อสินค้า']"
              required
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
          <v-btn color="primary" dark :loading="saving" @click="saveProduct"
            >บันทึก</v-btn
          >
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
          <v-btn
            color="red"
            dark
            :loading="deleting"
            @click="handleConfirmDelete"
            >ลบเลย</v-btn
          >
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

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { useProduct } from "@/composables/useProduct";
import { useCart } from "@/composables/useCart";

const { addToCart } = useCart();

const {
  productsData,
  loading,
  saving,
  deleting,
  fetchProducts,
  createProduct,
  updateProduct,
  removeProduct,
} = useProduct();

//เช็ค role ผู้ใช้งาน
const userRole = ref(JSON.parse(localStorage.getItem("user"))?.role || "user");

const formRef = ref(null);
const dialog = ref(false);
const editMode = ref(false);
const deleteDialog = ref(false);
const selectedProduct = ref(null);

const quantities = reactive({});
const snackbar = reactive({ show: false, message: "", color: "success" });

const form = reactive({
  productName: "",
  price: "",
  stock: "",
  description: "",
  image: null,
});

// Lifecycle
onMounted(async () => {
  try {
    await fetchProducts();
  } catch (error) {
    if (error.response?.status === 401) {
      showToast("กรุณาเข้าสู่ระบบก่อน", "error");
    }
  }
});

const openAdd = () => {
  editMode.value = false;
  resetForm();
  dialog.value = true;
};

const openEdit = (product) => {
  editMode.value = true;
  selectedProduct.value = product;
  Object.assign(form, {
    productName: product.productName || "",
    price: product.price || "",
    stock: product.stock || "",
    description: product.description || "",
    image: null,
  });
  dialog.value = true;
};

// บันทึกสินค้า (ทั้งเพิ่มและแก้ไข)
const saveProduct = async () => {
  if (!formRef.value.validate()) return;

  try {
    if (editMode.value) {
      const id = selectedProduct.value._id || selectedProduct.value.id;
      const body = {
        productName: form.productName,
        price: form.price,
        stock: form.stock,
        description: form.description,
      };
      await updateProduct(id, body);
      showToast("แก้ไขเมนูสำเร็จ ✓");
    } else {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null) formData.append(key, form[key]);
      });
      await createProduct(formData);
      showToast("เพิ่มเมนูใหม่สำเร็จ");
    }
    closeDialog();
  } catch (error) {
    console.error("Save Error:", error);
    showToast("เกิดข้อผิดพลาด กรุณาลองใหม่", "error");
  }
};

// 🟢 ปลดคอมเมนต์ฟังก์ชันเปิดหน้าต่างยืนยันลบ
const openDelete = (product) => {
  selectedProduct.value = product;
  deleteDialog.value = true;
};

// ยืนยันการลบ
const handleConfirmDelete = async () => {
  try {
    const id = selectedProduct.value._id || selectedProduct.value.id;
    await removeProduct(id);
    showToast("ลบเมนูสำเร็จ");
    deleteDialog.value = false;
  } catch (error) {
    console.error("Delete Error:", error);
    showToast("ลบไม่สำเร็จ กรุณาตรวจสอบสิทธิ์", "error");
  }
};

// จัดการจำนวนและสั่งซื้อ (เฉพาะ User)
const getQty = (product) => {
  const id = product._id || product.id;
  return quantities[id] || 1;
};

// เพิ่มจำนวน สินค้า
// const changeQty = (product, delta) => {
//   const id = product._id || product.id;
//   const current = getQty(product);
//   const max = product.stock;
//   const newValue = Math.min(Math.max(1, current + delta), max);
//   quantities.value = { ...quantities.value, [id]: newValue };
// };

const handleAddToCart = (product) => {
  const productId = product._id || product.id;
  const quantity = getQty(product);

  if (quantity > product.stock) {
    showToast(`สินค้ามีสต็อกแค่ ${product.stock} ชิ้น`, "warning");
    return;
  }

  addToCart(product, quantity);
  showToast(
    `เพิ่ม "${product.productName}" จำนวน ${quantity} ชิ้น ลงตะกร้าแล้ว 🛒`,
  );

  quantities.value = { ...quantities.value, [productId]: 1 };
};

const resetForm = () => {
  Object.assign(form, {
    productName: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });
  nextTick(() => {
    if (formRef.value) formRef.value.resetValidation();
  });
};

const closeDialog = () => {
  dialog.value = false;
  selectedProduct.value = null;
  resetForm();
};

const showToast = (message, color = "success") => {
  snackbar.message = message;
  snackbar.color = color;
  snackbar.show = true;
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://cdn.vuetifyjs.com/images/cards/cooking.png";
  if (imagePath.startsWith("http")) return imagePath;

  let path = imagePath.replace(/\\/g, "/");
  if (path.startsWith("public/")) path = path.substring(7);
  else if (path.startsWith("/public/")) path = path.substring(8);
  if (!path.startsWith("/")) path = "/" + path;

  return `http://localhost:3000${path}`;
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
