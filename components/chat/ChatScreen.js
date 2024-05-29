import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../backend/firebaseConfig";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { chatId, chatName } = route.params;

  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [chatId]);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await addDoc(collection(db, "chats", chatId, "messages"), {
          message,
          timestamp: serverTimestamp(),
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          avatar:
            auth.currentUser.photoURL || "https://via.placeholder.com/150",
        });
        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.data.uid === auth.currentUser.uid
          ? styles.myMessage
          : styles.theirMessage,
      ]}
    >
      <Image source={{ uri: item.data.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.displayName}>{item.data.displayName}</Text>
        <Text style={styles.messageText}>{item.data.message}</Text>
        <Text style={styles.timestamp}>
          {item.data.timestamp?.toDate().toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.chatTitle}>{chatName}</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  theirMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
  },
  messageContent: {
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  displayName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#24786D",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatScreen;
