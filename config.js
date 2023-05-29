import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9dMfKmShKN12jm0Rirkesz86GlisUDs0",
  authDomain: "nativeapp-7ac5c.firebaseapp.com",
  databaseURL:
    "https://nativeapp-7ac5c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nativeapp-7ac5c",
  storageBucket: "nativeapp-7ac5c.appspot.com",
  messagingSenderId: "928815990202",
  appId: "1:928815990202:web:e66f45a5347bae77a40983",
  measurementId: "G-EC3N0CD16E",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
