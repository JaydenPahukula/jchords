import { collection, doc, getDoc, getDocs, getFirestore, QueryDocumentSnapshot } from 'firebase/firestore';
import app from 'src/firebase/app';
import Chart, { parseChart } from 'src/types/chart';
import SongInfo, { isSongInfo } from 'src/types/songinfo';

const db = getFirestore(app);

const allSongsRef = collection(db, 'songs');

const docIdAndData = (document: QueryDocumentSnapshot) => ({ id: document.id, ...document.data() });

const DBManager = {
  async getAllSongInfo(): Promise<SongInfo[]> {
    const querySnapshot = await getDocs(allSongsRef);
    return querySnapshot.docs.map(docIdAndData).filter(isSongInfo);
  },
  async getSongInfo(songId: string): Promise<SongInfo | undefined> {
    const document = await getDoc(doc(db, 'songs', songId));
    if (document.exists()) {
      const data = docIdAndData(document);
      if (isSongInfo(data)) {
        return data;
      }
    }
    return undefined;
  },
  async getSongChart(songId: string): Promise<Chart | undefined> {
    const querySnapshot = await getDocs(collection(db, `songs/${songId}/chart`));
    return parseChart(querySnapshot.docs);
  },
};

export default DBManager;
