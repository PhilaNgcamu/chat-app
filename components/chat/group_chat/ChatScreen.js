import React, { useEffect, useCallback } from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, update, get } from "firebase/database";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { auth } from "../../../backend/firebaseConfig";
import { useTabBarVisibility } from "../../screens/useTabBarVisibilityContext";
import {
  setGroupFilteredMessages,
  setOtherUserTyping,
  setGroupMessages,
  setSearchQuery,
} from "../../../redux/actions";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { StatusBar } from "expo-status-bar";

const ChatScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { chatId, chatName } = route.params;
  const groupMessages = useSelector((state) => state.groupMessages);
  const searchQuery = useSelector((state) => state.searchQuery);
  const groupFilteredMessages = useSelector(
    (state) => state.groupFilteredMessages
  );
  const otherUserTyping = useSelector((state) => state.otherUserTyping);
  const navigation = useNavigation();

  const { setTabBarVisible } = useTabBarVisibility();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [])
  );

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `groups/${chatId}/messages`);
    const typingRef = ref(db, `groups/${chatId}/typingStatus`);

    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      dispatch(setGroupMessages(messageList));
      dispatch(setGroupFilteredMessages(messageList));
      markMessagesAsRead(messageList);
    });

    const unsubscribeTyping = onValue(typingRef, async (snapshot) => {
      if (snapshot.exists()) {
        const typingUserIds = [];
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().isTyping) {
            typingUserIds.push(childSnapshot.key);
          }
        });

        const userPromises = typingUserIds.map((userId) =>
          get(ref(db, `users/${userId}`)).then((userSnapshot) => ({
            id: userId,
            name: userSnapshot.val().name,
          }))
        );

        const users = await Promise.all(userPromises);
        const userNames = users.map((user) => user.name);
        dispatch(setOtherUserTyping(userNames));
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, [chatId]);

  useEffect(() => {
    if (searchQuery === "") {
      dispatch(setGroupFilteredMessages(groupMessages));
    } else {
      const filtered = groupMessages.filter((message) => {
        if (message.text)
          return message.text
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
      });
      dispatch(setGroupFilteredMessages(filtered));
    }
  }, [searchQuery, groupMessages]);

  const markMessagesAsRead = async (messages) => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const updates = {};
    messages.forEach((message) => {
      if (!message.readBy?.[userId] && message.userId !== userId) {
        updates[
          `groups/${chatId}/messages/${message.id}/readBy/${userId}`
        ] = true;
      }
    });
    await update(ref(db), updates);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <ChatHeader chatName={chatName} />
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        placeholder="Search messages"
        placeholderTextColor="#888"
      />
      <MessageList messages={groupFilteredMessages} />
      <TypingIndicator otherUserTyping={otherUserTyping} />
      <ChatInput chatId={chatId} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 10,
    margin: 16,
    paddingLeft: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
});

export default ChatScreen;
