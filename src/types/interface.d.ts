interface GObj<T = any> {
  [K: string]: T;
  [K: number]: T;
}

type GFn<T = any, U = any> = (...p: T[]) => U | void;

type strnum = string | number;
