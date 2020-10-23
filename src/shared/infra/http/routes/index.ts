import { Router } from 'express';

import gpioRouter from '@modules/gpio/infra/http/routes/gpio.routes';

const routes = Router();

routes.use('/gpio', gpioRouter);

export default routes;
