import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from 'src/firebase/app';
import Chart, { InvalidChart, parseChart } from 'src/types/Chart';
import SongInfo, { isSongInfo } from 'src/types/SongInfo';

const db = getFirestore(app);

const allSongsRef = collection(db, 'songs');

const DBManager = {
  async getAllSongInfo(): Promise<SongInfo[]> {
    const querySnapshot = await getDocs(allSongsRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter(isSongInfo);
  },
  async getSongChart(songID: string): Promise<Chart | InvalidChart> {
    const querySnapshot = await getDocs(collection(db, `songs/${songID}/chart`));
    return parseChart(querySnapshot.docs);
  },
};

export default DBManager;
