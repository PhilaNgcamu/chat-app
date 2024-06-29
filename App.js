import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import NavigationScreens from "./components/screens/Navigation";
import store from "./redux/store";
import { TabBarVisibilityProvider } from "./components/chat/custom_hook/useTabBarVisibilityContext";
import { auth } from "./backend/firebaseConfig";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });
    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <TabBarVisibilityProvider>
        <NavigationScreens user={user} />
      </TabBarVisibilityProvider>
    </Provider>
  );
}
