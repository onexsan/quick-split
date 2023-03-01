import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  Locale,
  Button,
  Form,
  Field,
  Checkbox,
  Cell,
  CellGroup,
  ConfigProvider,
  Row,
  Col,
  Stepper,
  Collapse,
  CollapseItem,
  Popup
} from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

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

Locale.use('en-US', enUS);
app.use(Button)
app.use(Form);
app.use(Field);
app.use(Checkbox);
app.use(Cell);
app.use(CellGroup);
app.use(ConfigProvider);
app.use(Row);
app.use(Col);
app.use(Stepper);
app.use(Collapse);
app.use(CollapseItem);
app.use(Popup);

app.mount("#app");
