import React, { createContext, useState, useContext } from "react";

const TabBarVisibilityContext = createContext();

export const TabBarVisibilityProvider = ({ children }) => {
  const [isTabBarVisible, setTabBarVisible] = useState(true);

  return (
    <TabBarVisibilityContext.Provider
      value={{ isTabBarVisible, setTabBarVisible }}
    >
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);
