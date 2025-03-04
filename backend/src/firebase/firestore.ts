import { getFirestore } from 'firebase-admin/firestore';
import app from './app';

const db = getFirestore(app);

export default db;
