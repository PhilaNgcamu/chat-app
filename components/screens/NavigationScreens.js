import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

import { TabBarVisibilityProvider } from "../chat/custom_hook/useTabBarVisibilityContext";
import UserLogin from "../user_login/UserLogin";
import UserSignUp from "../user_sign_up/UserSignUp";
import UserProfile from "../user_profile/UserProfile";
import ChatList from "../chat/display_chats/ChatList";
import Home from "./HomeNavigation";
import CreateGroupChat from "./chat_screen/CreateGroupChat";
import ChatScreen from "./chat_screen/ChatScreen";
import Onboarding from "../onboarding/Onboarding";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import GroupIcon from "../../utils/icons/GroupIcon";
import MessageIcon from "../../utils/icons/MessageIcon";
import SettingsIcon from "../../utils/icons/SettingsIcon";
import CallsIcon from "../../utils/icons/CallsIcon";

const Stack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const GroupStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="CreateGroupChat"
        component={CreateGroupChat}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
}

function GroupStackNavigator() {
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen
        name="CreateGroupChat"
        component={CreateGroupChat}
        options={{ headerShown: false }}
      />
    </GroupStack.Navigator>
  );
}

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const tabBarVisible = useSelector((state) => state.tabBarVisible);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: [
          styles.tabBar,
          { display: tabBarVisible ? "flex" : "none" },
        ],
        tabBarActiveTintColor: "#24786D",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Message"
        component={MessagesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MessageIcon color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Calls"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <CallsIcon color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <GroupIcon color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <SettingsIcon color={color} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function NavigationScreens({ user }) {
  return (
    <TabBarVisibilityProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Home" : "Onboarding"}>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserSignUp"
            component={UserSignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserLogin"
            component={UserLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatList"
            component={ChatList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateGroupChat"
            component={CreateGroupChat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TabBarVisibilityProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#EEFAF8",
    height: 90,
  },
  tabBarLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
