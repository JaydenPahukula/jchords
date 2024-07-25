import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config.json";

export const app = initializeApp(firebaseConfig);
console.log("initialized firebase");
