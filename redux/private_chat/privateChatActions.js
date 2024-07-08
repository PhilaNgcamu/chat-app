export const privateChatType = {
  DISPLAY_PRIVATE_MESSAGES: "DISPLAY_PRIVATE_MESSAGES",
  ADD_NEW_PRIVATE_MESSAGE: "ADD_NEW_PRIVATE_MESSAGE",
};

export const displayPrivateMessages = (privateMessages) => ({
  type: privateChatType.DISPLAY_PRIVATE_MESSAGES,
  payload: privateMessages,
});

export const addNewPrivateMessage = (newMessage) => ({
  type: privateChatType.ADD_NEW_PRIVATE_MESSAGE,
  payload: newMessage,
});
