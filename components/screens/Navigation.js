import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Stack = createNativeStackNavigator();

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
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat Screen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Contact List"
          component={ContactList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateGroupChat"
          component={CreateGroupChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddContact"
          component={AddContact}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivateChat"
          component={PrivateChatScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
