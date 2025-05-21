import { Accidental } from 'shared/enums/accidental';
import { Key } from 'shared/enums/key';
import { Mode } from 'shared/enums/mode';
import { cmSong } from 'shared/types/cm/cmsong';
import { Song } from 'shared/types/song';

export interface ParsedSong extends Song {
  parsed: cmSong;
  defaultKey: Key;
  defaultAccidental: Accidental;
  mode: Mode;
}
