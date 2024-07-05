import { tabBarVisibility } from "./tabBarActions";

const initialState = {
  isTabBarVisible: true,
};

const tabBarVisibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case tabBarVisibility.SET_TAB_BAR_VISIBILITY:
      return {
        ...state,
        isTabBarVisible: action.payload,
      };
    default:
      return state;
  }
};

export default tabBarVisibilityReducer;
