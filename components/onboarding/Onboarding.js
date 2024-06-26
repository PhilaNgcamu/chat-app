import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppleWhiteIcon from "../../utils/icons/AppleWhiteIcon";
import { horizontalScale, verticalScale } from "../../utils/scale";
import { StatusBar } from "expo-status-bar";

import Header from "./Header";
import Subtitle from "./Subtitle";
import SocialLoginButtons from "./SocialLoginButtons";
import Separator from "./Separator";
import SignUpButton from "./SignUpButton";
import LoginLink from "./LoginLink";
import Description from "./Description";

const Onboarding = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#24786D", "#0f4c4c", "#000000"]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Header />
      <Subtitle />
      <View style={styles.content}>
        <Description />
        <View style={styles.loginOrRegisterOptions}>
          <SocialLoginButtons
            AppleIcon={AppleWhiteIcon}
            borderColor="#FFFFFF"
            backgroundColor="#000000"
          />
          <Separator />
          <SignUpButton onPress={() => navigation.navigate("UserSignUp")} />
          <LoginLink onPress={() => navigation.navigate("UserLogin")} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24786D",
  },
  content: {
    position: "absolute",
    top: verticalScale(434),
    width: "100%",
    paddingHorizontal: horizontalScale(20),
  },
  loginOrRegisterOptions: {
    position: "relative",
    top: verticalScale(50),
  },
});

export default Onboarding;
