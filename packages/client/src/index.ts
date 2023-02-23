import { createApp } from 'vue';
import App from './App.vue';
import 'vuetify/styles';

import router from './router';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify();
const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');
