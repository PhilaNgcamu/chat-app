import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/scale";
import cLogo from "../../assets/c-logo.png";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={cLogo} style={styles.logo} />
      <Text style={styles.title}>Chatbox</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: verticalScale(80),
  },
  logo: {
    width: horizontalScale(16),
    height: horizontalScale(19.2),
    marginRight: horizontalScale(4),
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    fontSize: moderateScale(14),
    color: "#FFFFFF",
    marginTop: verticalScale(4),
  },
});

export default Header;
