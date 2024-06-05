import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

// Import your screen components
import UserLogin from "../onboarding/UserLogin";
import UserSignup from "../onboarding/UserSignup";
import UserProfile from "../user_profile/UserProfile";
import ChatList from "../chat/ChatList";
import ChatScreen from "../chat/ChatScreen";
import Home from "./Home";
import ContactList from "../chat/ContactList";
import CreateGroupChat from "../chat/CreateGroupChat";
import AddContact from "../chat/AddContact";
import PrivateChatScreen from "../chat/PrivateChatScreen";

// Create stack navigators for each tab
const Stack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const CallsStack = createNativeStackNavigator();
const GroupStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

// Messages Stack Navigator
function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="Chat Screen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="CreateGroupChat"
        component={CreateGroupChat}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="AddContact"
        component={AddContact}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="PrivateChat"
        component={PrivateChatScreen}
        options={{ headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
}

// Calls Stack Navigator
function CallsStackNavigator() {
  return (
    <CallsStack.Navigator>
      {/* Add your Calls screens here */}
      <CallsStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </CallsStack.Navigator>
  );
}

// Group Stack Navigator
function GroupStackNavigator() {
  return (
    <GroupStack.Navigator>
      {/* Add your Group screens here */}
      <GroupStack.Screen
        name="Home"
        component={CreateGroupChat}
        options={{ headerShown: false }}
      />
    </GroupStack.Navigator>
  );
}

// Settings Stack Navigator
function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#24786D",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Messages"
        component={MessagesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="message1" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Calls"
        component={CallsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="phone-call" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function NavigationScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserSignup">
        <Stack.Screen
          name="UserSignup"
          component={UserSignup}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 10, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
