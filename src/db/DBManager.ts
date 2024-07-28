import { collection, getDocs } from 'firebase/firestore';
import app from 'src/firebase/app';
import SongInfo, { isSongInfo } from 'src/types/SongInfo';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

const songsRef = collection(db, 'songs');

const DBManager = {
  async getSongs(): Promise<SongInfo[]> {
    const querySnapshot = await getDocs(songsRef);
    return querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter(isSongInfo);
  },
};

export default DBManager;
