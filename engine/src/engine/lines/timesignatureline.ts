import { allowedTimeSignatures } from 'src/constants';
import { errorClassName, timeSignatureLineClassName } from 'src/constants/classes';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { RenderOptions } from 'src/types/renderopts';
import { TimeSignature } from 'src/types/timesignature';

export class TimeSignatureLine implements ParsedLine {
  type = LineType.TimeSignature;

  ts: TimeSignature;
  // is the time signature allowed
  valid: boolean;

  constructor(upper: number, lower: number) {
    this.ts = [upper, lower];

    // checking if time signature is valid
    this.valid = false;
    for (const allowedTimeSignature of allowedTimeSignatures) {
      if (allowedTimeSignature[0] === this.ts[0] && allowedTimeSignature[1] === this.ts[1]) {
        this.valid = true;
        break;
      }
    }
  }

  static tryParse = (line: string, state: ParseState): TimeSignatureLine | null => {
    const match = line.match(/^([0-9]{1,2})\/([0-9]{1,2})$/);
    if (match === null || match[1] == null || match[2] == null) return null;

    return new TimeSignatureLine(parseInt(match[1]), parseInt(match[2]));
  };

  render = (opts: RenderOptions, state: RenderState): string => {
    if (this.valid) {
      return `<span class="${timeSignatureLineClassName}">${this.ts[0]}/${this.ts[1]}<br /></span>`;
    } else {
      return `<span class="${timeSignatureLineClassName}"><span class="${errorClassName}">${this.ts[0]}</span>/<span class="${errorClassName}">${this.ts[1]}</span><br /></span>`;
    }
  };
}
