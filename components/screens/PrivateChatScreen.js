import React, { useEffect, useRef, useCallback } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
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
import { auth } from "../../backend/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useTabBarVisibility } from "../chat/custom_hook/useTabBarVisibilityContext";
import {
  setImage,
  setGroupMessages,
  setPrivateMessages,
  addNewPrivateMessage,
} from "../../redux/actions";
import ChatHeader from "../../components/chat/individual_chat/ChatHeader";
import MessageList from "../../components/chat/individual_chat/MessageList";
import ChatInput from "../../components/chat/individual_chat/ChatInput";

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
  const groupMessages = useSelector((state) => state.groupMessages);
  const newMessage = useSelector((state) => state.newMessage);
  const isOnline = useSelector((state) => state.isOnline);
  const image = useSelector((state) => state.image);
  const inputRef = useRef(null);

  const { setTabBarVisible } = useTabBarVisibility();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [setTabBarVisible])
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
        messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
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
  }, [chatId, contactId, chatType, dispatch]);

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
      senderName: auth.currentUser.displayName,
      text: newMessage.trim() !== "" ? newMessage : undefined,
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

    dispatch(addNewPrivateMessage(""));
    await push(ref(db, chatIdPath), messageData);
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

  console.log(contactName, "contactNames");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <ChatHeader
        contactAvatar={chatType === "group" ? chatAvatar : contactAvatar}
        contactName={chatType === "group" ? chatName : contactName}
        isOnline={isOnline}
        type={chatType}
        navigation={navigation}
      />
      <MessageList
        messages={chatType === "group" ? groupMessages : privateMessages}
        inputRef={inputRef}
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
