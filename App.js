import { Provider } from "react-redux";
import NavigationScreens from "./components/screens/Navigation";
import store from "./redux/store";
import { TabBarVisibilityProvider } from "./components/chat/custom_hook/useTabBarVisibilityContext";

export default function App() {
  return (
    <Provider store={store}>
      <TabBarVisibilityProvider>
        <NavigationScreens />
      </TabBarVisibilityProvider>
    </Provider>
  );
}
