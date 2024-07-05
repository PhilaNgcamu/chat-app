export const userProfileSignupAndLoginType = {
  SET_PROFILE_PICTURE: "SET_PROFILE_PICTURE",
  SET_USER_EMAIL: "SET_USER_EMAIL",
  SET_USER_PASSWORD: "SET_USER_PASSWORD",
  SET_STATUS_MESSAGE: "SET_STATUS_MESSAGE",
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_USER_NAME: "SET_USER_NAME",
  SET_USER_PASSWORD: "SET_USER_PASSWORD",
  CONFIRM_USER_PASSWORD: "CONFIRM_USER_PASSWORD",
};

export const setProfilePicture = (profilePicture) => ({
  type: userProfileSignupAndLoginType.SET_PROFILE_PICTURE,
  payload: profilePicture,
});

export const setUserEmail = (email) => ({
  type: userProfileSignupAndLoginType.SET_USER_EMAIL,
  payload: email,
});

export const setUserPassword = (password) => ({
  type: userProfileSignupAndLoginType.SET_USER_PASSWORD,
  payload: password,
});

export const setStatusMessage = (message) => ({
  type: userProfileSignupAndLoginType.SET_STATUS_MESSAGE,
  payload: message,
});

export const setPhoneNumber = (phoneNumber) => ({
  type: userProfileSignupAndLoginType.SET_PHONE_NUMBER,
  payload: phoneNumber,
});

export const setLoading = (loading) => ({
  type: userProfileSignupAndLoginType.SET_IS_LOADING,
  payload: loading,
});

export const setUserName = (name) => ({
  type: userProfileSignupAndLoginType.SET_USER_NAME,
  payload: name,
});

export const confirmPassword = (password) => ({
  type: userProfileSignupAndLoginType.CONFIRM_USER_PASSWORD,
  payload: password,
});
