import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoI8J1PxGDsEMuIKIf-HJnLcAXpznjSdc",
  authDomain: "ho-madebakedgoodsbysarah.firebaseapp.com",
  projectId: "ho-madebakedgoodsbysarah",
  storageBucket: "ho-madebakedgoodsbysarah.firebasestorage.app",
  messagingSenderId: "283714735969",
  appId: "1:283714735969:web:c94ca17030c005e01cff20",
  measurementId: "G-GL7X6JMDE7"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
