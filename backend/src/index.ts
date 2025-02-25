import cors from 'cors';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import getSongs from './handlers/getsongs.js';
import rootHandler from './handlers/root.js';

const expressApp = express();

expressApp.use(cors({ origin: true }));

expressApp.get('/api', rootHandler);
expressApp.get('/api/songs', getSongs);

export const api = onRequest(expressApp);
