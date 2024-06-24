import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, inputRef }) => {
  return (
    <View style={styles.messageList}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem item={item} type={"private"} />}
        keyExtractor={(item) => item.id}
        ref={inputRef}
        onContentSizeChange={() =>
          inputRef.current.scrollToEnd({ animated: true })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  },
  date: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 12,
    color: "#000E08",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default MessageList;
