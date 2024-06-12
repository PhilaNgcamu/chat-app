import React from "react";
import { Text, StyleSheet } from "react-native";

const TypingIndicator = ({ otherUserTyping, otherUserName }) =>
  otherUserTyping && (
    <Text style={styles.typingIndicator}>{otherUserName} is typing...</Text>
  );

const styles = StyleSheet.create({
  typingIndicator: {
    paddingHorizontal: 16,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 5,
    textAlign: "center",
  },
});

export default TypingIndicator;
