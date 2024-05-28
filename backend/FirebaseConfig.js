import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDietKwCutTxn_MLPkdpseopWo7X3eICUY",
  authDomain: "chat-app-lss.firebaseapp.com",
  projectId: "chat-app-lss",
  storageBucket: "chat-app-lss.appspot.com",
  messagingSenderId: "746597502071",
  appId: "1:746597502071:web:94bd242563ee66c99d8a72",
  measurementId: "G-LTEHJNPFK3",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
