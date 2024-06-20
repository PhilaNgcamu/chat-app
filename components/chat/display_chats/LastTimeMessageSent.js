import React from "react";
import { StyleSheet, Text } from "react-native";

const LastTimeMessageSent = () => {
  return <Text styles={styles.lastTimeMessageSent}>2 min ago</Text>;
};

const styles = StyleSheet.create({
  lastTimeMessageSent: {
    backgroundColor: "black",
    height: 60,
    width: 60,
    marginBottom: 25,
  },
});

export default LastTimeMessageSent;
