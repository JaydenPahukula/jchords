export function isDef<T>(x: T | null | undefined): x is T {
  return x != null;
}

const digits = new Set<string>(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
export function isNumeric(str: string) {
  return Array.from(str).every((c) => digits.has(c));
}
