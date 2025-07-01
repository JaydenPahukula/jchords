export class RenderError extends Error {
  lineNum?: number;

  constructor(message: string, lineNum?: number) {
    super(message);
    this.name = 'RenderError';
    this.lineNum = lineNum;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, RenderError.prototype);
  }
}
