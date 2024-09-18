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
import Chart from "../types/chart";
import ChartOrder, { isChartOrder } from "../types/chartorder";
import ChartSections, { isChartSections } from "../types/chartsections";
import SongInfo, { isSongInfo } from "../types/songinfo";

const db = getFirestore(app);

const allSongsRef = collection(db, "songs");

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
    const document = await getDoc(doc(db, "songs", songId));
    if (document.exists()) {
      const data = docIdAndData(document);
      if (isSongInfo(data)) {
        return data;
      }
    }
    return undefined;
  },
  async getSongChart(songId: string): Promise<Chart | undefined> {
    let sections: ChartSections | undefined;
    let order: ChartOrder | undefined;
    (await getDocs(collection(db, `songs/${songId}/chart`))).docs.forEach(
      (doc) => {
        const data = doc.data();
        if (doc.id === "sections" && isChartSections(data)) {
          sections = data;
        } else if (doc.id === "order" && isChartOrder(data.order)) {
          order = data.order;
        }
      }
    );
    if (sections === undefined || order === undefined) {
      console.error(`Invalid chart format! (song id: ${songId})`);
      return undefined;
    }
    return {
      sections: sections,
      order: order,
    };
  },
  async updateSongInfo(newSongInfo: SongInfo): Promise<void> {
    const { id, ...songInfo } = newSongInfo;
    await setDoc(doc(db, "songs", id), songInfo);
  },
  async updateChart(songId: string, chart: Chart): Promise<void> {
    const collectionPath = `songs/${songId}/chart`;
    await Promise.all(
      Object.keys(chart.sections).map((sectionId) =>
        setDoc(doc(db, collectionPath, sectionId), chart.sections[sectionId])
      )
    );
    await setDoc(doc(db, collectionPath, "(order)"), { order: chart.order });
  },
  async createSong(newSongInfo: SongInfo, chart: Chart): Promise<string> {
    const { id, ...songInfo } = newSongInfo;
    const newDoc = await addDoc(collection(db, "songs"), songInfo);
    this.updateChart(newDoc.id, chart);
    return newDoc.id;
    id; // shut up eslint
  },
};

export default DBManager;
