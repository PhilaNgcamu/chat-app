import React from "react";
import { Text, StyleSheet } from "react-native";

const TypingIndicator = ({ otherUserTyping }) => {
  return (
    otherUserTyping.length > 0 && (
      <Text style={styles.typingIndicator}>
        {otherUserTyping.join(", ")}{" "}
        {otherUserTyping.length === 1 ? "is" : "are"} typing...
      </Text>
    )
  );
};

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
