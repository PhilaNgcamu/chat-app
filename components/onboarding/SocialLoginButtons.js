import React from "react";
import { View, Image, StyleSheet } from "react-native";
import fbLogo from "../../assets/facebook.png";
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple.png";
import { horizontalScale, verticalScale } from "../../util/scale";

const SocialLoginButtons = () => {
  return (
    <View style={styles.socialLogos}>
      <View style={styles.socialLogoWrapper}>
        <Image source={fbLogo} style={styles.socialLogo} />
      </View>
      <View style={styles.socialLogoWrapper}>
        <Image source={googleLogo} style={styles.socialLogo} />
      </View>
      <View style={styles.socialLogoWrapper}>
        <Image source={appleLogo} style={styles.socialLogo} />
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
    width: horizontalScale(70),
    height: horizontalScale(70),
    borderRadius: horizontalScale(35),
    borderWidth: 1,
    borderColor: "#FFF",
    backgroundColor: "#000",
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

export default SocialLoginButtons;
