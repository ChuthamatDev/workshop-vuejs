import { computed } from "vue";

export function useAuth() {
  const user = computed(() => JSON.parse(localStorage.getItem("user") || "{}"));
  const isAdmin = computed(() => user.value.role === "admin");
  const isUser = computed(() => user.value.role === "user");
  return { user, isAdmin, isUser };
}
