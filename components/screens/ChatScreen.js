import React, { useState, useEffect } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, this is a test message",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "John Doe",
        },
        received: true,
      },
    ]);

    // Simulate typing indicator
    setTimeout(() => setIsTyping(true), 2000);
    setTimeout(() => setIsTyping(false), 5000);
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#0084ff",
          borderRadius: 15,
          padding: 5,
        },
        left: {
          backgroundColor: "#f0f0f0",
          borderRadius: 15,
          padding: 5,
        },
      }}
      textStyle={{
        right: {
          color: "#fff",
        },
        left: {
          color: "#000",
        },
      }}
    />
  );

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <MaterialIcons name="send" size={30} color="#0084ff" />
      </View>
    </Send>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0084ff" />
    </View>
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={{ alignItems: "center" }}
    />
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      renderLoading={renderLoading}
      isTyping={isTyping}
      renderInputToolbar={renderInputToolbar}
      renderAvatar={(props) => (
        <Image
          source={{ uri: props.currentMessage.user.avatar }}
          style={styles.avatar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default ChatScreen;
