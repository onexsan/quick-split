import type { Router } from 'vue-router'
const CalcItemizedView = () => import('./views/CalcItemizedView.vue');

const moduleRoute = {
  path: '/itemized',
  name: 'CalcItemizedView',
  component: CalcItemizedView,
};

export default (router: Router) => {
  router.addRoute(moduleRoute);
};
