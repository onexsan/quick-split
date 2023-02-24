import { createApp } from "vue";
import { createPinia } from "pinia";
import { Button, Form, Field, Checkbox, CellGroup, ConfigProvider, Row, Col } from 'vant';
import 'vant/lib/index.css';

import App from "./App.vue";
import router from "./router";

import "./assets/styles/main.scss";

import calcModule from "./modules/calc";
import calcItemizedModule from "./modules/calcItemized";

import { registerModules } from "./register-modules";

const app = createApp(App);

registerModules({
  calc: calcModule,
  calcItemized: calcItemizedModule
});

app.use(createPinia());
app.use(router);

app.use(Button)
app.use(Form);
app.use(Field);
app.use(Checkbox);
app.use(CellGroup);
app.use(ConfigProvider);
app.use(Row);
app.use(Col);

app.mount("#app");
