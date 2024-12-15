/**
 * Modulus that returns a positive number [0, m)
 */
export default function posMod(n: number, m: number): number {
  return ((n % m) + m) % m;
}
