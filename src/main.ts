import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/styles/main.scss';

import calcModule from './modules/calc';
import calcItemizedModule from './modules/calcItemized';

import { registerModules } from './register-modules';
import { addVantLibrary } from './plugins/vant';

const app = createApp(App);

registerModules({
  calc: calcModule,
  calcItemized: calcItemizedModule,
});

app.use(createPinia());
app.use(router);
addVantLibrary(app)

app.mount('#app');
