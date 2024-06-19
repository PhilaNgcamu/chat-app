import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { TabBarVisibilityProvider } from "../chat/custom_hook/useTabBarVisibilityContext";
import UserLogin from "../user_login/UserLogin";
import UserSignUp from "../user_sign_up/UserSignUp";
import UserProfile from "../user_profile/UserProfile";
import ChatList from "../chat/display_chats/ChatList";
import ChatScreen from "./GroupChatScreen";
import Home from "./Home";
import CreateGroupChat from "../chat/group_chat/CreateGroupChat";
import PrivateChatScreen from "./PrivateChatScreen";
import Onboarding from "../onboarding/Onboarding";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";

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
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });
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
        name="Message"
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
        component={ProfileStackNavigator}
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
