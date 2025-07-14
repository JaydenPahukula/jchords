import { repeatChordSymbol } from 'src/constants/symbols';
import { ChordLine } from 'src/engine/lines/chordline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { RenderState } from 'src/engine/render';
import { RenderOptions } from 'src/types/renderopts';

export class RepeatChordsLine implements ParsedLine {
  type = LineType.RepeatChords;

  static tryParse = (line: string, state: ParseState): ChordLine | null => {
    if (line === repeatChordSymbol && state.lastChordLine !== undefined) {
      return new ChordLine(
        state.lastChordLine.chords,
        state.timeSignature,
        state.key,
        state.lastChordLine.originalLine,
      );
    } else if (
      line === repeatChordSymbol + repeatChordSymbol &&
      state.lastLastChordLine !== undefined
    ) {
      return new ChordLine(
        state.lastLastChordLine.chords,
        state.timeSignature,
        state.key,
        state.lastLastChordLine.originalLine,
      );
    } else return null;
  };

  render = (opts: RenderOptions, state: RenderState): string => {
    return ''; // should be unreachable
  };
}
