import Vue from "vue";
import VueRouter from "vue-router";
import Container from "@/components/Container.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/LoginView.vue"),
      },
      {
        path: "/resigter",
        name: "resigter",
        component: () => import("../views/auth/ResigterView.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "/login-admin",
        name: "login-admin",
        component: () => import("../views/auth/LoginAdminView.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/auth/UserView.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/OrderView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
