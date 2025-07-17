import { RequestHandler } from 'express';
import { GetSongListResponseBody } from 'shared/types/api/getsonglistresponsebody';
import { db } from 'src/firebase/firestore';
import { isFirestoreSongDoc } from 'src/types/firestore/firestoresongdoc';

export const getSongList: RequestHandler<{}, GetSongListResponseBody> = async (
  _request,
  response,
) => {
  const songList = (await db.collection('song').get()).docs
    .filter((doc) => doc.exists)
    .map((doc) => {
      const data = doc.data();
      return isFirestoreSongDoc(data) ? { ...data.info, id: doc.id } : undefined;
    })
    .filter((info) => info !== undefined);
  // console.log('hi');
  // for (const songDoc of (await db.collection('song').get()).docs) {
  //   const id = songDoc.id;
  //   console.log(id);
  //   const songData = songDoc.data();
  //   const infoDoc = await db.collection('songinfo').doc(id).get();
  //   console.log(1);
  //   const infoData = { ...infoDoc.data(), author: 'TDFIL3xby0Wirn51FYGx13Jhji42' };
  //   if (!isSongInfo(infoData)) {
  //     console.error(infoData);
  //     throw new Error('bad');
  //   }
  //   const newDoc: FirestoreSongDoc = {
  //     text: songData.text,
  //     info: infoData,
  //   };
  //   await db.collection('song').doc(id).set(newDoc);
  //   console.log(id);
  // }
  // console.log(songList);
  return response.status(200).send({ songList: songList });
};
