import { emptyLineClassName } from 'src/constants/classes';
import { LineType, ParsedLine } from 'src/engine/parse';
import { RenderOptions } from 'src/types/renderopts';

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

  render(opts: RenderOptions): string {
    return `<span class="${emptyLineClassName}"><br /></span>`;
  }
}
