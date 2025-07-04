import { allowedTimeSignatures, errorClassName, timeSignatureLineClassName } from 'src/constants';
import { LineType, ParsedLine } from 'src/engine/parsedline';
import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';
import { TimeSignature } from 'src/types/timesignature';

export class TimeSignatureLine implements ParsedLine {
  type = LineType.TimeSignature;

  ts: TimeSignature;
  valid: boolean;

  constructor(upper: number, lower: number) {
    this.ts = { upper: upper, lower: lower };
    // checking if time signature is valid
    this.valid = false;
    for (const allowedTimeSignature of allowedTimeSignatures) {
      if (
        allowedTimeSignature.upper === this.ts.upper &&
        allowedTimeSignature.lower === this.ts.lower
      ) {
        this.valid = true;
        break;
      }
    }
  }

  static tryParse = (line: string): TimeSignatureLine | null => {
    const match = line.match(/^([0-9]{1,2})\/([0-9]{1,2})$/);
    if (match === null || match[1] == null || match[2] == null) return null;

    return new TimeSignatureLine(parseInt(match[1]), parseInt(match[2]));
  };

  render = (state: RenderState, opts: RenderOptions): string => {
    if (this.valid) {
      state.timeSignature = this.ts;
      return `<span class="${timeSignatureLineClassName}">${this.ts.upper}/${this.ts.lower}<br /></span>`;
    } else {
      return `<span class="${timeSignatureLineClassName}"><span class="${errorClassName}">${this.ts.upper}</span>/<span class="${errorClassName}">${this.ts.lower}</span><br /></span>\n`;
    }
  };
}
