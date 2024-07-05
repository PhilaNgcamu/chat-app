export const chatListType = {
  DISPLAY_CONTACTS: "DISPLAY_CONTACTS",
  DISPLAY_GROUPS: "DISPLAY_GROUPS",
  DISPLAY_STATUSES: "DISPLAY_STATUSES",
  DISPLAY_GROUP_MESSAGES: "DISPLAY_GROUP_MESSAGE",
  DISPLAY_LAST_MESSAGE: "DISPLAY_LAST_MESSAGE",
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
