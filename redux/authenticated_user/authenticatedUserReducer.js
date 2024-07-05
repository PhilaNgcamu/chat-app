import { authenticatedUserType } from "./authenticatedUserActions";

const initialState = {
  isUserAuthenticated: null,
};

const authenticatedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case authenticatedUserType.AUTHENTICATED_USER:
      return {
        ...state,
        isUserAuthenticated: action.payload,
      };

    default:
      return state;
  }
};

export default authenticatedUserReducer;
