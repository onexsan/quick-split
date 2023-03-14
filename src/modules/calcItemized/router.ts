import type { Router } from 'vue-router'

const moduleRoute = {
  path: '/itemized',
  name: 'CalcItemizedView',
  component: () => import('./views/CalcItemizedView.vue'),
};

export default (router: Router) => {
  router.addRoute(moduleRoute);
};
