import React, { useState, useEffect } from "react";
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
import { useFonts } from "expo-font";

const IndividualChat = ({ contactName, contactStatus }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    let typingTimeout;
    if (message.length > 0) {
      setIsTyping(true);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    } else {
      setIsTyping(false);
    }

    return () => clearTimeout(typingTimeout);
  }, [message]);

  const handleSend = () => {
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      sender: "me",
      read: false,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <View style={styles.messageMeta}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.sender === "me" && item.read && (
          <Text style={styles.readReceipt}>✔✔</Text>
        )}
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.contactName}>{contactName}</Text>
        <Text style={styles.contactStatus}>{contactStatus}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageList}
      />
      {isTyping && <Text style={styles.typingIndicator}>Typing...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    padding: 16,
    backgroundColor: "#41B2A4",
    borderBottomWidth: 1,
    borderBottomColor: "#CDD1D0",
  },
  contactName: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  contactStatus: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  messageText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  messageMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  timestamp: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#797C7B",
  },
  readReceipt: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#797C7B",
  },
  typingIndicator: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#797C7B",
    textAlign: "center",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#CDD1D0",
    padding: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CDD1D0",
    borderRadius: 20,
    padding: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#41B2A4",
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});

export default IndividualChat;
