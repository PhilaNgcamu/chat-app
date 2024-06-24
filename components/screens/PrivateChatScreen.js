import React, { useEffect, useRef, useCallback } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
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
import { auth } from "../../backend/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useTabBarVisibility } from "../chat/custom_hook/useTabBarVisibilityContext";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import {
  setImage,
  setIsTyping,
  setPrivateMessages,
  addNewPrivateMessage,
} from "../../redux/actions";
import ChatHeader from "../../components/chat/individual_chat/ChatHeader";
import MessageList from "../../components/chat/individual_chat/MessageList";
import ChatInput from "../../components/chat/individual_chat/ChatInput";

const PrivateChatScreen = ({ route, navigation }) => {
  const { contactId, contactName, contactAvatar, chatId } = route.params;
  console.log(contactAvatar, "This is contact avatar");
  const dispatch = useDispatch();

  const privateMessages = useSelector((state) => state.privateMessages);
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

  // useEffect(() => {
  //   const db = getDatabase();
  //   const messagesRef = ref(db, `groups/${chatId}/messages`);

  //   const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
  //     const messageList = [];
  //     snapshot.forEach((childSnapshot) => {
  //       messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
  //     });
  //     dispatch(setGroupMessages(messageList));
  //     dispatch(setGroupFilteredMessages(messageList));
  //     markMessagesAsRead(messageList);
  //   });

  //   return () => {
  //     unsubscribeMessages();
  //   };
  // }, [chatId]);

  useEffect(() => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const chatId =
      userId < contactId ? `${userId}_${contactId}` : `${contactId}_${userId}`;
    const messagesRef = ref(db, `chats/${chatId}/messages`);

    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      dispatch(setPrivateMessages(messageList));
    });

    return () => {
      unsubscribeMessages();
    };
  }, [contactId, dispatch]);

  const handleSend = async () => {
    if (newMessage.trim() === "" && !image) {
      return;
    }

    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const chatId = [userId, contactId].sort().join("_");

    const messageData = {
      createdAt: serverTimestamp(),
      userId,
      senderName: auth.currentUser.displayName,
      text: newMessage.trim() !== "" ? newMessage : undefined,
    };

    if (image) {
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
    }
    dispatch(addNewPrivateMessage(""));
    await push(ref(db, `chats/${chatId}/messages`), messageData);
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <ChatHeader
        contactAvatar={contactAvatar}
        contactName={contactName}
        isOnline={isOnline}
        navigation={navigation}
      />
      <MessageList messages={privateMessages} inputRef={inputRef} />
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

export default PrivateChatScreen;
