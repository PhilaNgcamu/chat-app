import React, { useEffect, useRef, useCallback } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
  update,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth } from "../../../backend/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useTabBarVisibility } from "../../chat/custom_hook/useTabBarVisibilityContext";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import {
  updateNotification,
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../../../utils/notificationUtils";
import { displayGroupMessages } from "../../../redux/chat_list/chatListActions";
import {
  addNewPrivateMessage,
  displayPrivateMessages,
} from "../../../redux/private_chat/privateChatActions";
import {
  expoPushToken,
  setChatId,
  setCurrentUserId,
  setImageToBeSent,
  setRecipientId,
  setNotification,
} from "../../../redux/chat_screen/chatScreenActions";
import { setLoading } from "../../../redux/user_profile_sign_up_and_login/userProfileSignupAndLoginActions";

const ChatScreen = ({ route, navigation }) => {
  const {
    contactId,
    contactName,
    contactAvatar,
    groupChatId,
    chatType,
    chatName,
    chatAvatar,
  } = route.params;

  const dispatch = useDispatch();

  const privateMessages = useSelector(
    (state) => state.privateChat.privateMessages
  );
  const groupMessages = useSelector((state) => state.groupChat.groupMessages);
  const newMessage = useSelector((state) => state.privateChat.newMessage);
  const image = useSelector((state) => state.chatScreen.chosenImageToBeSent);
  const expoNotifyToken = useSelector(
    (state) => state.chatScreen.expoPushToken
  );
  const isLoading = useSelector((state) => state.userVerification.isLoading);

  const inputRef = useRef(null);

  const { setTabBarVisible } = useTabBarVisibility();

  const notificationListener = useRef();
  const responseListener = useRef();

  const userId = auth.currentUser.uid;

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => {
        setTabBarVisible(true);
      };
    }, [setTabBarVisible])
  );

  useEffect(() => {
    const db = getDatabase();
    const isGroupChat = chatType === "group";

    const messagesRef = ref(
      db,
      `${
        isGroupChat
          ? `groups/${groupChatId}`
          : `chats/${
              userId < contactId
                ? `${userId}_${contactId}`
                : `${contactId}_${userId}`
            }`
      }/messages`
    );

    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      if (isGroupChat) {
        dispatch(displayGroupMessages(messageList));
      } else {
        dispatch(displayPrivateMessages(messageList));
      }
    });

    return () => {
      unsubscribeMessages();
    };
  }, [groupChatId, contactId, chatType, dispatch, userId]);

  useEffect(() => {
    dispatch(setCurrentUserId(userId));
    dispatch(setRecipientId(contactId));
    dispatch(
      setChatId(
        chatType === "group"
          ? groupChatId
          : [userId, contactId].sort().join("_")
      )
    );
  }, [contactId, groupChatId, chatType, userId, dispatch]);

  const handleSend = useCallback(async () => {
    if (newMessage?.trim() === "" && !image) {
      return;
    }

    dispatch(setLoading(true));

    const db = getDatabase();
    const chatIdPath =
      chatType === "group"
        ? `groups/${groupChatId}/messages`
        : `chats/${[userId, contactId].sort().join("_")}/messages`;

    const messageData = {
      createdAt: serverTimestamp(),
      userId,
      receiverId: chatType !== "group" ? contactId : groupChatId,
      senderName: auth.currentUser.displayName,
    };

    if (image) {
      try {
        const storage = getStorage();
        const imageRef = storageRef(
          storage,
          `chatImages/${userId}/${Date.now()}`
        );
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imageRef);
        messageData.imageUrl = imageUrl;
        dispatch(setImageToBeSent(null));
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    } else {
      messageData.text = newMessage?.trim();
    }

    if (chatType === "group") {
      update(ref(db, `groups/${groupChatId}`), {
        lastGroupMessage:
          newMessage?.trim() !== "" ? newMessage?.trim() : undefined,
      });
    }

    await updateNotification(
      userId,
      chatType === "group"
        ? groupChatId
        : [userId, contactId]?.sort().join("_"),
      false,
      chatType
    )
      .then(async () => {
        await push(ref(db, chatIdPath), messageData);
        dispatch(addNewPrivateMessage(""));
      })
      .catch((error) => {
        console.error("Error notifying user", error);
      });

    await sendPushNotification(
      expoNotifyToken,
      `${auth.currentUser.displayName.trim()} sent you a message`,
      messageData.text || "You've received a new message"
    );

    dispatch(setLoading(false));
  }, [
    chatType,
    groupChatId,
    contactId,
    userId,
    newMessage,
    image,
    expoNotifyToken,
    dispatch,
  ]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setImageToBeSent(result.assets[0].uri));
    }
  }, [dispatch]);

  const removeImage = useCallback(() => {
    dispatch(setImageToBeSent(null));
  }, [dispatch]);

  const handleTyping = useCallback(
    (text) => {
      dispatch(addNewPrivateMessage(text));
    },
    [dispatch]
  );

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => dispatch(expoPushToken(token ?? "")))
      .catch((error) => dispatch(expoPushToken(`${error}`)));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        dispatch(setNotification(notification));
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <ChatHeader
        contactAvatar={chatType === "group" ? chatAvatar : contactAvatar}
        contactName={chatType === "group" ? chatName : contactName}
        isOnline={chatType}
        type={chatType}
        navigation={navigation}
      />
      <MessageList
        messages={chatType === "group" ? groupMessages : privateMessages}
        inputRef={inputRef}
        chatType={chatType}
      />
      <ChatInput
        newMessage={newMessage}
        handleTyping={handleTyping}
        handleSend={handleSend}
        pickImage={pickImage}
        removeImage={removeImage}
        image={image}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default ChatScreen;
