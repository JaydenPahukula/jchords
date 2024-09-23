import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import app from "../firebase/app";
import SongInfo, { isSongInfo } from "../types/songinfo";
import SongChart, { isSongChart} from "../types/songchart";

const db = getFirestore(app);

const allSongsRef = collection(db, "songs");

const docIdAndData = (document: QueryDocumentSnapshot) => ({
  id: document.id,
  ...document.data(),
});

const DBManager = {
  async getAllSongInfo(): Promise<SongInfo[] | undefined> {
    try {
      const querySnapshot = await getDocs(allSongsRef);
      return querySnapshot.docs.map(docIdAndData).filter(isSongInfo);
    } catch (e) {
      console.error("failed to get all song info");
    }
  },
  async getSongInfo(songId: string): Promise<SongInfo | undefined> {
    try {
      const document = await getDoc(doc(db, "songs", songId));
      if (document.exists()) {
        const data = docIdAndData(document);
        if (isSongInfo(data)) {
          return data;
        }
      }
    } catch (e) {
      console.error(`failed to get song info (id: ${songId})`)
    }
  },
  async getSongChart(songId: string): Promise<SongChart | undefined> {
    try {
      const document = await getDoc(doc(db, "charts", songId));
      if (document.exists()) {
        const data = docIdAndData(document);
        if (isSongChart(data)) {
          return data;
        }
      }
    } catch (e) {
      console.error(`failed to get song chart (id: ${songId})`)
    }
  },
  // async updateSongInfo(newSongInfo: SongInfo): Promise<void> {
  //   const { id, ...songInfo } = newSongInfo;
  //   await setDoc(doc(db, "songs", id), songInfo);
  // },
  // async updateChart(songId: string, chart: SongChart): Promise<void> {
  //   const collectionPath = `songs/${songId}/chart`;
  //   await Promise.all(
  //     Object.keys(chart.sections).map((sectionId) =>
  //       setDoc(doc(db, collectionPath, sectionId), chart.sections[sectionId])
  //     )
  //   );
  //   await setDoc(doc(db, collectionPath, "(order)"), { order: chart.order });
  // },
  // async createSong(newSongInfo: SongInfo, chart: SongChart): Promise<string> {
  //   const { id, ...songInfo } = newSongInfo;
  //   const newDoc = await addDoc(collection(db, "songs"), songInfo);
  //   this.updateChart(newDoc.id, chart);
  //   return newDoc.id;
  //   id; // shut up eslint
  // },
};

export default DBManager;
