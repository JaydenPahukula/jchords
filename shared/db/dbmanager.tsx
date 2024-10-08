import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
} from 'firebase/firestore';
import app from '../firebase/app';
import SongChart, { isSongChart } from '../types/songchart';
import SongId from '../types/songid';
import SongInfo, { isSongInfo } from '../types/songinfo';

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

const DBManager = {
  async getAllSongInfo(): Promise<SongInfo[] | undefined> {
    try {
      const querySnapshot = await getDocs(allSongsRef);
      return querySnapshot.docs.map(combineDocIdAndData).filter(isSongInfo);
    } catch (e) {
      console.error('failed to get all song info');
    }
  },
  async getSongInfo(songId: string): Promise<SongInfo | undefined> {
    try {
      const document = await getDoc(doc(db, 'songs', songId));
      if (document.exists()) {
        const data = combineDocIdAndData(document);
        if (isSongInfo(data)) {
          return data;
        } else {
          console.error(`invalid song info format (id: ${songId})`);
        }
      } else {
        console.error(`no song info available (id: ${songId})`);
      }
    } catch (e) {
      console.error(`failed to get song info (id: ${songId})`);
    }
  },
  async getSongChart(songId: string): Promise<SongChart | undefined> {
    try {
      const document = await getDoc(doc(db, 'charts', songId));
      if (document.exists()) {
        const data = combineDocIdAndData(document);
        if (isSongChart(data)) {
          return data;
        } else {
          console.error(`invalid song chart format (id: ${songId})`);
        }
      } else {
        console.error(`no song chart available (id: ${songId})`);
      }
    } catch (e) {
      console.error(`failed to get song chart (id: ${songId})`);
    }
  },
  async setSongInfo(songInfo: SongInfo): Promise<void> {
    const [id, info] = seperateDocIdAndData(songInfo);
    await setDoc(doc(db, 'songs', id), info);
  },
  async setSongChart(songChart: SongChart): Promise<void> {
    const [id, chart] = seperateDocIdAndData(songChart);
    await setDoc(doc(db, 'charts', id), chart);
  },
  async createSong(songInfo: SongInfo, songChart: SongChart): Promise<SongId> {
    const [_, info] = seperateDocIdAndData(songInfo);
    const [__, chart] = seperateDocIdAndData(songChart);
    // make info document, then use new id to create chart doc
    const infoDoc = await addDoc(collection(db, 'songs'), info);
    await setDoc(doc(db, 'charts', infoDoc.id), chart);
    return infoDoc.id;
  },
};

export default DBManager;
