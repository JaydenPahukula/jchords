import { Handler, Request, Response } from 'express';
import GetSongListResponseBody from 'shared/types/api/getsonglistresponsebody';
import { isSongInfo } from 'shared/types/songinfo';
import db from 'src/firebase/firestore';

const getSongList: Handler = async (
  _request: Request,
  response: Response<GetSongListResponseBody>,
) => {
  const songList = (await db.collection('songinfo').get()).docs
    .filter((doc) => doc.exists)
    .map((doc) => doc.data())
    .filter(isSongInfo);
  return response.status(200).send({ songList: songList });
};

export default getSongList;
