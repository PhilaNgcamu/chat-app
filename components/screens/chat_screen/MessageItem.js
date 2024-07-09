import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { format } from "date-fns";
import { auth } from "../../../backend/firebaseConfig";
import { useFonts } from "expo-font";

const MessageItem = ({ item, type }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const isGroup = type === "group";
  const isCurrentUser = item.userId === auth.currentUser.uid;

  return (
    <View style={styles.inputContainer}>
      <View style={isCurrentUser ? null : styles.messageItemContainer}>
        <View
          style={[
            styles.messageItem,
            isCurrentUser ? styles.myMessage : styles.otherMessage,
          ]}
        >
          {isGroup && !isCurrentUser && (
            <Text style={styles.groupMemberName}>{item.senderName}</Text>
          )}
          <View style={styles.messageMeta}>
            {item.text && (
              <Text
                style={[
                  styles.messageText,
                  isCurrentUser
                    ? styles.myMessageText
                    : styles.otherMessageText,
                ]}
              >
                {item.text.trim()}
              </Text>
            )}
            {item.imageUrl && (
              <Image
                source={{ uri: item.imageUrl }}
                style={[
                  styles.photoItem,
                  isCurrentUser ? styles.myMessage : styles.otherMessage,
                ]}
              />
            )}
          </View>
          <Text
            style={[
              styles.messageTimestamp,
              isCurrentUser
                ? styles.myMessageTimestamp
                : styles.otherMessageTimestamp,
            ]}
          >
            {format(new Date(item.createdAt), "HH:mm")} AM
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    marginBottom: 40,
    padding: 15,
  },
  messageItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  groupMemberContainer: {
    width: "100%",
  },
  photoItem: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 8,
  },
  messageItem: {
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    backgroundColor: "#F2F7FB",
    alignSelf: "flex-start",
    maxWidth: "55%",
  },
  myMessage: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#20A090",
    alignSelf: "flex-end",
  },
  otherMessage: {
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#F2F7FB",
    alignSelf: "flex-start",
  },
  groupMemberName: {
    fontSize: 14,
    color: "#000E08",
    fontFamily: "Poppins-Regular",
  },
  messageMeta: {
    position: "relative",
    top: 9,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    textAlign: "left",
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#000",
  },
  messageTimestamp: {
    top: 28,
    fontSize: 12,
    color: "#797C7B",
    fontFamily: "Poppins-Bold",
  },
  myMessageTimestamp: {
    alignSelf: "flex-end",
    color: "#797C7B",
  },
  otherMessageTimestamp: {
    textAlign: "right",
    color: "#797C7B",
  },
  otherMemberMessageTimestamp: {
    alignSelf: "flex-end",
    left: 50,
    color: "#797C7B",
  },
});

export default MessageItem;
