const CalcItemizedView = () => import('./views/CalcItemizedView.vue');

const moduleRoute = {
  path: '/itemized',
  name: 'CalcItemizedView',
  component: CalcItemizedView,
};

export default (router: any) => {
  router.addRoute(moduleRoute);
};
