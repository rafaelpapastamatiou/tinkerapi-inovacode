import AppError from '@shared/errors/AppError';
import IGpio from '../interfaces/IGpio';

interface IRequest {
  port: number;
}

export default class OpenPortService {
  // eslint-disable-next-line prettier/prettier
  constructor(private gpio: IGpio) { }

  public async execute({ port }: IRequest): Promise<0 | 1> {
    return this.gpio.read(port, (readingError, value) => {
      if (readingError) {
        console.log(readingError);
        throw new AppError('Error when reading GPIO pin value.', 500);
      }
      return value;
    });
  }
}
