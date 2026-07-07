import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0288d1",
        secondary: "#e1f5fe",
        accent: "#00b0ff",
        background: "#f5fafd",
      },
    },
  },
});
