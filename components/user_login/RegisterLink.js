import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { verticalScale, moderateScale } from "../../utils/scale";

const RegisterLink = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.link} onPress={onPress}>
      <Text style={styles.registerText}>Create an account</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    marginTop: verticalScale(30),
  },
  registerText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#24786D",
    fontFamily: "Poppins-Regular",
  },
});

export default RegisterLink;
