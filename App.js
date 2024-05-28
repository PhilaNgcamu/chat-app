import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserSignup from "./components/onboarding/UserSignup";
import UserLogin from "./components/onboarding/UserLogin";
import UserProfile from "./components/userProfile/UserProfile";
import IndividualChat from "./components/IndividualChat/IndividualChat";
import GroupChat from "./components/GroupChat/GroupChat";

export default function App() {
  return <UserSignup />;
}
