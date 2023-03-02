import router from './router';

interface ModuleType {
  router: (router: any) => void;
}
interface Module {
  [key: string]: ModuleType;
}

const registerModule = (module: ModuleType) => {
  if (module.router) {
    module.router(router);
  }
};

export const registerModules = (modules: Module) => {
  Object.values(modules).forEach(module => {
    registerModule(module);
  });
};
