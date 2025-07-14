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

  constructor(ts: TimeSignature, valid: boolean) {
    this.ts = ts;
    this.valid = valid;
  }

  static tryParse = (line: string, state: ParseState): TimeSignatureLine | null => {
    const match = line.match(/^([0-9]{1,2})\/([0-9]{1,2})$/);
    if (match === null || match[1] == null || match[2] == null) return null;

    const ts: TimeSignature = [parseInt(match[1]), parseInt(match[2])];

    // checking if time signature is valid
    let valid = false;
    for (const allowedTimeSignature of allowedTimeSignatures) {
      if (allowedTimeSignature[0] === ts[0] && allowedTimeSignature[1] === ts[1]) {
        valid = true;
        break;
      }
    }
    if (valid) state.timeSignature = ts;

    return new TimeSignatureLine(ts, valid);
  };

  render = (opts: RenderOptions, state: RenderState): string => {
    if (this.valid) {
      return `<span class="${timeSignatureLineClassName}">${this.ts[0]}/${this.ts[1]}<br /></span>`;
    } else {
      return `<span class="${timeSignatureLineClassName}"><span class="${errorClassName}">${this.ts[0]}</span>/<span class="${errorClassName}">${this.ts[1]}</span><br /></span>`;
    }
  };
}
