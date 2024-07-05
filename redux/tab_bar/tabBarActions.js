export const tabBarVisibility = {
  SET_TAB_BAR_VISIBILITY: "SET_TAB_BAR_VISIBILITY",
};

export const setTabBarVisibility = (isTabBarVisible) => ({
  type: tabBarVisibility.SET_TAB_BAR_VISIBILITY,
  payload: isTabBarVisible,
});
