import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import SongNotFoundError from 'src/shared/errors/songnotfounderror';
import app from 'src/shared/firebase/app';
import Song, { isSong } from 'src/shared/types/song';
import SongInfo, { isSongInfo } from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';

const db = getFirestore(app);

function hasId(obj: { [key: string]: any }): obj is { id: string } {
  return obj.hasOwnProperty('id');
}

function checkId(document: QueryDocumentSnapshot): { id: string } | undefined {
  const data = document.data();
  if (!hasId(data)) return undefined;
  if (data.id !== document.id) {
    console.warn(`Song ${document.id} has contradicting song id`);
    return undefined;
  }
  return data;
}

export async function getSongMap(): Promise<SongInfoMap> {
  const result: SongInfo[] = (await getDocs(collection(db, 'song'))).docs
    .map(checkId)
    .filter(isSongInfo);
  if (result.length === 0) {
    console.warn('no valid song info was found');
  }
  const map: SongInfoMap = {};
  for (const info of result) map[info.id] = info;
  return map;
}

export async function getSongInfo(id: string): Promise<SongInfo> {
  const songInfoDoc = await getDoc(doc(db, 'song', id));
  if (!songInfoDoc.exists()) throw new SongNotFoundError(id);
  const result = checkId(songInfoDoc);
  if (!isSongInfo(result)) throw new Error(`invalid song info format (id: ${id})`);
  return result;
}

export async function getSong(id: string): Promise<Song> {
  const songDoc = await getDoc(doc(db, 'songsrc', id));
  if (!songDoc.exists()) throw new SongNotFoundError(id);
  const result = checkId(songDoc);
  if (!isSong(result)) throw new Error(`invalid song format (id: ${id})`);
  return result;
}
