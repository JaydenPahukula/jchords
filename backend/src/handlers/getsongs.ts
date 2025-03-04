import { Handler, Request, Response } from 'express';
import { isSongInfo } from 'shared/types/songinfo';
import db from 'src/firebase/firestore';

const getSongs: Handler = async (_request: Request, response: Response) => {
  const songs = (await db.collection('song').get()).docs
    .filter((doc) => doc.exists)
    .map((doc) => doc.data())
    .filter(isSongInfo);
  console.log(songs);
  return response.status(200).send({ songs: songs });
};

export default getSongs;
