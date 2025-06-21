export class ParserError extends Error {
  lineNum?: number;

  constructor(message: string, lineNum?: number) {
    super(message);
    this.name = 'ParserError';
    this.lineNum = lineNum;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, ParserError.prototype);
  }
}
