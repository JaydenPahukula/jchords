import { getFirestore } from "firebase/firestore"
import { app } from "src/firebase/firebase"

const db = getFirestore(app);
console.log("initialized db")
