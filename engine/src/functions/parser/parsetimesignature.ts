import { ParserError } from 'src/classes/parsererror';
import { TimeSignatureLine } from 'src/classes/timesignatureline';
import { allowedTimeSignatures } from 'src/constants';

export function parseTimeSignature(line: string, lineNum?: number): TimeSignatureLine | null {
  if (!allowedTimeSignatures.includes(line)) return null;

  const matches = line.match(/^([0-9]{1,2})\/([0-9]{1,2})$/);
  if (matches === null || matches[1] == null || matches[2] == null)
    throw new ParserError('Failed to parse time signature', lineNum);

  return new TimeSignatureLine(parseInt(matches[1]), parseInt(matches[2]));
}
