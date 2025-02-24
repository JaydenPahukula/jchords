import cors from 'cors';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import rootHandler from 'src/handlers/root';

const expressApp = express();

expressApp.use(cors({ origin: true }));

expressApp.get('/api', rootHandler);

exports.api = onRequest(expressApp);
