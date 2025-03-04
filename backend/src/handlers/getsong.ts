import { Handler, Request, Response } from 'express';
import GetSongResponseBody from 'shared/types/api/getsongresponsebody';
import { isFirestoreSongDoc } from 'shared/types/firestore/firestoresongdoc';
import { isFirestoreSongInfoDoc } from 'shared/types/firestore/firestoresonginfodoc';
import Song from 'shared/types/song';
import db from 'src/firebase/firestore';

const getSong: Handler = async (request: Request, response: Response<GetSongResponseBody>) => {
  const id = request.params.id;

  // get info
  const infoDoc = await db.collection('songinfo').doc(id).get();
  if (!infoDoc.exists) return response.status(404).send();
  const infoDocData = infoDoc.data();
  if (!isFirestoreSongInfoDoc(infoDocData) || infoDocData.id != id) {
    return response.status(500).send();
  }
  // get song
  const songDoc = await db.collection('song').doc(id).get();
  if (!songDoc.exists) return response.status(404).send();
  const songDocData = songDoc.data() ?? {};
  if (!isFirestoreSongDoc(songDocData) || songDocData.id != id) return response.status(500).send();

  // construct song
  const song: Song = {
    text: songDocData.text,
    info: infoDocData,
  };

  return response.status(200).send({ song: song });
};

export default getSong;
