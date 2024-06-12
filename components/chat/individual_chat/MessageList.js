import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, inputRef }) => (
  <FlatList
    data={messages}
    renderItem={({ item }) => <MessageItem item={item} />}
    keyExtractor={(item) => item.id}
    style={styles.messageList}
    ref={inputRef}
    onContentSizeChange={() => inputRef.current.scrollToEnd({ animated: true })}
  />
);

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
  },
});

export default MessageList;
