import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../../utils/scale";

const LoginButton = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.buttonText}>
        {loading ? "Logging in..." : "Log in"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#24786D",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(16),
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default LoginButton;
