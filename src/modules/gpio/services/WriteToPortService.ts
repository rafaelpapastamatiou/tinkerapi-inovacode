import AppError from '@shared/errors/AppError';
import IGpio from '../interfaces/IGpio';

interface IRequest {
  port: number;
  value: 0 | 1;
}

export default class WriteToPortService {
  // eslint-disable-next-line prettier/prettier
  constructor(private gpio: IGpio) { }

  public async execute({ port, value }: IRequest): Promise<boolean> {
    await this.gpio.write(port, value, readingError => {
      if (readingError) {
        throw new AppError('Error when writing to GPIO pin.', 500);
      }
    });

    return true;
  }
}
