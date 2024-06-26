import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { moderateScale, verticalScale } from "../../utils/scale";

const SignUpOrLoginSubtitle = ({ paragraphOne, paragraphTwo }) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>
        {paragraphOne}
        {"\n"}
        {paragraphTwo}
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
    marginBottom: verticalScale(20),
    lineHeight: verticalScale(26),
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
});

export default SignUpOrLoginSubtitle;
