import { RequestHandler } from 'express';
import { parseJSON } from 'shared/functions/jsonparse';
import { isPatchSongRequestBody } from 'shared/types/api/patchsongrequestbody';
import { authenticate } from 'src/firebase/auth';
import { db } from 'src/firebase/firestore';
import { FirestoreSongDoc } from 'src/types/firestore/firestoresongdoc';

export const patchSong: RequestHandler<{ id: string }> = async (request, response) => {
  const id = request.params.id;

  const uid = await authenticate(request);
  if (uid === undefined) return response.status(401).send();

  const body = parseJSON(request.body);
  if (!isPatchSongRequestBody(body)) return response.status(400).send();

  const song = body.song;
  if (song.info.id !== id || song.info.author !== uid) return response.status(400).send();

  const newDoc: FirestoreSongDoc = {
    text: song.text,
    info: {
      title: song.info.title,
      artist: song.info.artist,
      author: song.info.author,
    },
  };

  try {
    // check that song exists
    const existingDoc = await db.collection('song').doc(id).get();
    if (!existingDoc.exists) return response.status(404).send();

    // check that the current user is the author
    const existingData = existingDoc.data();
    if (existingData?.info.author !== uid) return response.status(403).send();

    await db.collection('song').doc(id).set(newDoc);

    return response.status(200).json(null);
  } catch (e) {
    console.error(e);
    return response.status(500).send();
  }
};
