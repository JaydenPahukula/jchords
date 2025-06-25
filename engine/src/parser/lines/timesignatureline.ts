import { ParserError } from 'src/classes/parsererror';
import { allowedTimeSignatures } from 'src/constants';
import { ParsedLine } from 'src/parser/parsedline';
import { RenderState } from 'src/types/renderstate';

export class TimeSignatureLine implements ParsedLine {
  constructor(
    public numerator: number,
    public denominator: number,
  ) {}

  static tryParse = (line: string, lineNum?: number) => {
    if (!allowedTimeSignatures.includes(line)) return null;

    const matches = line.match(/^([0-9]{1,2})\/([0-9]{1,2})$/);
    if (matches === null || matches[1] == null || matches[2] == null)
      throw new ParserError('Failed to parse time signature', lineNum);

    return new TimeSignatureLine(parseInt(matches[1]), parseInt(matches[2]));
  };

  render = (state: RenderState): string => {
    return '';
  };
}
