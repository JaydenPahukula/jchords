import { isBoolean as _isBoolean } from 'shared/functions/lambdas/isboolean';
import { isNumber as _isNumber } from 'shared/functions/lambdas/isnumber';
import { isString as _isString } from 'shared/functions/lambdas/isstring';

type TypeCheck<T> = (obj: unknown) => obj is T;

export const isString: TypeCheck<string> = _isString;
export const isNumber: TypeCheck<number> = _isNumber;
export const isBoolean: TypeCheck<boolean> = _isBoolean;

export const Optional =
  <T>(check: TypeCheck<T>) =>
  (x: unknown) =>
    typeof x === 'undefined' || check(x);

export const ArrayOf =
  <T>(check: TypeCheck<T>) =>
  (x: unknown) =>
    Array.isArray(x) && x.every(check);

export const ObjectOf =
  <T extends object>(check: TypeCheck<T>) =>
  (x: unknown) =>
    check(x);

export function generateInterfaceChecker<T>(structure: {
  [K in keyof T]: TypeCheck<T[K]>;
}): (obj: unknown) => obj is T {
  return function (obj): obj is T {
    if (obj === null || typeof obj !== 'object') return false;
    for (const key in structure) {
      const check: TypeCheck<T[keyof T]> = structure[key];
      if (!check(obj[key as keyof typeof obj])) return false;
    }
    return true;
  };
}
