import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTabBarVisible } from "../../../redux/actions";

const TabBarVisibilityContext = createContext();

export const TabBarVisibilityProvider = ({ children }) => {
  const dispatch = useDispatch();
  const tabBarVisible = useSelector((state) => state.tabBarVisible);
  const setTabBarVisibility = (isVisible) => {
    dispatch(setTabBarVisible(isVisible));
  };

  return (
    <TabBarVisibilityContext.Provider
      value={{ tabBarVisible, setTabBarVisible: setTabBarVisibility }}
    >
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);
