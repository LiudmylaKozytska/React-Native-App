import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkrdO8jQSNWCbsRENUAiyyK3f2MMuJIzc",
  authDomain: "react-native-e68ee.firebaseapp.com",
  projectId: "react-native-e68ee",
  storageBucket: "react-native-e68ee.appspot.com",
  messagingSenderId: "350811607578",
  appId: "1:350811607578:web:10f3fb332af949ae92f7a3",
  measurementId: "G-F12P2SX43P",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
