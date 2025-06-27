import { repeatChordSymbol } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class RepeatChordsLine implements ParsedLine {
  lineNum: number;
  precedingLineNum: 1 | 2;

  constructor(lineNum: number, precedingLineNum: 1 | 2) {
    this.lineNum = lineNum;
    this.precedingLineNum = precedingLineNum;
  }

  static tryParse = (line: string, lineNum: number): RepeatChordsLine | null => {
    if (line === repeatChordSymbol) return new RepeatChordsLine(lineNum, 1);
    else if (line == repeatChordSymbol.repeat(2)) return new RepeatChordsLine(lineNum, 2);
    else return null;
  };

  render = (state: RenderState): string => {
    return '';
  };
}
