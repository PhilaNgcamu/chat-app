export const authenticatedUserType = {
  AUTHENTICATED_USER: "AUTHENTICATED_USER",
};

export const authenticateUser = (user) => ({
  type: authenticatedUserType.AUTHENTICATED_USER,
  payload: user,
});
