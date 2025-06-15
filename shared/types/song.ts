import {
  generateInterfaceChecker,
  isString,
  ObjectOf,
} from 'shared/functions/generateInterfaceChecker';
import { isSongInfo, makeEmptySongInfo, SongInfo } from 'shared/types/songinfo';

export interface Song {
  info: SongInfo;
  text: string;
}

export const isSong = generateInterfaceChecker<Song>({
  text: isString,
  info: ObjectOf(isSongInfo),
});

export function makeEmptySong(): Song {
  return {
    info: makeEmptySongInfo(),
    text: '',
  };
}
