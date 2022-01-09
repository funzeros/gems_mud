export * from './type';
export * from './common';
export class Utils {
  public forOf<T>(list: T[], callback: (m: T) => void) {
    function* genForFn() {
      let i = 0;
      while (1) {
        yield list[i++];
      }
    }
    const genFor = genForFn();
    while (1) {
      const { value } = genFor.next();
      if (value) {
        callback(value);
      } else {
        break;
      }
    }
  }
}
