import { errorClassName, repeatChordSymbol } from 'src/constants';
import { LineType, ParsedLine } from 'src/engine/parsedline';
import { RenderOptions } from 'src/types/renderopts';
import { RenderState } from 'src/types/renderstate';

export class RepeatChordsLine implements ParsedLine {
  type = LineType.RepeatChords;

  precedingLineNum: 1 | 2;

  constructor(precedingLineNum: 1 | 2) {
    this.precedingLineNum = precedingLineNum;
  }

  static tryParse = (line: string): RepeatChordsLine | null => {
    if (line === repeatChordSymbol) return new RepeatChordsLine(1);
    else if (line == repeatChordSymbol.repeat(2)) return new RepeatChordsLine(2);
    else return null;
  };

  render = (state: RenderState, opts: RenderOptions): string => {
    if (this.precedingLineNum === 1) {
      if (state.lastChordLine === undefined)
        return `<span class="${errorClassName}">%<br /></span>\n`;

      return state.lastChordLine.render(state, opts);
    } else {
      if (state.lastLastChordLine === undefined)
        return `<span class="${errorClassName}">%%<br /></span>\n`;

      return state.lastLastChordLine.render(state, opts);
    }
  };
}
