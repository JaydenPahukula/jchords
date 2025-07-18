import { ParsedLine } from 'src/engine/parse';
import { Key } from 'src/types/key';

export interface ParsedSong {
  startingKey: Key | undefined;
  lines: ParsedLine[];
}
