import { Handler } from 'express';
import db from '../firebase/firestore.js';
import { isSongInfo } from '../shared/types/songinfo.js';

const getSongs: Handler = async (request, response) => {
  request;
  const songs = (await db.collection('song').get()).docs
    .filter((doc) => doc.exists)
    .map((doc) => doc.data())
    .filter(isSongInfo);
  return response.status(200).send({ songs: songs });
};

export default getSongs;
