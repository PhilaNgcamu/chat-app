import React from "react";
import { View, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../utils/scale";
import GoogleIcon from "../../utils/icons/GoogleIcon";
import FacebookIcon from "../../utils/icons/FacebookIcon";

const SocialLoginButtons = ({ AppleIcon, borderColor, backgroundColor }) => {
  return (
    <View style={styles.socialLogos}>
      <View
        style={[
          styles.socialLogoWrapper,
          { borderColor: borderColor, backgroundColor: backgroundColor },
        ]}
      >
        <FacebookIcon />
      </View>
      <View
        style={[
          styles.socialLogoWrapper,
          { borderColor: borderColor, backgroundColor: backgroundColor },
        ]}
      >
        <GoogleIcon />
      </View>
      <View
        style={[
          styles.socialLogoWrapper,
          { borderColor: borderColor, backgroundColor: backgroundColor },
        ]}
      >
        <AppleIcon />
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
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalScale(10),
  },
});

export default SocialLoginButtons;
