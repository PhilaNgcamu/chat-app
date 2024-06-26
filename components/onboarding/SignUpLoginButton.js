import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/scale";

const SignUpOrLoginButton = ({ onPress, text, backgroundColor, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: 25,
    marginVertical: verticalScale(20),
    alignItems: "center",
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});

export default SignUpOrLoginButton;
