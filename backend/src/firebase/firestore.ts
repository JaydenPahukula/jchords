import { getFirestore } from 'firebase-admin/firestore';
import app from 'src/firebase/app';

const db = getFirestore(app);

export default db;
