import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/scale";

const SignUpButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFF",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: 25,
    marginVertical: verticalScale(20),
    alignItems: "center",
  },
  buttonText: {
    color: "#000E08",
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});

export default SignUpButton;
