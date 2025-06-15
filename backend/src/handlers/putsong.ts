import { RequestHandler } from 'express';
import { parseJSON } from 'shared/functions/jsonparse';
import { isPutSongRequestBody } from 'shared/types/api/putsongrequestbody';
import { PutSongResponseBody } from 'shared/types/api/putsongresponsebody';
import { FirestoreSongDoc } from 'shared/types/firestore/firestoresongdoc';
import { authenticate } from 'src/firebase/authenticate';
import { db } from 'src/firebase/firestore';

export const putSong: RequestHandler<{}, PutSongResponseBody> = async (request, response) => {
  const uid = await authenticate(request);
  if (uid === undefined) return response.status(401).send();

  const body = parseJSON(request.body);
  if (!isPutSongRequestBody(body)) return response.status(400).send();

  const song = body.song;
  if (song.info.id !== '' || song.info.author !== uid) return response.status(400).send();

  const newDoc: FirestoreSongDoc = {
    text: song.text,
    info: {
      title: song.info.title,
      artist: song.info.artist,
      author: song.info.author,
    },
  };

  try {
    const newId = (await db.collection('song').add(newDoc)).id;

    const responseBody: PutSongResponseBody = { id: newId };
    return response.status(200).json(responseBody);
  } catch (e) {
    console.error(e);
    return response.status(500).send();
  }
};
