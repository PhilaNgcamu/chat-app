import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/scale";
import { StatusBar } from "expo-status-bar";

import Header from "./Header";
import Subtitle from "./Subtitle";
import SocialLoginButtons from "./SocialLoginButtons";
import Separator from "./Separator";
import SignUpButton from "./SignUpButton";
import LoginLink from "./LoginLink";

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
      colors={["#24786D", "#0f4c4c", "#000"]}
      style={styles.container}
    >
      <StatusBar backgroundColor="#000" style="light" />
      <Header />
      <Subtitle />
      <View style={styles.content}>
        <Text style={styles.description}>
          Our chat app is the perfect way to stay
        </Text>
        <Text style={styles.description}>
          connected with friends and family.
        </Text>
        <SocialLoginButtons />
        <Separator />
        <SignUpButton onPress={() => navigation.navigate("UserSignUp")} />
        <LoginLink onPress={() => navigation.navigate("UserLogin")} />
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
    top: verticalScale(460),
    width: "100%",
    paddingHorizontal: horizontalScale(20),
  },
  description: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    marginLeft: horizontalScale(10),
    color: "#FFF",
  },
});

export default Onboarding;
