import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { format } from "date-fns";
import { auth } from "../../../backend/firebaseConfig";
import { useFonts } from "expo-font";

const MessageItem = ({ item }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  console.log(JSON.stringify(item, null, 2));
  return (
    <View style={styles.inputContainer}>
      <View
        style={
          item.userId !== auth.currentUser.uid && styles.messageItemContainer
        }
      >
        {item.userId !== auth.currentUser.uid && (
          <Image source={{ uri: item.photoURL }} style={styles.photoItem} />
        )}
        <View
          style={[
            styles.messageItem,
            item.userId === auth.currentUser.uid
              ? styles.myMessage
              : styles.otherMessage,
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    marginRight: 20,
    marginBottom: 40,
    padding: 15,
  },
  messageItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  photoItem: {
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderRadius: 25,
    marginHorizontal: 16,
    backgroundColor: "red",
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  messageTimestamp: {
    width: "100%",
    position: "relative",
    top: 32,
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
});

export default MessageItem;
