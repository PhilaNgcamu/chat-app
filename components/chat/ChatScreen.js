import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  serverTimestamp,
  get,
} from "firebase/database";
import { auth } from "../../backend/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useTabBarVisibility } from "../screens/useTabBarVisibilityContext";

const ChatScreen = ({ route }) => {
  const { chatId, chatName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState([]);
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
    const messagesRef = ref(db, `groups/${chatId}/messages`);
    const typingRef = ref(db, `groups/${chatId}/typingStatus`);

    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setMessages(messageList);
      markMessagesAsRead(messageList);
    });

    const unsubscribeTyping = onValue(typingRef, (snapshot) => {
      if (snapshot.exists()) {
        const typingUsers = [];
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().isTyping) {
            typingUsers.push(childSnapshot.key);
          }
        });
        setOtherUserTyping(typingUsers);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, [chatId]);

  console.log(chatId);

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

  const handleSend = async () => {
    if (newMessage.trim() === "") return;
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    await push(ref(db, `groups/${chatId}/messages`), {
      text: newMessage,
      createdAt: serverTimestamp(),
      userId,
      readBy: { [userId]: true },
      senderName: auth.currentUser.displayName,
    });
    setNewMessage("");
    setIsTyping(false);
    await updateTypingStatus(false);
  };

  const updateTypingStatus = async (status) => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    await update(ref(db, `groups/${chatId}/typingStatus/${userId}`), {
      isTyping: status,
    });
  };

  const handleTyping = (text) => {
    setNewMessage(text);
    if (text.trim() !== "" && !isTyping) {
      setIsTyping(true);
      updateTypingStatus(true);
    } else if (text.trim() === "" && isTyping) {
      setIsTyping(false);
      updateTypingStatus(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageItem,
        item.userId === auth.currentUser.uid && styles.myMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <View style={styles.messageMeta}>
        <Text style={styles.senderName}>
          {item.userId === auth.currentUser.uid ? "You" : item.senderName}
        </Text>
        <Text style={styles.messageTimestamp}>
          {format(new Date(item.createdAt), "HH:mm")}
        </Text>
        {item.readBy?.[auth.currentUser.uid] &&
          item.userId === auth.currentUser.uid && (
            <MaterialIcons name="done-all" size={16} color="#4CAF50" />
          )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.chatName}>{chatName}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        ref={inputRef}
        onContentSizeChange={() =>
          inputRef.current.scrollToEnd({ animated: true })
        }
      />
      {otherUserTyping.length > 0 && (
        <Text style={styles.typingIndicator}>
          {otherUserTyping.join(", ")}{" "}
          {otherUserTyping.length === 1 ? "is" : "are"} typing...
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={handleTyping}
          placeholder="Type a message"
          placeholderTextColor="#888"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    padding: 16,
    backgroundColor: "#24786D",
    justifyContent: "center",
    alignItems: "center",
  },
  chatName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: "flex-start",
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  myMessage: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  senderName: {
    fontSize: 12,
    color: "#888",
    marginRight: 4,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 16,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    backgroundColor: "#24786D",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  typingIndicator: {
    paddingHorizontal: 16,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 5,
    textAlign: "center",
  },
});

export default ChatScreen;
