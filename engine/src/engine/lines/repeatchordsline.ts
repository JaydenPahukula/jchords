import { repeatChordSymbol } from 'src/constants';
import { LineType, ParsedLine } from 'src/engine/parsedline';
import { RenderError } from 'src/error';
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
      if (state.lastChordLine === null)
        throw new RenderError('No preceding chord lines', state.currentLine);

      return state.lastChordLine.render(state, opts);
    } else {
      if (state.lastLastChordLine === null)
        throw new RenderError('Not enough preceding chord lines', state.currentLine);

      return state.lastLastChordLine.render(state, opts);
    }
  };
}
