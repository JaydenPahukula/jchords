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
import app from 'src/firebase/app';
import Chart, { parseChart } from 'src/types/chart';
import SongInfo, { isSongInfo } from 'src/types/songinfo';

const db = getFirestore(app);

const allSongsRef = collection(db, 'songs');

const docIdAndData = (document: QueryDocumentSnapshot) => ({
  id: document.id,
  ...document.data(),
});

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
    const result = parseChart(querySnapshot.docs);
    if (result === undefined) console.error(`Invalid chart format! (song id: ${songId})`);
    return result;
  },
  async updateSongInfo(newSongInfo: SongInfo): Promise<void> {
    const { id, ...songInfo } = newSongInfo;
    await setDoc(doc(db, 'songs', id), songInfo);
  },
  async updateChart(songId: string, chart: Chart): Promise<void> {
    const collectionPath = `songs/${songId}/chart`;
    await Promise.all(
      Object.keys(chart.sections).map((sectionId) =>
        setDoc(doc(db, collectionPath, sectionId), chart.sections[sectionId]),
      ),
    );
    await setDoc(doc(db, collectionPath, '(order)'), { order: chart.order });
  },
  async createSong(newSongInfo: SongInfo, chart: Chart): Promise<string> {
    const { id, ...songInfo } = newSongInfo;
    const newDoc = await addDoc(collection(db, 'songs'), songInfo);
    this.updateChart(newDoc.id, chart);
    return newDoc.id;
    id; // shut up eslint
  },
};

export default DBManager;
