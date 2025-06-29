import { keyDeclarationKeyword } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

/**
 * Represents a parsed key declaration line. Does not fully validate the key at
 * parse time.
 */
export class KeyDeclarationLine implements ParsedLine {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  static tryParse = (line: string): KeyDeclarationLine | null => {
    const match = line.match(new RegExp(`^${keyDeclarationKeyword}\\s+([\\w#]{1,3})$`));
    if (match === null || match[1] == null) return null;

    return new KeyDeclarationLine(match[1]);
  };

  render(state: RenderState): string {
    throw new Error('Method not implemented.');
  }
}
