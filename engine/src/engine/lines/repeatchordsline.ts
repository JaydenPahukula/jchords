import { ChordLine } from 'src/engine/lines/chordline';
import { LineType, ParsedLine, ParseState } from 'src/engine/parse';
import { repeatChordSymbol } from 'src/symbols';
import { BarAlignmentGroup } from 'src/types/baralignmentgroup';
import { RenderOptions } from 'src/types/renderopts';

export class RepeatChordsLine implements ParsedLine {
  type = LineType.RepeatChords;

  static tryParse = (line: string, state: ParseState): ChordLine | null => {
    let lineToCopy = null;
    if (line === repeatChordSymbol && state.lastChordLine !== undefined) {
      lineToCopy = state.lastChordLine;
    } else if (
      line === repeatChordSymbol + repeatChordSymbol &&
      state.lastLastChordLine !== undefined
    ) {
      lineToCopy = state.lastLastChordLine;
    } else return null;

    // copy line
    if (state.currentBarAlignmentGroup === null)
      state.currentBarAlignmentGroup = new BarAlignmentGroup();
    const newLine = new ChordLine(
      lineToCopy.chords,
      state.timeSignature,
      state.key,
      state.currentBarAlignmentGroup,
    );
    state.currentBarAlignmentGroup.add(newLine);
    return newLine;
  };

  render = (opts: RenderOptions): string => {
    return ''; // should be unreachable
  };
}
