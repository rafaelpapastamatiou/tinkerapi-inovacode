import AppError from '@shared/errors/AppError';
import IGpio from '../interfaces/IGpio';

interface IRequest {
  port: number;
}

export default class ClosePortService {
  // eslint-disable-next-line prettier/prettier
  constructor(private gpio: IGpio) { }

  public async execute({ port }: IRequest): Promise<boolean> {
    await this.gpio.close(port, openingError => {
      if (openingError) {
        throw new AppError('Error when closing GPIO pin.', 500);
      }
    });
    return true;
  }
}
