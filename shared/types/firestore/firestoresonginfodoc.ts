import SongInfo, { isSongInfo } from 'shared/types/songinfo';

type FirestoreSongInfoDoc = SongInfo;

export default FirestoreSongInfoDoc;

export function isFirestoreSongInfoDoc(obj: unknown): obj is FirestoreSongInfoDoc {
  return isSongInfo(obj);
}
