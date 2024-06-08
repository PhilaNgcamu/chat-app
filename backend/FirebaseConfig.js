import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onDisconnect,
  onValue,
  serverTimestamp,
  update,
} from "firebase/database";
import {
  initializeAuth,
  getReactNativePersistence,
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

const setUserOnlineStatus = () => {
  const userId = auth.currentUser.uid;
  const userStatusDatabaseRef = ref(db, `users/${userId}`);

  const isOfflineForDatabase = {
    online: false,
    lastChanged: serverTimestamp(),
  };

  const isOnlineForDatabase = {
    online: true,
    lastChanged: serverTimestamp(),
  };

  onValue(ref(db, ".info/connected"), (snapshot) => {
    if (snapshot.val() === false) {
      return;
    }

    onDisconnect(userStatusDatabaseRef)
      .update(isOfflineForDatabase)
      .then(() => {
        update(userStatusDatabaseRef, isOnlineForDatabase);
      });
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUserOnlineStatus();
  }
});

export { auth, db, setUserOnlineStatus };
