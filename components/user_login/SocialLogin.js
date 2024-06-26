import React from "react";
import { View, StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "../../utils/scale";

import GoogleIcon from "../../utils/icons/GoogleIcon";
import AppleBlackIcon from "../../utils/icons/AppleBlackIcon";
import FacebookIcon from "../../utils/icons/FacebookIcon";

const SocialLogin = () => {
  return (
    <View style={styles.socialLogos}>
      <View style={styles.socialLogoWrapper}>
        <FacebookIcon />
      </View>
      <View style={styles.socialLogoWrapper}>
        <GoogleIcon />
      </View>
      <View style={styles.socialLogoWrapper}>
        <AppleBlackIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialLogos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: verticalScale(20),
  },
  socialLogoWrapper: {
    width: horizontalScale(46),
    height: horizontalScale(46),
    borderRadius: horizontalScale(23),
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalScale(10),
  },
  socialLogo: {
    width: horizontalScale(36),
    height: horizontalScale(36),
    borderRadius: horizontalScale(18),
  },
});

export default SocialLogin;
