import { ChordLine } from 'src/engine/lines/chordline';
import { ParsedLine } from 'src/engine/parsedline';
import { Key } from 'src/types/key';
import { TimeSignature } from 'src/types/timesignature';

/**
 * Represents the state of the renderer as it renders line by line
 */
export type RenderState = {
  key: Key | undefined;
  timeSignature: TimeSignature | undefined;
  currentLine: number;
  lines: ParsedLine[];
  lastChordLine: ChordLine | undefined;
  lastLastChordLine: ChordLine | undefined;
  currentSection: string | undefined;
};
