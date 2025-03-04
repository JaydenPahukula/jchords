import SongInfo, { isSongInfo, makeEmptySongInfo } from './songinfo';

export default interface Song {
  info: SongInfo;
  text: string;
}

export function isSong(obj: unknown): obj is Song {
  const objAs = obj as Song;
  return !!objAs && isSongInfo(objAs.info) && typeof objAs.text === 'string';
}

export function makeEmptySong(): Song {
  return {
    info: makeEmptySongInfo(),
    text: '',
  };
}
