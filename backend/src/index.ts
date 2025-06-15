import cors from 'cors';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { deleteSong } from 'src/handlers/deletesong';
import { getSong } from 'src/handlers/getsong';
import { getSongList } from 'src/handlers/getsonglist';
import { patchSong } from 'src/handlers/patchsong';
import { putSong } from 'src/handlers/putsong';
import { rootHandler } from 'src/handlers/root';

const expressApp = express();

expressApp.use(cors({ origin: true }));

expressApp.get('/api', rootHandler);

expressApp.get('/api/songlist', getSongList);

expressApp.put('/api/song', putSong);
expressApp.get('/api/song/:id', getSong);
expressApp.patch('/api/song/:id', patchSong);
expressApp.delete('/api/song/:id', deleteSong);

export const api = onRequest(expressApp);
