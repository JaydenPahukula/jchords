import { getFirestore } from 'firebase-admin/firestore';
import { app } from 'src/firebase/app';

export const db = getFirestore(app);
