import { combineReducers } from "redux";

import chatListReducer from "./chat_list/chatListReducer";
import groupChatReducer from "./group_chat/groupChatReducer";
import tabBarVisibilityReducer from "./tab_bar/tabBarReducer";
import chatScreenReducer from "./chat_screen/chatScreenReducer";
import privateChatReducer from "./private_chat/privateChatReducer";
import userVerificationReducer from "./user_profile_sign_up_and_login/userProfileSignupAndLoginReducer";

const rootReducers = combineReducers({
  chatList: chatListReducer,
  groupChat: groupChatReducer,
  privateChat: privateChatReducer,
  chatScreen: chatScreenReducer,
  tabBarVisibility: tabBarVisibilityReducer,
  userVerification: userVerificationReducer,
});

export default rootReducers;
