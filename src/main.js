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
    const token = VueCookies.get("user_token");
    const token_admin = VueCookies.get("admin_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (token_admin) {
      config.headers["Authorization"] = `Bearer ${token_admin}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
