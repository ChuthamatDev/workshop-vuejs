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
      // {
      //   path: "/education",
      //   name: "education",
      //   component: () => import("../views/EducationView.vue"),
      // },
      // {
      //   path: "/hobbie",
      //   name: "hobbie",
      //   component: () => import("../views/HobbiesView.vue"),
      // },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      // {
      //   path: "/api",
      //   name: "api",
      //   component: () => import("../views/APIView.vue"),
      // },
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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
