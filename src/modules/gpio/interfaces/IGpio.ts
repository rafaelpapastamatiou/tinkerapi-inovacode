export default interface IGpio {
  open: (
    pinNumber: number,
    options: string,
    callback: (err: Error | null | undefined) => void,
  ) => Promise<void>;

  close: (
    pinNumber: number,
    callback: (err: Error | null | undefined) => void,
  ) => Promise<void>;

  setDirection: (
    pinNumber: number,
    direction: 'input' | 'in' | 'output' | 'out',
    callback: (err: Error | null | undefined) => void,
  ) => Promise<void>;

  getDirection: (
    pinNumber: number,
    callback: (err: Error | null | undefined, value: 'in' | 'out') => void,
  ) => Promise<void>;

  read: (
    pinNumber: number,
    callback: (err: Error | null | undefined, value: 0 | 1) => 0 | 1,
  ) => Promise<0 | 1>;

  write: (
    pinNumber: number,
    value: 0 | 1,
    callback: (err: Error | null | undefined) => void,
  ) => Promise<boolean>;
}
