import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqcsdwFL_EveXmtr_fiGu_Ww9Q1HVXmJo",
  authDomain: "lss-chat-app.firebaseapp.com",
  projectId: "lss-chat-app",
  storageBucket: "lss-chat-app.appspot.com",
  messagingSenderId: "137259105751",
  appId: "1:137259105751:web:63813f0e1b50f5c14f9f92",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export { auth, db };
