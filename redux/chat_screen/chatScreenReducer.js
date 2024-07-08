import { chatScreenType } from "./chatScreenActions";

const initialState = {
  chosenImageToBeSent: null,
  chatId: null,
  userId: null,
  recipientId: null,
  pushNotification: undefined,
  expoPushToken: "",
};

const chatScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatScreenType.SET_CHAT_ID:
      return {
        ...state,
        chatId: action.payload,
      };
    case chatScreenType.SET_CURRENT_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case chatScreenType.SET_RECIPIENT_ID:
      return {
        ...state,
        recipientId: action.payload,
      };
    case chatScreenType.SET_IMAGE_TO_BE_SENT:
      return {
        ...state,
        chosenImageToBeSent: action.payload,
      };
    case chatScreenType.PUSH_NOTIFICATION:
      return {
        ...state,
        pushNotification: action.payload,
      };
    case chatScreenType.EXPO_PUSH_TOKEN:
      return {
        ...state,
        expoPushToken: action.payload,
      };
    default:
      return state;
  }
};

export default chatScreenReducer;
