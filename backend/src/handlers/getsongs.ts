import { Handler, Request, Response } from 'express';
import db from 'src/firebase/firestore';

const getSongs: Handler = async (_request: Request, response: Response) => {
  const collection = db.collection('song');
  // console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  // console.log(process.env.FIRESTORE_EMULATOR_HOST);
  // // console.log(await collection.doc('hello').get());
  // console.log('hi');
  // const test = await collection.add({ test: 'test' });
  // console.log(test);
  // const test = collection.get();
  // console.log(await db.listCollections());
  // const idk = await collection.get();
  // console.log('--------------');
  // console.log(idk);
  // const songs = idk.docs
  //   .filter((doc) => doc.exists)
  //   .map((doc) => doc.data())
  //   .filter(isSongInfo);
  // console.log(songs);
  // return response.status(200).send({ songs: songs });
  return response
    .status(200)
    .send({ songs: [], test: (await collection.get()).docs.map((doc) => doc.data()) });
};

export default getSongs;
