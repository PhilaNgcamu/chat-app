import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN } from "@env";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
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

export { auth, db };
