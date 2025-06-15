import { RequestHandler } from 'express';
import { GetSongResponseBody } from 'shared/types/api/getsongresponsebody';
import { isFirestoreSongDoc } from 'shared/types/firestore/firestoresongdoc';
import { Song } from 'shared/types/song';
import { db } from 'src/firebase/firestore';

export const getSong: RequestHandler<{ id: string }, GetSongResponseBody> = async (
  request,
  response,
) => {
  const id = request.params.id;

  const doc = await db.collection('song').doc(id).get();

  if (!doc.exists) return response.status(404).send();

  const data = doc.data();
  if (!isFirestoreSongDoc(data)) return response.status(500).send();

  // construct song
  const song: Song = {
    text: data.text,
    info: { ...data.info, id: id },
  };

  return response.status(200).send({ song: song });
};
