import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ScrapController from './app/controllers/ScrapController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/scraps', ScrapController.index);

routes.post('/scraps', ScrapController.store);

export default routes;
