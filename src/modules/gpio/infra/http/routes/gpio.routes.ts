import { Router } from 'express';

import gpioPortValidation from '@modules/gpio/infra/http/middlewares/gpioPortValidation';

import GpioController from '../controllers/GpioController';

const gpioController = new GpioController();

const gpioRouter = Router();

gpioRouter.use(gpioPortValidation);

gpioRouter.get('/:port', gpioController.index);

gpioRouter.patch('/:port/:value', gpioController.update);

export default gpioRouter;
