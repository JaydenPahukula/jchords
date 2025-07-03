import { LineType, ParsedLine } from 'src/engine/parsedline';
import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';

/**
 * Represents an empty line (or line full of whitespace)
 */
export class EmptyLine implements ParsedLine {
  type = LineType.Empty;

  constructor() {}

  static tryParse = (line: string): EmptyLine | null => {
    const match = line.match(/^\s*$/);
    if (match) return new EmptyLine();
    return null;
  };

  render(state: RenderState, opts: RenderOptions): string {
    throw new Error('Method not implemented.');
  }
}
