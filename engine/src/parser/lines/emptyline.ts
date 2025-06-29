import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

/**
 * Represents an empty line (or line full of whitespace)
 */
export class EmptyLine implements ParsedLine {
  constructor() {}

  static tryParse = (line: string): EmptyLine | null => {
    const match = line.match(new RegExp(`^\\s*$`));
    if (match) return new EmptyLine();
    return null;
  };

  render(state: RenderState): string {
    throw new Error('Method not implemented.');
  }
}
