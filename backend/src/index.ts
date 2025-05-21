import cors from 'cors';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { getSong } from 'src/handlers/getsong';
import { getSongList } from 'src/handlers/getsonglist';
import { rootHandler } from 'src/handlers/root';

const expressApp = express();

expressApp.use(cors({ origin: true }));

expressApp.get('/api', rootHandler);
expressApp.get('/api/songlist', getSongList);
expressApp.get('/api/song/:id', getSong);

export const api = onRequest(expressApp);
