import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;
Vue.use(require("vue-cookies"));
Vue.use(VueCookies);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(
  (config) => {
    const userToken = VueCookies.get("user_token");
    const adminToken = VueCookies.get("admin_token");

    const isAdminRoute =
      config.url.includes("/admin") || config.url.includes("/users");

    if (isAdminRoute && adminToken) {
      config.headers["Authorization"] = `Bearer ${adminToken}`;
    } else if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
