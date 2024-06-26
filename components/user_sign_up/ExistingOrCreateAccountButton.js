import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from "../../utils/scale";

const ExistingOrCreateAccountButton = ({ onPress, text, color }) => {
  return (
    <TouchableOpacity
      style={
        color
          ? [styles.loginButton, { bottom: verticalScale(15) }]
          : styles.loginButton
      }
      onPress={onPress}
    >
      <Text
        style={
          color
            ? [styles.loginButtonText, { color: color }]
            : styles.loginButtonText
        }
      >
        {text}{" "}
        {text === "Existing account?" && (
          <Text
            style={
              color ? [styles.loginText, { color: color }] : styles.loginText
            }
          >
            Log in
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "transparent",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: moderateScale(20),
  },
  loginButtonText: {
    marginTop: verticalScale(20),
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#24786D",
  },
  loginText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#24786D",
  },
});

export default ExistingOrCreateAccountButton;
