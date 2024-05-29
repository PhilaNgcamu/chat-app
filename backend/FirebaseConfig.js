import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqcsdwFL_EveXmtr_fiGu_Ww9Q1HVXmJo",
  authDomain: "lss-chat-app.firebaseapp.com",
  projectId: "lss-chat-app",
  storageBucket: "lss-chat-app.appspot.com",
  messagingSenderId: "137259105751",
  appId: "1:137259105751:web:63813f0e1b50f5c14f9f92",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const auth = getAuth(FIREBASE_APP);
