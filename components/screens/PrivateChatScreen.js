import React, { useEffect, useRef, useCallback } from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
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
  setIsOnline,
  setSearchQuery,
  setOtherUserName,
  setOtherUserTyping,
  setPrivateMessages,
  addNewPrivateMessage,
  setPrivateFilteredMessages,
} from "../../redux/actions";
import ChatHeader from "../../components/chat/individual_chat/ChatHeader";
import MessageList from "../../components/chat/individual_chat/MessageList";
import TypingIndicator from "../../components/chat/individual_chat/TypingIndicator";
import ChatInput from "../../components/chat/individual_chat/ChatInput";

const PrivateChatScreen = ({ route, navigation }) => {
  const { contactId, contactName, contactAvatar } = route.params;
  const dispatch = useDispatch();

  const privateMessages = useSelector((state) => state.privateMessages);
  const privateFilteredMessages = useSelector(
    (state) => state.privateFilteredMessages
  );
  const newMessage = useSelector((state) => state.newMessage);
  const isTyping = useSelector((state) => state.isTyping);
  const otherUserTyping = useSelector((state) => state.otherUserTyping);
  const otherUserName = useSelector((state) => state.otherUserName);
  const isOnline = useSelector((state) => state.isOnline);
  const image = useSelector((state) => state.image);
  const searchQuery = useSelector((state) => state.searchQuery);
  const inputRef = useRef(null);

  const { setTabBarVisible } = useTabBarVisibility();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [])
  );

  useEffect(() => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const chatId = [userId, contactId].sort().join("_");
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const typingRef = ref(db, `chats/${chatId}/typingStatus/${contactId}`);
    const userRef = ref(db, `users/${contactId}`);

    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      dispatch(setPrivateMessages(messageList));
      dispatch(setPrivateFilteredMessages(messageList));
      markMessagesAsRead(messageList, chatId);
    });

    const unsubscribeTyping = onValue(typingRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(setOtherUserTyping(snapshot.val().isTyping));
      }
    });

    const unsubscribeUser = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        dispatch(setOtherUserName(userData.name));
        dispatch(setIsOnline(userData.online));
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
      unsubscribeUser();
    };
  }, [contactId]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = privateMessages.filter((message) => {
        if (message.text)
          return message.text.toLowerCase().includes(searchQuery.toLowerCase());
      });
      dispatch(setPrivateFilteredMessages(filtered));
    } else {
      dispatch(setPrivateFilteredMessages(privateMessages));
    }
  }, [searchQuery, privateMessages]);

  const markMessagesAsRead = async (messages, chatId) => {
    const db = getDatabase();
    const updates = {};
    messages.forEach((message) => {
      if (!message.read && message.userId !== auth.currentUser.uid) {
        updates[`chats/${chatId}/messages/${message.id}/read`] = true;
      }
    });
    await update(ref(db), updates);
  };

  const handleSend = async () => {
    if (newMessage.trim() === "" && !image) {
      return;
    }

    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const chatId = [userId, contactId].sort().join("_");

    if (newMessage.trim() !== "") {
      await push(ref(db, `chats/${chatId}/messages`), {
        text: newMessage,
        createdAt: serverTimestamp(),
        userId,
        read: false,
        senderName: auth.currentUser.displayName,
      });
      dispatch(addNewPrivateMessage(""));
    }

    if (image) {
      const storage = getStorage();
      const imageRef = storageRef(
        storage,
        `chatImages/${chatId}/${Date.now()}`
      );
      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      await push(ref(db, `chats/${chatId}/messages`), {
        imageUrl,
        createdAt: serverTimestamp(),
        userId,
        read: false,
        senderName: auth.currentUser.displayName,
      });
      dispatch(setImage(null));
    }

    dispatch(setIsTyping(false));
    await updateTypingStatus(false, chatId);
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

  const updateTypingStatus = async (status, chatId) => {
    const db = getDatabase();
    await update(
      ref(db, `chats/${chatId}/typingStatus/${auth.currentUser.uid}`),
      {
        isTyping: status,
      }
    );
  };

  const handleTyping = (text) => {
    const userId = auth.currentUser.uid;
    const chatId = [userId, contactId].sort().join("_");
    dispatch(addNewPrivateMessage(text));
    if (text.trim() !== "" && !isTyping) {
      dispatch(setIsTyping(true));
      updateTypingStatus(true, chatId);
    } else if (text.trim() === "" && isTyping) {
      dispatch(setIsTyping(false));
      updateTypingStatus(false, chatId);
    }
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
      <MessageList messages={privateFilteredMessages} inputRef={inputRef} />
      <TypingIndicator
        otherUserTyping={otherUserTyping}
        otherUserName={otherUserName}
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
  searchInput: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000",
  },
});

export default PrivateChatScreen;
