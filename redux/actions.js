import actionTypes from "./actionTypes";

export const setItems = (items) => ({
  type: actionTypes.SET_ITEMS,
  payload: items,
});

export const setStatuses = (statuses) => ({
  type: actionTypes.SET_STATUSES,
  payload: statuses,
});

export const setSearchQuery = (query) => ({
  type: actionTypes.SET_SEARCH_QUERY,
  payload: query,
});

export const setGroupMessages = (groupMessages) => ({
  type: actionTypes.SET_GROUP_MESSAGES,
  payload: groupMessages,
});

export const setGroupFilteredMessages = (groupFilteredMessages) => ({
  type: actionTypes.SET_GROUP_FILTERED_MESSAGES,
  payload: groupFilteredMessages,
});

export const addGroupMessage = (groupMessage) => ({
  type: actionTypes.ADD_GROUP_MESSAGE,
  payload: groupMessage,
});

export const setIsTyping = (isTyping) => ({
  type: actionTypes.UPDATE_TYPING_STATUS,
  payload: isTyping,
});

export const setOtherUserTyping = (otherUserTyping) => ({
  type: actionTypes.SET_OTHER_USER_TYPING,
  payload: otherUserTyping,
});

export const setImage = (image) => ({
  type: actionTypes.SET_IMAGE,
  payload: image,
});

export const setGroupName = (groupName) => ({
  type: actionTypes.SET_GROUP_NAME,
  payload: groupName,
});

export const setContacts = (contacts) => ({
  type: actionTypes.SET_CONTACTS,
  payload: contacts,
});

export const setSelectedContacts = (contacts) => ({
  type: actionTypes.SELECTED_CONTACTS,
  payload: contacts,
});

export const addNewPrivateMessage = (message) => ({
  type: actionTypes.ADD_NEW_PRIVATE_MESSAGE,
  payload: message,
});

export const setPrivateMessages = (messages) => ({
  type: actionTypes.SET_PRIVATE_MESSAGES,
  payload: messages,
});

export const setPrivateFilteredMessages = (messages) => ({
  type: actionTypes.SET_PRIVATE_FILTERED_MESSAGES,
  payload: messages,
});

export const setOtherUserName = (name) => ({
  type: actionTypes.SET_OTHER_USER_NAME,
  payload: name,
});

export const setIsOnline = (isOnline) => ({
  type: actionTypes.SET_IS_ONLINE,
  payload: isOnline,
});

export const setEmail = (email) => ({
  type: actionTypes.SET_EMAIL,
  payload: email,
});

export const setPassword = (password) => ({
  type: actionTypes.SET_PASSWORD,
  payload: password,
});

export const setLoading = (loading) => ({
  type: actionTypes.SET_IS_LOADING,
  payload: loading,
});

export const setName = (name) => ({
  type: actionTypes.SET_NAME,
  payload: name,
});

export const setConfirmedPassword = (password) => ({
  type: actionTypes.SET_CONFIRMED_PASSWORD,
  payload: password,
});

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error,
});

export const setTabBarVisible = (tabBarVisible) => ({
  type: actionTypes.IS_TAB_BAR_VISIBLE,
  payload: tabBarVisible,
});
