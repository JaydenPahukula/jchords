import { Song } from 'shared/types/song';

export interface Tab {
  song: Song;
  new: boolean;
  modified: boolean;
}
