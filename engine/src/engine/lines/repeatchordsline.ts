import { repeatChordSymbol } from 'src/constants/symbols';
import { ChordLine } from 'src/engine/lines/chordline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderError } from 'src/error';
import { RenderOptions } from 'src/types/renderopts';

export class RepeatChordsLine implements ParsedLine {
  type = LineType.RepeatChords;

  static tryParse = (line: string, state: ParseState): ChordLine | null => {
    if (line === repeatChordSymbol && state.lastChordLine !== undefined) {
      return new ChordLine(state.lastChordLine.chords, state.lastChordLine.originalLine);
    } else if (
      line === repeatChordSymbol + repeatChordSymbol &&
      state.lastLastChordLine !== undefined
    ) {
      return new ChordLine(state.lastLastChordLine.chords, state.lastLastChordLine.originalLine);
    } else return null;
  };

  render = (opts: RenderOptions): string => {
    throw new RenderError('Tried to render repeat chords line (should be unreachable)');
  };
}
