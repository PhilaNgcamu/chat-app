import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserSignup from "../onboarding/UserSignup";
import Home from "./Home";
import UserLogin from "../onboarding/UserLogin";
import ChatScreen from "./ChatScreen";
import UserProfile from "../userProfile/UserProfile";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={UserSignup} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
