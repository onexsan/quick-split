const CalcView = () => import("./views/CalcView.vue");

const moduleRoute = {
  path: "/",
  name: 'CalcView',
  component: CalcView
};

export default (router) => {
  router.addRoute(moduleRoute);
};
