import cors from 'cors';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';

const expressApp = express();

expressApp.use(cors({ origin: true }));

expressApp.get('/api', (req, res) => {
  return res.status(200).send('hello');
});

exports.api = onRequest(expressApp);
