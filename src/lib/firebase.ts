import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3KSOkTlPx_9XiSF1ME1SfEjkyxhzxGuc",
  authDomain: "culinaryarsonist-7f704.firebaseapp.com",
  projectId: "culinaryarsonist-7f704",
  storageBucket: "culinaryarsonist-7f704.firebasestorage.app",
  messagingSenderId: "51431384198",
  appId: "1:51431384198:web:d44c8b48ce9f20eb741d07",
  measurementId: "G-8MWCT4FPBD"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
