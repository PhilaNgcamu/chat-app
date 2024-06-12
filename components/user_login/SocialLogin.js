import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import fbLogo from "../../assets/facebook.png";
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-black.png";
import { horizontalScale, verticalScale } from "../../util/scale";

const SocialLogin = () => {
  return (
    <View style={styles.socialLogos}>
      <TouchableOpacity style={styles.socialLogoWrapper}>
        <Image source={fbLogo} style={styles.socialLogo} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialLogoWrapper}>
        <Image source={googleLogo} style={styles.socialLogo} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialLogoWrapper}>
        <Image source={appleLogo} style={styles.socialLogo} />
      </TouchableOpacity>
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
    width: horizontalScale(70),
    height: horizontalScale(70),
    borderRadius: horizontalScale(35),
    borderWidth: 1,
    borderColor: "#000E08",
    backgroundColor: "#FFF",
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
