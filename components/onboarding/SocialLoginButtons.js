import React from "react";
import { View, StyleSheet } from "react-native";

import { horizontalScale, verticalScale } from "../../utils/scale";
import AppleWhiteIcon from "../../utils/icons/AppleWhiteIcon";
import GoogleIcon from "../../utils/icons/GoogleIcon";
import FacebookIcon from "../../utils/icons/FacebookIcon";

const SocialLoginButtons = () => {
  return (
    <View style={styles.socialLogos}>
      <View style={styles.socialLogoWrapper}>
        <FacebookIcon />
      </View>
      <View style={styles.socialLogoWrapper}>
        <GoogleIcon />
      </View>
      <View style={styles.socialLogoWrapper}>
        <AppleWhiteIcon />
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
    width: horizontalScale(42),
    height: horizontalScale(42),
    borderRadius: horizontalScale(21),
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalScale(10),
  },
});

export default SocialLoginButtons;
