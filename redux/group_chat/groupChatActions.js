export const groupChatType = {
  SET_GROUP_NAME: "SET_GROUP_NAME",
  SET_GROUP_CONTACTS: "SET_GROUP_CONTACTS",
  SET_SELECTED_GROUP_CONTACTS: "SET_SELECTED_GROUP_CONTACTS",
  SET_GROUP_IMAGE: "SET_GROUP_IMAGE",
};

export const setGroupName = (groupName) => ({
  type: groupChatType.SET_GROUP_NAME,
  payload: groupName,
});

export const setGroupContacts = (groupContacts) => ({
  type: groupChatType.SET_GROUP_CONTACTS,
  payload: groupContacts,
});

export const setSelectedGroupContacts = (selectedGroupContacts) => ({
  type: groupChatType.SET_SELECTED_GROUP_CONTACTS,
  payload: selectedGroupContacts,
});

export const setGroupImage = (groupImage) => ({
  type: groupChatType.SET_GROUP_IMAGE,
  payload: groupImage,
});
