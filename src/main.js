import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/fonts/fonts.css';
import './assets/style/normalize.css';
import './assets/style/style.css';

import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
