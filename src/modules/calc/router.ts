import type { Router } from 'vue-router'

const moduleRoute = {
  path: '/',
  name: 'Home',
  component: () => import('./views/CalcView.vue')
};

export default (router: Router) => {
  router.addRoute(moduleRoute);
};
