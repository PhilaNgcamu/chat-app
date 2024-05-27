import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserRegistrationAndAuthentication from "./components/UserRegistrationAndAuthentication";

export default function App() {
  return (
    <View style={styles.container}>
      <UserRegistrationAndAuthentication />
      <StatusBar style="auto" />
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
