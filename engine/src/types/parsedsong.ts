import { ChordLine } from 'src/engine/lines/chordline';
import { ParsedLine } from 'src/engine/parse';
import { Key } from 'src/types/key';

export type ParsedSong = {
  startingKey: Key | undefined;
  lines: ParsedLine[];
  barAlignmentGroups: ChordLine[][];
};
