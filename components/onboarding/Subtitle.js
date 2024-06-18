import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/scale";

const Subtitle = () => {
  return (
    <View style={styles.subtitle}>
      <Text style={styles.connectText}>Connect</Text>
      <Text style={styles.friendsText}>friends</Text>
      <Text style={styles.easilyText}>easily &</Text>
      <Text style={styles.quicklyText}>quickly</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    position: "absolute",
    top: verticalScale(180),
    left: horizontalScale(30),
    width: horizontalScale(338),
    marginBottom: verticalScale(20),
  },
  connectText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#FFF",
  },
  friendsText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#FFF",
  },
  easilyText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#FFF",
  },
  quicklyText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#FFF",
  },
});

export default Subtitle;
