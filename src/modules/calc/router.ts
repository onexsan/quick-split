import type { Router } from 'vue-router'
const CalcView = () => import('./views/CalcView.vue');

const moduleRoute = {
  path: '/',
  name: 'Home',
  component: CalcView,
};

export default (router: Router) => {
  router.addRoute(moduleRoute);
};
