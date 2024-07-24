import { registerCustomComponents } from "src/components/manifest";
import { renderInitialContent } from "./pages/router";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase.config.json";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

registerCustomComponents();

renderInitialContent();
