import { userProfileSignupAndLoginType } from "./userProfileSignupAndLoginActions";

const initialState = {
  profilePicture: null,
  userName: "",
  userEmail: "",
  statusMessage: "",
  phoneNumber: "",
  isLoading: null,
  userPassword: "",
  confirmUserPassword: "",
};

const userVerificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userProfileSignupAndLoginType.SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case userProfileSignupAndLoginType.SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    case userProfileSignupAndLoginType.SET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.payload,
      };
    case userProfileSignupAndLoginType.SET_STATUS_MESSAGE:
      return {
        ...state,
        statusMessage: action.payload,
      };
    case userProfileSignupAndLoginType.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case userProfileSignupAndLoginType.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case userProfileSignupAndLoginType.SET_USER_PASSWORD:
      return {
        ...state,
        userPassword: action.payload,
      };
    case userProfileSignupAndLoginType.CONFIRM_USER_PASSWORD:
      return {
        ...state,
        confirmUserPassword: action.payload,
      };
    default:
      return state;
  }
};

export default userVerificationReducer;
