import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import UserSignup from "./components/onboarding/UserSignup";
import UserLogin from "./components/onboarding/UserLogin";
import UserProfile from "./components/userProfile/UserProfile";
import IndividualChat from "./components/IndividualChat/IndividualChat";
import GroupChat from "./components/GroupChat/GroupChat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return <UserLogin />;
}
