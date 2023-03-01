import { createApp } from 'vue';
import App from './App.vue';

import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import Toast from 'vue-toastification';

import '@mdi/font/css/materialdesignicons.css';
import 'vue-toastification/dist/index.css';
import 'vuetify/styles';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
const app = createApp(App);

app.use(vuetify);
app.use(Toast, { position: 'bottom-right', hideProgressBar: true });

app.mount('#app');
