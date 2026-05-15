import { ref } from "vue";
import axios from "axios";

export function useProduct() {
  // --- States ---
  const productsData = ref([]);
  const loading = ref(false);
  const saving = ref(false);
  const deleting = ref(false);

  // --- Methods ---

  // GET: /products
  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await axios.get("/products");
      productsData.value = response.data?.data || response.data || [];
    } catch (error) {
      productsData.value = [];
      throw error; // ตรงนี้ catch มีประโยชน์เพราะเราเซ็ตค่า productsData.value = [] ด้วย เลยไม่โดนด่า
    } finally {
      loading.value = false;
    }
  };

  // POST: /products
  const createProduct = async (formData) => {
    saving.value = true;
    try {
      const response = await axios.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newProduct = response.data?.data || response.data;
      productsData.value.push(newProduct);
    } finally {
      // ✅ ตัด catch ทิ้ง ใช้แค่ finally เพื่อปิด loading
      saving.value = false;
    }
  };

  // PUT: /products/:id
  const updateProduct = async (id, body) => {
    saving.value = true;
    try {
      const response = await axios.put(`/products/${id}`, body);
      const updatedProduct = response.data?.data || response.data;

      const index = productsData.value.findIndex((p) => (p._id || p.id) === id);
      if (index !== -1) {
        productsData.value.splice(index, 1, updatedProduct);
      } else {
        await fetchData();
      }
    } finally {
      saving.value = false;
    }
  };

  // DELETE: /products/:id
  const removeProduct = async (id) => {
    deleting.value = true;
    try {
      await axios.delete(`/products/${id}`);
      productsData.value = productsData.value.filter(
        (p) => (p._id || p.id) !== id,
      );
    } finally {
      deleting.value = false;
    }
  };

  // GET: /products/:id/orders
  const fetchProductOrders = async (id) => {
    // ✅ ไม่ต้องมี try-catch-finally เลย เพราะแค่เรียก API แล้วรีเทิร์นค่ากลับไป
    // ให้ฝั่ง View (ProductView.vue) เอาไป try-catch เพื่อโชว์ Error UI เอง
    const response = await axios.get(`/products/${id}/orders`);
    return response.data;
  };

  // POST: /products/:id/orders
  const createOrder = async (id, qty) => {
    saving.value = true;
    try {
      const body = { quantity: qty }; // ปรับให้เป็น Object ตามที่ Backend น่าจะรับ
      const response = await axios.post(`/products/${id}/orders`, body);
      return response.data;
    } finally {
      saving.value = false;
    }
  };

  return {
    productsData,
    loading,
    saving,
    deleting,
    fetchData,
    createProduct,
    updateProduct,
    removeProduct,
    fetchProductOrders,
    createOrder,
  };
}
