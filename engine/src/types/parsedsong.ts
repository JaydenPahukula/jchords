import { ParsedLine } from 'src/engine/parse';
import { Key } from 'src/types/key';

export type ParsedSong = {
  startingKey: Key;
  lines: ParsedLine[];
};
