import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import app from 'src/shared/firebase/app';
import Song, { isSong } from 'src/shared/types/song';
import SongInfo, { isSongInfo } from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';

const db = getFirestore(app);

function processSongInfo(document: QueryDocumentSnapshot): SongInfo | undefined {
  const data = document.data();
  if (!isSongInfo(data)) {
    return undefined;
  }
  if (data.id !== document.id) {
    console.warn(`Song ${document.id} has contradicting song id`);
    return undefined;
  }
  return data;
}

export async function getSongMap(): Promise<SongInfoMap | undefined> {
  try {
    const result: SongInfo[] = (await getDocs(collection(db, 'song'))).docs
      .map(processSongInfo)
      .filter((x) => x !== undefined);
    if (result.length === 0) {
      console.warn('no valid song info was found');
      return undefined;
    }
    return result.reduce<SongInfoMap>((acc, info) => ((acc[info.id] = info), acc), {});
  } catch {
    console.warn('failed to get all song info');
    return undefined;
  }
}

export async function getSongInfo(id: string): Promise<SongInfo | undefined> {
  try {
    const songInfoDoc = await getDoc(doc(db, 'song', id));
    if (songInfoDoc.exists()) {
      const result = processSongInfo(songInfoDoc);
      if (result === undefined) {
        console.warn(`invalid song info format (id: ${id})`);
      } else {
        return result;
      }
    } else {
      console.warn(`no song info with id: ${id}`);
    }
  } catch {
    console.warn(`failed to get song info (id: ${id})`);
  }
}

export async function getSong(id: string): Promise<Song | undefined> {
  try {
    const songDoc = await getDoc(doc(db, 'songsrc', id));
    if (songDoc.exists()) {
      const result = songDoc.data();
      if (isSong(result)) {
        return result;
      } else {
        console.warn(`invalid song format (id: ${id})`);
      }
    } else {
      console.warn(`no song with id: ${id}`);
    }
  } catch {
    console.warn(`failed to get song (id: ${id})`);
  }
}
