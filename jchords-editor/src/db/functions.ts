import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
} from 'firebase/firestore/lite';
import app from 'src/firebase/app';
import SongId from 'src/types/songid';
import SongInfo, { isSongInfo } from 'src/types/songinfo';

const db = getFirestore(app);

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

// get song src
export async function getSongSrc(id: string): Promise<string | undefined> {
  try {
    const document = await getDoc(doc(db, 'songsrc', id));
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

export async function setSongInfo(info: SongInfo): Promise<void> {
  const [_, data] = seperateDocIdAndData(info);
  setDoc(doc(db, 'song', info.id), data);
}

export async function setSongSrc(id: string, src: string): Promise<void> {
  setDoc(doc(db, 'songsrc', id), { text: src });
}

export async function createNewSong(info: SongInfo, src: string): Promise<SongId> {
  const [_, infoData] = seperateDocIdAndData(info);
  const infoDoc = await addDoc(collection(db, 'song'), infoData);
  await setDoc(doc(db, 'songsrc', infoDoc.id), { text: src });
  return infoDoc.id;
}
