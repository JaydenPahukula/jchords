import { collection, getDocs, getFirestore, QueryDocumentSnapshot } from 'firebase/firestore/lite';
import app from 'src/shared/firebase/app';
import { isSongId } from 'src/shared/types/songid';
import SongInfo, { isSongInfo } from 'src/shared/types/songinfo';
import SongInfoMap from 'src/shared/types/songinfomap';

const db = getFirestore(app);

function processSongInfo(document: QueryDocumentSnapshot): SongInfo | undefined {
  const data = document.data();
  if (!isSongId(data.id)) {
    console.warn(`Song ${document.id} has invalid song id`);
    return undefined;
  }
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
  } catch (e) {
    console.warn('failed to get all song info');
    return undefined;
  }
}
