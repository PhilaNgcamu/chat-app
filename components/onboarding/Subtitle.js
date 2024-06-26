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
      <Text style={styles.connectAndFriendsText}>Connect</Text>
      <Text style={styles.connectAndFriendsText}>friends</Text>
      <Text style={styles.easilyAndEasilyText}>easily &</Text>
      <Text style={styles.easilyAndEasilyText}>quickly</Text>
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
  connectAndFriendsText: {
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#FFFFFF",
  },
  easilyAndEasilyText: {
    fontFamily: "Poppins-Bold",
    fontWeight: "500",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#FFFFFF",
  },
});

export default Subtitle;
