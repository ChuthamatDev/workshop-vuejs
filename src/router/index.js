import Vue from "vue";
import VueRouter from "vue-router";
import Container from "@/components/Container.vue";

Vue.use(VueRouter);

const parseJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    return null;
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }

  const isExpired = payload.exp * 1000 < Date.now();
  if (isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }

  return true;
};

const getUserRole = () => {
  const userString = localStorage.getItem("user");
  if (!userString) return null;

  try {
    const user = JSON.parse(userString);
    return user.role || null;
  } catch (error) {
    return null;
  }
};

const routes = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "shop",
        name: "shop",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("../views/CartView.vue"),
        meta: { requiresAuth: true, role: "user" },
      },
      {
        path: "orders",
        name: "order-summary",
        component: () => import("../views/OrderView.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "users",
        name: "user-manage",
        component: () => import("../views/auth/UserView.vue"),
        meta: { requiresAuth: true, role: "admin" },
      },
      {
        path: "login",
        name: "login",
        component: () => import("../views/auth/LoginView.vue"),
        meta: { guestOnly: true },
      },
      {
        path: "login-admin",
        name: "login-admin",
        component: () => import("../views/auth/LoginAdminView.vue"),
        meta: { guestOnly: true },
      },
      {
        path: "register",
        name: "register",
        component: () => import("../views/auth/ResigterView.vue"),
        meta: { guestOnly: true },
      },
      {
        path: "workshop",
        name: "workshop",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "my-orders",
        name: "my-orders",
        component: () => import("../views/MyOrderView.vue"),
        meta: { requiresAuth: true, role: "user" },
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = isAuthenticated();
  const role = getUserRole();

  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isAuth) {
      return next({ name: role === "admin" ? "order-summary" : "shop" });
    }
    return next();
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuth) {
      return next({ name: "login" });
    }

    if (to.meta.role && to.meta.role !== role) {
      return next({ name: "home" });
    }

    return next();
  }

  next();
});

export default router;
