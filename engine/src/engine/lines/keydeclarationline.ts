import { keyDeclarationKeyword } from 'src/constants';
import { LineType, ParsedLine } from 'src/engine/parsedline';
import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';

/**
 * Represents a parsed key declaration line. Does not fully validate the key at
 * parse time.
 */
export class KeyDeclarationLine implements ParsedLine {
  type = LineType.KeyDeclaration;

  key: string;
  static regex = new RegExp(`^${keyDeclarationKeyword}\\s+([\\w#]{1,3})$`);

  constructor(key: string) {
    this.key = key;
  }

  static tryParse = (line: string): KeyDeclarationLine | null => {
    const match = line.match(KeyDeclarationLine.regex);
    if (match === null || match[1] == null) return null;

    return new KeyDeclarationLine(match[1]);
  };

  render(state: RenderState, opts: RenderOptions): string {
    throw new Error('Method not implemented.');
  }
}
