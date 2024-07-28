import { collection, getDocs } from 'firebase/firestore';
import app from 'src/firebase/app';
import SongInfo, { isSongInfo } from 'src/types/SongInfo';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

const DBManager = {
  async getSongs(): Promise<SongInfo[]> {
    const querySnapshot = await getDocs(collection(db, 'testcollection'));
    return querySnapshot.docs
      .map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter(isSongInfo);
  },
};

export default DBManager;
