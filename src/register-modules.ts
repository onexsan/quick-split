import router from './router';
import type { Router } from 'vue-router'

interface ModuleType {
  router: (router: Router) => void;
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
