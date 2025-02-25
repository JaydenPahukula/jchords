import { getFirestore } from 'firebase-admin/firestore';
import app from './app.js';

const db = getFirestore(app);

export default db;
