import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { verticalScale, moderateScale } from "../../utils/scale";

const LoginLink = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.link} onPress={onPress}>
      <View>
        <Text style={styles.linkText}>
          Existing account? <Text style={styles.loginText}>Log in</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    marginTop: verticalScale(10),
  },
  linkText: {
    color: "#FFF",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  loginText: {
    fontFamily: "Poppins-SemiBold",
  },
});

export default LoginLink;
