import cors from 'cors';
import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';

const app = express();

app.use(cors({ origin: true }));

app.get('/api', (req, res) => {
  return res.status(200).send(':)');
});

app.get('/api/hello', (req, res) => {
  return res.status(200).send('hello!');
});

exports.api = onRequest(app);
