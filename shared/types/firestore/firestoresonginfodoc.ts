import { SongInfo, isSongInfo } from 'shared/types/songinfo';

export type FirestoreSongInfoDoc = SongInfo;

export function isFirestoreSongInfoDoc(obj: unknown): obj is FirestoreSongInfoDoc {
  return isSongInfo(obj);
}
