import type { App } from 'vue'
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
  Popup,
} from 'vant';
import 'vant/lib/index.css';
import enUS from 'vant/es/locale/lang/en-US';

export const addVantLibrary = (app: App) => {
  Locale.use('en-US', enUS);
  app.use(Button);
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
};