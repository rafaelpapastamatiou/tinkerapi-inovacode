import AppError from '@shared/errors/AppError';
import IGpio from '../interfaces/IGpio';

interface IRequest {
  port: number;
  mode: 'input' | 'output';
}

export default class OpenPortService {
  // eslint-disable-next-line prettier/prettier
  constructor(private gpio: IGpio) { }

  public async execute({ port, mode = 'input' }: IRequest): Promise<boolean> {
    await this.gpio.open(port, mode, openingError => {
      if (openingError) {
        throw new AppError('Error when opening GPIO pin.', 500);
      }
    });
    return true;
  }
}
