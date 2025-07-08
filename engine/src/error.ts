export class RenderError extends Error {
  lineNum?: number;

  constructor(message: string, lineNum?: number) {
    super(message);
    this.name = 'RenderError';
    this.lineNum = lineNum;

    // set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, RenderError.prototype);
  }
}

export class ParserError extends Error {
  lineNum?: number;

  constructor(message: string, lineNum?: number) {
    super(message);
    this.name = 'ParserError';
    this.lineNum = lineNum;

    // set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, ParserError.prototype);
  }
}
