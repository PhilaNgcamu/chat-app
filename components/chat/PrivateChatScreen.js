import React, { useState, useEffect, useRef } from "react";
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
} from "firebase/database";
import { auth } from "../../backend/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

const PrivateChatScreen = ({ route }) => {
  const { userId, userName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const db = getDatabase();
    const privateChatId = [auth.currentUser.uid, userId].sort().join("_");
    const messagesRef = ref(db, `privateChats/${privateChatId}/messages`);
    const typingRef = ref(
      db,
      `privateChats/${privateChatId}/typingStatus/${auth.currentUser.uid}`
    );

    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setMessages(messageList);
    });

    const unsubscribeTyping = onValue(typingRef, (snapshot) => {
      if (snapshot.exists()) {
        setOtherUserTyping(snapshot.val().isTyping);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
    };
  }, [userId]);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;
    const db = getDatabase();
    const privateChatId = [auth.currentUser.uid, userId].sort().join("_");
    await push(ref(db, `privateChats/${privateChatId}/messages`), {
      text: newMessage,
      createdAt: serverTimestamp(),
      userId: auth.currentUser.uid,
      senderName: auth.currentUser.displayName,
    });
    setNewMessage("");
    setIsTyping(false);
    await updateTypingStatus(false);
  };

  const updateTypingStatus = async (status) => {
    const db = getDatabase();
    const privateChatId = [auth.currentUser.uid, userId].sort().join("_");
    await update(
      ref(
        db,
        `privateChats/${privateChatId}/typingStatus/${auth.currentUser.uid}`
      ),
      {
        isTyping: status,
      }
    );
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
        <Text style={styles.senderName}>{item.senderName}</Text>
        <Text style={styles.messageTimestamp}>
          {format(new Date(item.createdAt), "HH:mm")}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.chatName}>{userName}</Text>
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
      {otherUserTyping && (
        <Text style={styles.typingIndicator}>Someone is typing...</Text>
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

export default PrivateChatScreen;
