import gpio from 'tinker-gpio';

import { Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

import OpenPort from '@modules/gpio/services/OpenPortService';

import ClosePort from '@modules/gpio/services/ClosePortService';

import ReadPort from '@modules/gpio/services/ReadPortService';

import WriteToPort from '@modules/gpio/services/WriteToPortService';

interface IPinRequestInterface {
  port: string;
}

interface IReadPinRequestInterface extends IPinRequestInterface {
  mode: 'input' | 'output';
}

interface IWritePinRequestInterface extends IPinRequestInterface {
  value: string;
}

export default class GpioController {
  public async index(
    request: Request<IReadPinRequestInterface>,
    response: Response,
  ): Promise<Response> {
    const { port: portString, mode } = request.params;
    try {
      const openPort = new OpenPort(gpio);

      const closePort = new ClosePort(gpio);

      const readPort = new ReadPort(gpio);

      const port = parseInt(portString, 10);

      await openPort.execute({ port, mode });

      const value = await readPort.execute({ port });

      await closePort.execute({ port });

      return response.json(value);
    } catch (err) {
      throw new AppError('Error with gpio.', 500);
    }
  }

  public async update(
    request: Request<IWritePinRequestInterface>,
    response: Response,
  ): Promise<Response> {
    const { port: portString, value: valueString } = request.params;

    const value = parseInt(valueString, 10);

    const port = parseInt(portString, 10);

    if (value !== 0 && value !== 1) {
      throw new AppError('Invalid value to write to pin.', 400);
    }

    try {
      const openPort = new OpenPort(gpio);

      const closePort = new ClosePort(gpio);

      const writePort = new WriteToPort(gpio);

      await openPort.execute({ port, mode: 'output' });

      await writePort.execute({ port, value });

      await closePort.execute({ port });

      return response.status(204).send();
    } catch (err) {
      throw new AppError('Error with gpio.', 500);
    }
  }
}
