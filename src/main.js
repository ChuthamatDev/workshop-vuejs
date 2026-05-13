import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(require("vue-cookies"));

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Add a request interceptor to attach the auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
