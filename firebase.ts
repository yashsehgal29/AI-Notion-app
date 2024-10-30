import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyClfgNqviaN39upd_A9HW-gGaJDORYRZ90",
  authDomain: "ai-notion--app.firebaseapp.com",
  projectId: "ai-notion--app",
  storageBucket: "ai-notion--app.appspot.com",
  messagingSenderId: "470506717794",
  appId: "1:470506717794:web:428ae2650f957a6413c73b"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export { db };