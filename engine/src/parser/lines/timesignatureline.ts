import { ParserError } from 'src/classes/parsererror';
import { allowedTimeSignatures } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class TimeSignatureLine implements ParsedLine {
  lineNum: number;
  numerator: number;
  denominator: number;

  constructor(lineNum: number, numerator: number, denominator: number) {
    this.lineNum = lineNum;
    this.numerator = numerator;
    this.denominator = denominator;
  }

  static tryParse = (line: string, lineNum: number): TimeSignatureLine | null => {
    if (!allowedTimeSignatures.includes(line)) return null;

    const matches = line.match(/^([0-9]{1,2})\/([0-9]{1,2})$/);
    if (matches === null || matches[1] == null || matches[2] == null)
      throw new ParserError('Failed to parse time signature', lineNum);

    return new TimeSignatureLine(lineNum, parseInt(matches[1]), parseInt(matches[2]));
  };

  render = (state: RenderState): string => {
    return '';
  };
}
