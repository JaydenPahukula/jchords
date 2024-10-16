import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import app from 'src/firebase/app';
import SongInfo, { isSongInfo } from 'src/types/songinfo';

const db = getFirestore(app);

const allSongsRef = collection(db, 'songs');

function combineDocIdAndData(document: QueryDocumentSnapshot): { id: string } {
  return {
    id: document.id,
    ...document.data(),
  };
}

function seperateDocIdAndData<T extends { id: string }>(obj: T): [string, Omit<T, 'id'>] {
  const { id, ...rest } = obj;
  return [id, rest];
}

// return info for all available songs
export async function getAllSongInfo(): Promise<SongInfo[] | undefined> {
  try {
    const result: SongInfo[] = (await getDocs(allSongsRef)).docs
      .map(combineDocIdAndData)
      .filter(isSongInfo);
    if (result.length === 0) {
      console.error('no song info was found');
      return undefined;
    }
    return result;
  } catch (e) {
    console.error('failed to get all song info');
    return undefined;
  }
}

// get song src
export async function getSongSrc(songId: string): Promise<string | undefined> {
  try {
    const document = await getDoc(doc(db, 'charts', songId));
    if (document.exists()) {
      const src = document.data().text;
      if (typeof src === 'string') {
        return src;
      } else {
        console.error(`invalid src format (id: ${songId})`);
      }
    } else {
      console.error(`no src available (id: ${songId})`);
    }
  } catch (e) {
    console.error(`failed to get src (id: ${songId})`);
  }
}
