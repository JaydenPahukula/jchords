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

function combineDocIdAndData(document: QueryDocumentSnapshot): { id: string } {
  return {
    id: document.id,
    ...document.data(),
  };
}

// return info for all available songs
export async function getAllSongInfo(): Promise<SongInfo[] | undefined> {
  try {
    const result: SongInfo[] = (await getDocs(collection(db, 'song'))).docs
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

// get song info
export async function getSongInfo(id: string): Promise<SongInfo | undefined> {
  try {
    const document = await getDoc(doc(db, `song`, id));
    if (document.exists()) {
      const info = combineDocIdAndData(document);
      if (isSongInfo(info)) {
        return info;
      } else {
        console.error(`invalid info format (id: ${id})`);
      }
    } else {
      console.error(`no info available (id: ${id})`);
    }
  } catch (e) {
    console.error(`failed to get info (id: ${id})`);
  }
}

// get song src
export async function getSongSrc(id: string): Promise<string | undefined> {
  try {
    const document = await getDoc(doc(db, `song/${id}/src`, id));
    if (document.exists()) {
      const src = document.data().text;
      if (typeof src === 'string') {
        return src;
      } else {
        console.error(`invalid src format (id: ${id})`);
      }
    } else {
      console.error(`no src available (id: ${id})`);
    }
  } catch (e) {
    console.error(`failed to get src (id: ${id})`);
  }
}
