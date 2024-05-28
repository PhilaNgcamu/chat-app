import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const auth = getAuth(FIREBASE_APP);
