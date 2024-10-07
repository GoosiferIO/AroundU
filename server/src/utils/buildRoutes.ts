import { Router } from 'express';
import Route from '@/types/route';

const buildRoutes = (routes: Route[]): Router => {
  const router = Router();
  routes.forEach((route) => {
    const { method, path, validator, middleware, controller } = route;
    router[method](path, validator, ...middleware, controller);
  });
  return router;
};

export default buildRoutes;
