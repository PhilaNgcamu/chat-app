import { act } from "react";
import actionTypes from "./actionTypes";

const initialState = {
  items: [],
  statuses: [],
  searchQuery: "",
  groupMessages: [],
  groupFilteredMessages: [],
  newMessage: "",
  isTyping: false,
  otherUserTyping: [],
  image: null,
  groupName: "",
  contacts: [],
  selectedContacts: [],
  privateMessages: [],
  privateFilteredMessages: [],
  otherUserName: "",
  isOnline: false,
  name: "",
  email: "",
  password: "",
  loading: false,
  confirmedPassword: "",
  error: null,
  tabBarVisible: true,
  profilePicture: "https://via.placeholder.com/150",
  notificationsCount: 0,
  chatId: null,
  userId: null,
  receiverId: null,
  isContactPressed: false,
  isChatScreenFocussed: false,
  otherUserStatus: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case actionTypes.SET_STATUSES:
      return {
        ...state,
        statuses: action.payload,
      };
    case actionTypes.SET_PRIVATE_CHAT_ID:
      return {
        ...state,
        chatId: action.payload,
      };
    case actionTypes.SET_CURRENT_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case actionTypes.SET_RECEIVER_USER_ID:
      return {
        ...state,
        receiverId: action.payload,
      };
    case actionTypes.SET_GROUP_MESSAGES:
      return {
        ...state,
        groupMessages: action.payload,
      };
    case actionTypes.SET_GROUP_FILTERED_MESSAGES:
      return {
        ...state,
        groupFilteredMessages: action.payload,
      };
    case actionTypes.ADD_GROUP_MESSAGE:
      return {
        ...state,
        newMessage: action.payload,
        groupMessages: [...state.groupMessages],
      };
    case actionTypes.IS_CONTACT_PRESSED:
      return {
        ...state,
        isContactPressed: action.payload,
      };
    case actionTypes.SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case actionTypes.SET_GROUP_NAME:
      return {
        ...state,
        groupName: action.payload,
      };
    case actionTypes.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case actionTypes.SELECTED_CONTACTS:
      return {
        ...state,
        selectedContacts: action.payload,
      };
    case actionTypes.ADD_NEW_PRIVATE_MESSAGE:
      return {
        ...state,
        newMessage: action.payload,
      };
    case actionTypes.SET_PRIVATE_MESSAGES:
      return {
        ...state,
        privateMessages: action.payload,
      };
    case actionTypes.SET_PRIVATE_FILTERED_MESSAGES:
      return {
        ...state,
        privateFilteredMessages: action.payload,
      };
    case actionTypes.SET_OTHER_USER_NAME:
      return {
        ...state,
        otherUserName: action.payload,
      };
    case actionTypes.SET_IS_ONLINE:
      return {
        ...state,
        isOnline: action.payload,
      };
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case actionTypes.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case actionTypes.SET_CONFIRMED_PASSWORD:
      return {
        ...state,
        confirmedPassword: action.payload,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.IS_TAB_BAR_VISIBLE:
      return {
        ...state,
        tabBarVisible: action.payload,
      };
    case actionTypes.SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case actionTypes.INCREASE_NOTIFICATIONS:
      return {
        ...state,
        notificationsCount: action.payload,
      };
    case actionTypes.IS_SCREEN_FOCUSSED:
      return {
        ...state,
        isChatScreenFocussed: action.payload,
      };

    case actionTypes.SET_OTHER_USER_STATUS:
      return {
        ...state,
        otherUserStatus: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
