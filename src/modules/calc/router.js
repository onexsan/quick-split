const CalcView = () => import("./views/CalcView.vue");

const moduleRoute = {
  path: "/",
  name: 'Home',
  component: CalcView
};

export default (router) => {
  router.addRoute(moduleRoute);
};
