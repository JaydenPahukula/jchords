import { repeatChordSymbol } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class RepeatChordsLine implements ParsedLine {
  constructor(public precedingLineNum: 1 | 2) {}

  static tryParse = (line: string, lineNum?: number) => {
    if (line === repeatChordSymbol) return new RepeatChordsLine(1);
    else if (line == repeatChordSymbol.repeat(2)) return new RepeatChordsLine(2);
    else return null;
  };

  render = (state: RenderState): string => {
    return '';
  };
}
