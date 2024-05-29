import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserLogin from "../onboarding/UserLogin";
import UserSignup from "../onboarding/UserSignup";
import UserProfile from "../userProfile/userProfile";
import ChatList from "../chat/ChatList";
import ChatScreen from "../chat/ChatScreen";
import Home from "./Home";

const Stack = createNativeStackNavigator();

export default function NavigationScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserSignup">
        <Stack.Screen name="UserSignup" component={UserSignup} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
