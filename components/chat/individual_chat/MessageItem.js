import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { format } from "date-fns";
import { auth } from "../../../backend/firebaseConfig";

const MessageItem = ({ item }) => {
  return (
    <View style={styles.inputContainer}>
      <View
        style={[
          styles.messageItem,
          item.userId === auth.currentUser.uid && styles.myMessage,
        ]}
      >
        <View style={styles.messageMeta}>
          <View>
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
          </View>
          {item.imageUrl && (
            <Image
              source={{
                uri: item.imageUrl || "https://via.placeholder.com/150",
              }}
              style={styles.image}
            />
          )}
        </View>
        <Text
          style={[
            styles.messageTimestamp,
            item.userId === auth.currentUser.uid
              ? styles.myMessageTimestamp
              : styles.otherMessageTimestamp,
          ]}
        >
          {format(new Date(item.createdAt), "HH:mm")} AM
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 20,
    padding: 15,
  },
  photoItem: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: "center",
  },
  messageItem: {
    padding: 10,
    backgroundColor: "green",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: "flex-start",
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#20A090",
    alignSelf: "flex-end",
  },
  senderImage: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageMeta: {
    position: "relative",
    top: 8,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#000",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },

  messageTimestamp: {
    fontSize: 12,
    alignSelf: "flex-end",
  },
  myMessageTimestamp: {
    width: "100%",
    position: "relative",
    top: 32,
    color: "#000",
  },
  otherMessageTimestamp: {
    color: "#000",
  },
});

export default MessageItem;
