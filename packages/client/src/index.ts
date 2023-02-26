import { createApp } from 'vue';
import App from './App.vue';

import { createVuetify } from 'vuetify';
import Toast from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import 'vuetify/styles';

const vuetify = createVuetify();
const app = createApp(App);

app.use(vuetify);
app.use(Toast, { position: 'bottom-right', hideProgressBar: true });

app.mount('#app');
