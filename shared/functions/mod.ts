/** Basic mod function, always returns a non-negative number */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
