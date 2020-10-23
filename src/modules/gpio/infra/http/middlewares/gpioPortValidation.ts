import { NextFunction, Request, Response } from 'express';

import gpioPorts from '@modules/gpio/constants/gpioPorts';

import AppError from '@shared/errors/AppError';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { port } = request.params;

  if (!gpioPorts.includes(parseInt(port, 10))) {
    throw new AppError('Invalid GPIO port.', 400);
  } else return next();
}
