import { cmAccidental } from 'shared/types/cm/cmaccidental';
import { cmKey } from 'shared/types/cm/cmkey';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface cmSongLine {} // TODO

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface cmSongChord {} // TODO

interface cmKeyDeclaration {
  string: cmKey;
  accidentals: cmAccidental;
}

interface cmSongKeys {
  auto: cmKeyDeclaration | undefined;
  explicit: cmKeyDeclaration[];
}

export interface cmSong {
  allLines: cmSongLine[];
  allChords: cmSongChord[];
  allKeys: cmSongKeys;
}
