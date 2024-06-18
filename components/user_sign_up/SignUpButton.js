import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../utils/scale";

const SignUpButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Create an account</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#24786D",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: moderateScale(20),
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default SignUpButton;
