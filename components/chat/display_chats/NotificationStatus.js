import React from "react";
import { StyleSheet, Text } from "react-native";

const NotificationStatus = () => {
  return <Text style={styles.numberOfMessages}>1</Text>;
};

const styles = StyleSheet.create({
  numberOfMessages: {
    textAlign: "center",
    marginTop: 10,
    width: 21.81,
    height: 21.81,
    borderRadius: 10.3,
    backgroundColor: "red",
    color: "#FFF",
  },
});

export default NotificationStatus;
