export const isType =
  <T = any>(type: string) =>
  (val: T) =>
    Object.prototype.toString.call(val) === `[object ${type}]`;

export const isObject = (val: object) =>
  typeof val === 'function' || (typeof val === 'object' && !!val);

export const isEmptyObject = (val: object) =>
  isObject(val) && JSON.stringify(val) == '{}';

export const isArray = (val: any) => Array.isArray(val);

export const isArguments = isType('Arguments');

export const isNull = isType('Null');

export const isNumber = isType('Number');

export const isString = isType('String');

export const isBoolean = isType('Boolean');

export const isFunction = isType('Function');

export const isPromise = isType('Promise');

export const isDate = isType('Date');

export const isRegExp = isType('RegExp');

export const isMap = isType('Map');

export const isSet = isType('Set');

export const isSymbol = isType('Symbol');

export const isError = isType('Error');

export const isUndefined = isType('Undefined');

export const isEmpty = (val?: null) => isNull(val) || isUndefined(val);

export const isNaN = (val: number) => Number.isNaN(val);

export const isElement = (val: HTMLElement) =>
  isObject(HTMLElement)
    ? val instanceof HTMLElement
    : isObject(val) && isString(val.nodeName) && val.nodeType === 1;
