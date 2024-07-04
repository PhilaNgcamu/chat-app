import React, { useEffect, useRef, useCallback, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
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
import {
  setImage,
  setGroupMessages,
  setPrivateMessages,
  addNewPrivateMessage,
  increaseNotifications,
  setPrivateChatId,
  setCurrentUserId,
  setReceiverId,
  shouldPressContact,
  setIsScreenFocused,
} from "../../../redux/actions";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import {
  updateNotification,
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../../../utils/notificationUtils";

const ChatScreen = ({ route, navigation }) => {
  const {
    contactId,
    contactName,
    contactAvatar,
    chatId,
    chatType,
    chatName,
    chatAvatar,
  } = route.params;
  const dispatch = useDispatch();

  const privateMessages = useSelector((state) => state.privateMessages);
  const isChatScreenFocussed = useSelector(
    (state) => state.isChatScreenFocussed
  );
  const isContactPressed = useSelector((state) => state.isContactPressed);

  const groupMessages = useSelector((state) => state.groupMessages);
  const newMessage = useSelector((state) => state.newMessage);
  const image = useSelector((state) => state.image);
  const inputRef = useRef(null);

  const { setTabBarVisible } = useTabBarVisibility();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      dispatch(setIsScreenFocused(true));
      return () => {
        setTabBarVisible(true);
        dispatch(setIsScreenFocused(false));
      };
    }, [setTabBarVisible, isChatScreenFocussed])
  );

  useEffect(() => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const isGroupChat = chatType === "group";
    const messagesRef = ref(
      db,
      `${
        isGroupChat
          ? `groups/${chatId}`
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
        dispatch(setGroupMessages(messageList));
      } else {
        dispatch(setPrivateMessages(messageList));
      }
    });

    return () => {
      unsubscribeMessages();
    };
  }, [chatId, contactId, chatType, dispatch, isChatScreenFocussed]);

  console.log("Is Focussed", isChatScreenFocussed);

  const handleSend = async () => {
    if (newMessage.trim() === "" && !image) {
      return;
    }

    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const chatIdPath =
      chatType === "group"
        ? `groups/${chatId}/messages`
        : `chats/${[userId, contactId].sort().join("_")}/messages`;

    const messageData = {
      createdAt: serverTimestamp(),
      userId,
      receiverId: chatType !== "group" ? contactId : chatId,
      senderName: auth.currentUser.displayName,
      contactName: contactName,
      text: newMessage.trim() !== "" ? newMessage.trim() : undefined,
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
        dispatch(setImage(null));
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
    console.log("messageData", messageData);
    dispatch(setCurrentUserId(userId));
    dispatch(setReceiverId(contactId));
    dispatch(setPrivateChatId([userId, contactId].sort().join("_")));
    dispatch(increaseNotifications(1));
    dispatch(shouldPressContact(false));

    await updateNotification(
      userId,
      [userId, contactId].sort().join("_"),
      false
    )
      .then(async () => {
        await push(ref(db, chatIdPath), messageData);
        dispatch(addNewPrivateMessage(""));
        console.log("Notified user 3");
      })
      .catch((error) => {
        console.error("Error notifying user", error);
      });

    await sendPushNotification(
      expoPushToken,
      `${auth.currentUser.displayName} sent you a message`,
      messageData.text || "You've received a new message"
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setImage(result.assets[0].uri));
    }
  };

  const handleTyping = (text) => {
    dispatch(addNewPrivateMessage(text));
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
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
  }, []);

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
        image={image}
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
