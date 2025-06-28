import { allowedTimeSignatures } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class TimeSignatureLine implements ParsedLine {
  numerator: number;
  denominator: number;

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator;
    this.denominator = denominator;
  }

  static tryParse = (line: string): TimeSignatureLine | null => {
    if (!allowedTimeSignatures.includes(line)) return null;

    const matches = line.match(/^([0-9]{1,2})\/([0-9]{1,2})$/);
    if (matches === null || matches[1] == null || matches[2] == null) return null;

    return new TimeSignatureLine(parseInt(matches[1]), parseInt(matches[2]));
  };

  render = (state: RenderState): string => {
    return '';
  };
}
