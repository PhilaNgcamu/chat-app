import { privateChatType } from "./privateChatActions";

const initialState = {
  privateMessages: [],
  neMessage: "",
};

const privateChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case privateChatType.DISPLAY_PRIVATE_MESSAGES:
      return {
        ...state,
        privateMessages: action.payload,
      };
    case privateChatType.ADD_NEW_PRIVATE_MESSAGE:
      return {
        ...state,
        newMessage: action.payload,
      };
    default:
      return state;
  }
};

export default privateChatReducer;
