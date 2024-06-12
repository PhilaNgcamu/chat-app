import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../util/scale";
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
    position: "absolute",
    top: verticalScale(88),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  logo: {
    width: horizontalScale(50),
    height: horizontalScale(50),
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(25),
    color: "#FFF",
    marginTop: verticalScale(4),
  },
});

export default Header;
