export function isDef<T>(x: T | null | undefined): x is T {
  return x != null;
}