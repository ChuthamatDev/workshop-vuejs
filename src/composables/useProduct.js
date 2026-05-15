import { ref } from "vue";
import axios from "axios";

export function useProduct() {
  const productsData = ref([]);
  const loading = ref(false);
  const saving = ref(false);
  const deleting = ref(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get("/api/v1/products");
      productsData.value = response.data?.data || response.data || [];
    } catch (error) {
      productsData.value = [];
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const createProduct = async (formData) => {
    saving.value = true;
    try {
      const response = await axios.post("/api/v1/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newProduct = response.data?.data || response.data;
      productsData.value.push(newProduct);
    } finally {
      saving.value = false;
    }
  };

  const updateProduct = async (id, body) => {
    saving.value = true;
    try {
      const response = await axios.put(`/api/v1/products/${id}`, body);
      const updatedProduct = response.data?.data || response.data;

      const index = productsData.value.findIndex((p) => (p._id || p.id) === id);
      if (index !== -1) {
        productsData.value.splice(index, 1, updatedProduct);
      } else {
        await fetchProducts();
      }
    } finally {
      saving.value = false;
    }
  };

  const removeProduct = async (id) => {
    deleting.value = true;
    try {
      await axios.delete(`/api/v1/products/${id}`);
      productsData.value = productsData.value.filter(
        (p) => (p._id || p.id) !== id,
      );
    } finally {
      deleting.value = false;
    }
  };

  const submitOrder = async (productId, quantity) => {
    const response = await axios.post(`/api/v1/products/${productId}/orders`, {
      quantity,
    });
    return response.data;
  };

  return {
    productsData,
    loading,
    saving,
    deleting,
    fetchProducts,
    createProduct,
    updateProduct,
    removeProduct,
    submitOrder,
  };
}
