import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#CFECF3',
        secondary: '#DAF9DE',
        accent: '#F6FFDC',
        background: '#DAF9DE'
      }
    }
  }
});
