import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { moderateScale, verticalScale } from "../../utils/scale";

const LoginSubtitle = () => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>
        Welcome back! Sign in using your{"\n"}social account or email to
        continue with us
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    lineHeight: verticalScale(26),
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
});

export default LoginSubtitle;
