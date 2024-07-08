import { groupChatType } from "./groupChatActions";

const initialState = {
  selectedGroupContacts: [],
  groupContacts: [],
  groupMessages: [],
  groupImage: null,
  groupName: "",
};

const groupChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupChatType.SET_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: action.payload,
      };
    case groupChatType.SET_SELECTED_GROUP_CONTACTS:
      return {
        ...state,
        selectedGroupContacts: action.payload,
      };
    case groupChatType.SET_GROUP_IMAGE:
      return {
        ...state,
        groupImage: action.payload,
      };
    case groupChatType.SET_GROUP_NAME:
      return {
        ...state,
        groupName: action.payload,
      };

    case groupChatType.DISPLAY_GROUP_MESSAGES:
      return {
        ...state,
        groupMessages: action.payload,
      };

    default:
      return state;
  }
};

export default groupChatReducer;
