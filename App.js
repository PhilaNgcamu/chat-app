import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserSignup from "./components/onboarding/UserSignup";
import UserLogin from "./components/onboarding/UserLogin";
import UserProfile from "./components/userProfile/UserProfile";

export default function App() {
  return (
    <View style={styles.container}>
      <UserProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
