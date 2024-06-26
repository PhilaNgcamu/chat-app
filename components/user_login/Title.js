import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/scale";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Log in </Text>
        <View style={styles.stroke} />
      </View>
      <Text style={styles.chatboxText}>to Chatbox</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginContainer: {
    marginBottom: verticalScale(16),
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(21),
    zIndex: 1,
  },
  chatboxText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(21),
    marginBottom: verticalScale(26),
  },
  stroke: {
    position: "relative",
    height: verticalScale(10),
    width: horizontalScale(60),
    right: horizontalScale(1),
    bottom: verticalScale(16),
    backgroundColor: "#58C3B6",
  },
});

export default Title;
