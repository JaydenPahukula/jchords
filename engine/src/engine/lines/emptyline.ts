import { emptyLineClassName } from 'src/constants/classes';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { RenderOptions } from 'src/types/renderopts';

/**
 * Represents an empty line (or line full of whitespace)
 */
export class EmptyLine implements ParsedLine {
  type = LineType.Empty;

  constructor() {}

  static tryParse = (line: string, state: ParseState): EmptyLine | null => {
    const match = line.match(/^\s*$/);
    if (!match) return null;

    // resetting bar width alignment groups
    state.barAlignmentGroups.push(state.currentBarAlignmentGroup);
    state.currentBarAlignmentGroup = [];

    return new EmptyLine();
  };

  render(opts: RenderOptions, state: RenderState): string {
    return `<span class="${emptyLineClassName}"><br /></span>`;
  }
}
