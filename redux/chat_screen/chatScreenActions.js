export const chatScreenType = {
  SET_IMAGE_TO_BE_SENT: "SET_IMAGE_TO_BE_SENT",
  SET_CHAT_ID: "SET_CHAT_ID",
  SET_CURRENT_USER_ID: "SET_CURRENT_USER_ID",
  SET_RECIPIENT_ID: "SET_RECIPIENT_ID",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
  EXPO_PUSH_TOKEN: "EXPO_PUSH_TOKEN",
};

export const setImageToBeSent = (setImage) => ({
  type: chatScreenType.SET_IMAGE_TO_BE_SENT,
  payload: setImage,
});

export const setChatId = (chatId) => ({
  type: chatScreenType.SET_CHAT_ID,
  payload: chatId,
});

export const setCurrentUserId = (currentUserId) => ({
  type: chatScreenType.SET_CURRENT_USER_ID,
  payload: currentUserId,
});

export const setRecipientId = (recipientId) => ({
  type: chatScreenType.SET_RECIPIENT_ID,
  payload: recipientId,
});

export const setNotification = (notification) => ({
  type: chatScreenType.PUSH_NOTIFICATION,
  payload: notification,
});

export const expoPushToken = (token) => ({
  type: chatScreenType.EXPO_PUSH_TOKEN,
  payload: token,
});
