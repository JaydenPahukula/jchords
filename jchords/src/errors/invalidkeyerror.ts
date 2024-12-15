export default class InvalidKeyError extends Error {
  constructor(key: string) {
    super(`Invalid key: ${key}`);
    this.name = 'InvalidKeyError';
  }
}
