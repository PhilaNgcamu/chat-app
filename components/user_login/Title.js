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
      <Text style={styles.title}>to Chatbox</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  loginContainer: {
    position: "relative",
    marginBottom: verticalScale(16),
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(24),
    zIndex: 1,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(24),
    marginBottom: verticalScale(16),
  },
  stroke: {
    position: "absolute",
    zIndex: 0,
    width: horizontalScale(70),
    top: verticalScale(21),
    right: horizontalScale(2),
    height: verticalScale(10),
    backgroundColor: "#58C3B6",
  },
});

export default Title;
