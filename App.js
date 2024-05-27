import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserSignup from "./components/onboarding/UserSignup";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UserSignup />
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
