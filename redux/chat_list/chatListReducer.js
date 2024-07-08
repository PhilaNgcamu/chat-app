import { chatListType } from "./chatListActions";

const initialState = {
  contacts: [],
  groups: [],
  statuses: [],
  lastMessage: "",
  notifications: 0,
  notifyTheRecipientId: "",
};

const chatListReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatListType.DISPLAY_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case chatListType.DISPLAY_GROUPS:
      return {
        ...state,
        groups: action.payload,
      };
    case chatListType.DISPLAY_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      };
    case chatListType.DISPLAY_LAST_MESSAGE:
      return {
        ...state,
        lastMessage: action.payload,
      };
    case chatListType.DISPLAY_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case chatListType.NOTIFY_THE_RECIPIENT_ID:
      return {
        ...state,
        notifyTheRecipientId: action.payload,
      };
    default:
      return state;
  }
};

export default chatListReducer;
