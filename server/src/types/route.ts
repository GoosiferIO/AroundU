import { RequestHandler } from 'express';

type RouteConfig = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  validator: RequestHandler;
  middleware: RequestHandler[];
  controller: RequestHandler;
};

type Route = RouteConfig;
export default Route;
