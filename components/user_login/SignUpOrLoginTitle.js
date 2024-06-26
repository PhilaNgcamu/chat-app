import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/scale";

const SignUpOrLoginTitle = ({ paragraphOne, paragraphTwo }) => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.signUpOrLoginContainer}>
        <Text style={styles.loginText}>{paragraphOne} </Text>
        {paragraphOne === "Log in" && <View style={styles.strokeOne} />}
      </View>
      <View style={paragraphOne === "Sign up" && styles.signUpContainer}>
        <Text style={styles.emailText}>{paragraphTwo}</Text>
        {paragraphOne === "Sign up" && <View style={styles.strokeTwo} />}
      </View>
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
  signUpOrLoginContainer: {
    marginBottom: verticalScale(16),
  },
  signUpContainer: {
    position: "relative",
    alignItems: "flex-end",
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(21),
    zIndex: 1,
  },
  descriptionText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(21),
    marginBottom: verticalScale(26),
  },
  emailText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(21),
    marginBottom: verticalScale(6),
    zIndex: 1,
  },
  strokeOne: {
    position: "relative",
    height: verticalScale(10),
    width: horizontalScale(60),
    right: horizontalScale(1),
    bottom: verticalScale(16),
    backgroundColor: "#58C3B6",
  },
  strokeTwo: {
    position: "relative",
    height: verticalScale(10),
    width: horizontalScale(54),
    right: horizontalScale(3),
    bottom: verticalScale(23),
    backgroundColor: "#58C3B6",
  },
});

export default SignUpOrLoginTitle;
