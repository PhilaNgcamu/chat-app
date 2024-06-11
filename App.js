import { Provider } from "react-redux";
import NavigationScreens from "./components/screens/Navigation";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationScreens />
    </Provider>
  );
}
