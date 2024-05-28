import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
  Modal,
} from "react-native";
import { useFonts } from "expo-font";

const GroupChat = () => {
  const [groupName, setGroupName] = useState("");
  const [participants, setParticipants] = useState("");
  const [groupMessages, setGroupMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [isJoiningGroup, setIsJoiningGroup] = useState(false);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleCreateGroup = () => {
    setIsCreatingGroup(false);
  };

  const handleJoinGroup = () => {
    setIsJoiningGroup(false);
  };

  const handleSendMessage = () => {
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      sender: "me",
    };
    setGroupMessages((prevMessages) => [...prevMessages, newMessage]);
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
      <Text style={styles.timestamp}>{item.timestamp}</Text>
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
        <Text style={styles.title}>Group Chat</Text>
      </View>
      <FlatList
        data={groupMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <Button title="Create Group" onPress={() => setIsCreatingGroup(true)} />
        <Button title="Join Group" onPress={() => setIsJoiningGroup(true)} />
      </View>
      <Modal visible={isCreatingGroup} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create Group</Text>
          <TextInput
            style={styles.input}
            placeholder="Group Name"
            value={groupName}
            onChangeText={setGroupName}
          />
          <TextInput
            style={styles.input}
            placeholder="Add Participants (comma-separated emails)"
            value={participants}
            onChangeText={setParticipants}
          />
          <Button title="Create" onPress={handleCreateGroup} />
          <Button
            title="Cancel"
            onPress={() => setIsCreatingGroup(false)}
            color="red"
          />
        </View>
      </Modal>
      <Modal visible={isJoiningGroup} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Join Group</Text>
          <TextInput
            style={styles.input}
            placeholder="Group Name or ID"
            value={groupName}
            onChangeText={setGroupName}
          />
          <Button title="Join" onPress={handleJoinGroup} />
          <Button
            title="Cancel"
            onPress={() => setIsJoiningGroup(false)}
            color="red"
          />
        </View>
      </Modal>
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
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
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
  timestamp: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#797C7B",
    marginTop: 4,
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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  modalTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
});

export default GroupChat;
