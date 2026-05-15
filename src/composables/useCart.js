import { ref, computed } from "vue";
import axios from "axios";

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.id || "guest";
};

const STORAGE_KEY = computed(() => `cart_items_${getUserId()}`);

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
};

const cartItems = ref(loadCart());
const isLoading = ref(false);

const persistCart = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems.value));
};

const normalizeProductId = (product) => {
  if (!product || typeof product !== "object") return null;
  return product._id || product.id || null;
};

const findCartIndex = (productId) => {
  return cartItems.value.findIndex(
    (item) =>
      item.productId === productId ||
      item._id === productId ||
      item.id === productId,
  );
};

const addToCart = (product, quantity = 1) => {
  const productId = normalizeProductId(product);
  if (!productId) return;

  const index = findCartIndex(productId);
  const nextQuantity = Number(quantity) || 1;
  const maxStock = product.stock ?? Infinity;

  if (index !== -1) {
    const newQty = cartItems.value[index].quantity + nextQuantity;
    cartItems.value[index].quantity = Math.min(newQty, maxStock); // ไม่เกิน stock
  } else {
    cartItems.value.push({
      productId,
      productName: product.productName || product.name || "Unnamed",
      price: Number(product.price) || 0,
      image: product.image || product.imageUrl || "",
      quantity: Math.min(nextQuantity, maxStock),
      stock: maxStock, // เก็บ stock ไว้ด้วย
    });
  }
  persistCart();
};

const updateQuantity = (productId, delta) => {
  const index = findCartIndex(productId);
  if (index === -1) return;

  const nextQuantity = cartItems.value[index].quantity + Number(delta);
  if (nextQuantity <= 0) {
    cartItems.value.splice(index, 1);
  } else {
    cartItems.value[index].quantity = nextQuantity;
  }

  persistCart();
};

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(
    (item) =>
      item.productId !== productId &&
      item._id !== productId &&
      item.id !== productId,
  );
  persistCart();
};

const clearCart = () => {
  cartItems.value = [];
  persistCart();
};

const cartItemCount = computed(() =>
  cartItems.value.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
);

const cartTotal = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  ),
);

const checkout = async () => {
  const token = localStorage.getItem("token");

  if (!cartItems.value.length) {
    throw new Error("Cart is empty");
  }

  isLoading.value = true;
  try {
    const payload = {
      items: cartItems.value.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    const response = await axios.post("/api/v1/orders", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    clearCart();
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

export function useCart() {
  return {
    cartItems,
    cartItemCount,
    cartTotal,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkout,
  };
}
