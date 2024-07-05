import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTabBarVisibility } from "../../../redux/tab_bar/tabBarActions";

const TabBarVisibilityContext = createContext();

export const TabBarVisibilityProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isTabBarVisible = useSelector(
    (state) => state.tabBarVisibility.isTabBarVisible
  );
  console.log("isTabBarVisible", isTabBarVisible);

  const tabBarVisibility = (isVisible) => {
    dispatch(setTabBarVisibility(isVisible));
  };

  return (
    <TabBarVisibilityContext.Provider
      value={{ isTabBarVisible, setTabBarVisible: tabBarVisibility }}
    >
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);
