export const chatListType = {
  DISPLAY_CONTACTS: "DISPLAY_CONTACTS",
  DISPLAY_GROUPS: "DISPLAY_GROUPS",
  DISPLAY_STATUSES: "DISPLAY_STATUSES",
  DISPLAY_GROUP_MESSAGES: "DISPLAY_GROUP_MESSAGE",
  DISPLAY_LAST_MESSAGE: "DISPLAY_LAST_MESSAGE",
  DISPLAY_NOTIFICATIONS: "DISPLAY_NOTIFICATIONS",
  NOTIFY_THE_RECIPIENT_ID: "NOTIFY_THE_RECIPIENT_ID",
};

export const displayContacts = (displayContacts) => ({
  type: chatListType.DISPLAY_CONTACTS,
  payload: displayContacts,
});

export const displayGroups = (groups) => ({
  type: chatListType.DISPLAY_GROUPS,
  payload: groups,
});

export const displayStatuses = (statuses) => ({
  type: chatListType.DISPLAY_STATUSES,
  payload: statuses,
});

export const displayGroupMessages = (groupMessages) => ({
  type: chatListType.DISPLAY_GROUP_MESSAGES,
  payload: groupMessages,
});

export const displayLastMessage = (lastMessage) => ({
  type: chatListType.DISPLAY_LAST_MESSAGE,
  payload: lastMessage,
});

export const displayNotifications = (notifications) => ({
  type: chatListType.DISPLAY_NOTIFICATIONS,
  payload: notifications,
});

export const notifyTheRecipientId = (recipientId) => ({
  type: chatListType.NOTIFY_THE_RECIPIENT_ID,
  payload: recipientId,
});
