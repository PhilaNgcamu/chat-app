import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { TabBarVisibilityProvider } from "./useTabBarVisibilityContext";
import UserLogin from "../onboarding/UserLogin";
import UserSignup from "../onboarding/UserSignup";
import UserProfile from "../user_profile/UserProfile";
import ChatList from "../chat/ChatList";
import ChatScreen from "../chat/ChatScreen";
import Home from "./Home";
import CreateGroupChat from "../chat/CreateGroupChat";
import PrivateChatScreen from "../chat/PrivateChatScreen";
import Onboarding from "../onboarding/Onboarding";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const CallsStack = createNativeStackNavigator();
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
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="CreateGroupChat"
        component={CreateGroupChat}
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

function ProfileStackNavigator() {
  return (
    <CallsStack.Navigator>
      <CallsStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </CallsStack.Navigator>
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
  const tabBarVisible = useSelector((state) => state.tabBarVisible);

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
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
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

export default function NavigationScreens() {
  return (
    <TabBarVisibilityProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name="ChatList"
            component={ChatList}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateGroupChat"
            component={CreateGroupChat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivateChat"
            component={PrivateChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TabBarVisibilityProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
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
