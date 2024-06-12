import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { auth } from "../../backend/firebaseConfig";

const MessageItem = ({ item }) => (
  <View
    style={[
      styles.messageItem,
      item.userId === auth.currentUser.uid && styles.myMessage,
    ]}
  >
    {item.text && (
      <Text
        style={[
          styles.messageText,
          item.userId === auth.currentUser.uid
            ? styles.myMessageText
            : styles.otherMessageText,
        ]}
      >
        {item.text.trim()}
      </Text>
    )}
    {item.imageUrl && (
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    )}
    <View style={styles.messageMeta}>
      <Text style={styles.senderName}>
        {item.userId !== auth.currentUser.uid && item.senderName}
      </Text>
      <Text
        style={[
          styles.messageTimestamp,
          item.userId === auth.currentUser.uid
            ? styles.myMessageTimestamp
            : styles.otherMessageTimestamp,
        ]}
      >
        {format(new Date(item.createdAt), "HH:mm")}{" "}
      </Text>
      {item.readBy?.[auth.currentUser.uid] &&
        item.userId === auth.currentUser.uid && (
          <MaterialIcons name="done-all" size={16} color="#4CAF50" />
        )}
    </View>
  </View>
);

const styles = StyleSheet.create({
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
    backgroundColor: "#24786D",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  myMessageText: {
    color: "#FFF",
  },
  otherMessageText: {
    color: "#000",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
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
  myMessageTimestamp: {
    color: "#FFF",
  },
  otherMessageTimestamp: {
    color: "#000",
  },
});

export default MessageItem;
