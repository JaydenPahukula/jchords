type ObjectOf<T> = {
  [key: string]: T;
};

export default ObjectOf;

export function isObjectOf<T>(obj: unknown, validator: (value: T) => boolean): obj is ObjectOf<T> {
  const objAs = obj as ObjectOf<T>;
  const keys = Object.getOwnPropertyNames(obj);
  return !!obj && keys.every((key) => typeof key === 'string' && validator(objAs[key]));
}
