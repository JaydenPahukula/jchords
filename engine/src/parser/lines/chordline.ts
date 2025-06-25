import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class ChordLine implements ParsedLine {
  constructor() {}

  render = (state: RenderState): string => {
    return '';
  };
}
