import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { format } from "date-fns";
import { auth } from "../../../backend/firebaseConfig";

const MessageItem = ({ item }) => (
  console.log(item),
  (
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
        <Image
          source={{ uri: item.imageUrl || "https://via.placeholder.com/150" }}
          style={styles.image}
        />
      )}
      <View style={styles.messageMeta}>
        <Text
          style={[
            styles.messageTimestamp,
            item.userId === auth.currentUser.uid
              ? styles.myMessageTimestamp
              : styles.otherMessageTimestamp,
          ]}
        >
          {format(new Date(item.createdAt), "HH:mm")}
        </Text>
      </View>
    </View>
  )
);

const styles = StyleSheet.create({
  messageItem: {
    padding: 12,
    backgroundColor: "#F2F7FB",
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: "flex-start",
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
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
  messageTimestamp: {
    fontSize: 12,
  },
  myMessageTimestamp: {
    color: "#FFF",
  },
  otherMessageTimestamp: {
    color: "#000",
  },
});

export default MessageItem;
