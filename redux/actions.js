import actionTypes from "./actionTypes";

export const setItems = (items) => ({
  type: actionTypes.SET_ITEMS,
  payload: items,
});

export const setStatuses = (statuses) => ({
  type: actionTypes.SET_STATUSES,
  payload: statuses,
});

export const setPrivateChatId = (privateChatId) => ({
  type: actionTypes.SET_PRIVATE_CHAT_ID,
  payload: privateChatId,
});

export const setCurrentUserId = (currentUserId) => ({
  type: actionTypes.SET_CURRENT_USER_ID,
  payload: currentUserId,
});

export const setReceiverId = (receiverId) => ({
  type: actionTypes.SET_RECEIVER_USER_ID,
  payload: receiverId,
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

export const shouldPressContact = (isContactPressed) => ({
  type: actionTypes.IS_CONTACT_PRESSED,
  payload: isContactPressed,
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

export const setProfilePicture = (profilePicture) => ({
  type: actionTypes.SET_PROFILE_PICTURE,
  payload: profilePicture,
});

export const increaseNotifications = (increaseNotifications) => ({
  type: actionTypes.INCREASE_NOTIFICATIONS,
  payload: increaseNotifications,
});

export const setIsScreenFocused = (isFocused) => ({
  type: actionTypes.IS_SCREEN_FOCUSSED,
  payload: isFocused,
});

export const setOtherUserStatus = (status) => ({
  type: actionTypes.SET_OTHER_USER_STATUS,
  payload: status,
});
