import { ChordLine } from 'src/engine/lines/chordline';
import { ParsedLine } from 'src/engine/parsedline';

/**
 * Represents the state of the renderer as it renders line by line
 */
export type RenderState = {
  currentLine: number;
  lines: ParsedLine[];
  lastChordLine: ChordLine | null;
  lastLastChordLine: ChordLine | null;
};
