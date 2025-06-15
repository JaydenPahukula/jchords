import { RequestHandler } from 'express';
import { authenticate } from 'src/firebase/authenticate';
import { db } from 'src/firebase/firestore';

export const deleteSong: RequestHandler<{ id: string }> = async (request, response) => {
  const id = request.params.id;

  const uid = await authenticate(request);
  if (uid === undefined) return response.status(401).send();

  try {
    // check that song exists
    const doc = await db.collection('song').doc(id).get();
    if (!doc.exists) return response.status(404).send();

    // check that the current user is the author
    const existingData = doc.data();
    if (existingData?.info.author !== uid) return response.status(403).send();

    await db.collection('song').doc(id).delete();

    return response.status(200).json(null);
  } catch (e) {
    console.error(e);
    return response.status(500).send();
  }
};
