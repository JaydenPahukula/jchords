import { generateInterfaceChecker, isString } from 'shared/functions/generateInterfaceChecker';

export interface SongInfo {
  id: string;
  title: string;
  artist: string;
  author: string;
}

export const isSongInfo = generateInterfaceChecker<SongInfo>({
  id: isString,
  title: isString,
  artist: isString,
  author: isString,
});

export function makeEmptySongInfo(): SongInfo {
  return {
    id: '',
    title: '',
    artist: '',
    author: '',
  };
}
