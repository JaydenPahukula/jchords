// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// import { onRequest } from 'firebase-functions/v2/https';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   console.log(request);
//   response.send('Hello from Firebase!');
// });

// import functions from 'firebase-functions';
import cors from 'cors';
import express from 'express';
import { https } from 'firebase-functions';

const app = express();

app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  return res.status(200).send(':)');
});

app.get('/hello', (req, res) => {
  return res.status(200).send('hello!');
});

exports.app = https.onRequest(app);
