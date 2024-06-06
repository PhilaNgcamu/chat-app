import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import cLogo from "../../assets/c-logo.png";
import fbLogo from "../../assets/facebook.png";
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple.png";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../util/scale";

const Onboarding = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#24786D", "#0f4c4c", "#000"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image source={cLogo} style={styles.logo} />
        <Text style={styles.title}>Chatbox</Text>
      </View>
      <View style={styles.subtitle}>
        <Text style={styles.connectText}>Connect</Text>
        <Text style={styles.friendsText}>friends</Text>
        <Text style={styles.easilyText}>easily &</Text>
        <Text style={styles.quicklyText}>quickly</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>
          Our chat app is the perfect way to stay
        </Text>
        <Text style={styles.description}>
          connected with friends and family.
        </Text>
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
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <View>
            <Text style={styles.linkText}>
              Existing account? <Text style={styles.loginText}>Log in</Text>
            </Text>
          </View>
        </TouchableOpacity>
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
    color: "#fff",
    marginLeft: horizontalScale(10),
  },
  subtitle: {
    position: "absolute",
    top: verticalScale(180),
    left: horizontalScale(30),
    width: horizontalScale(338),
    marginBottom: verticalScale(20),
  },
  connectText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#fff",
  },
  friendsText: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#fff",
  },
  easilyText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#fff",
  },
  quicklyText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(52),
    lineHeight: moderateScale(60),
    color: "#fff",
  },
  content: {
    position: "absolute",
    top: verticalScale(460),
    width: "100%",
    paddingHorizontal: horizontalScale(20),
  },
  description: {
    fontSize: moderateScale(16),
    color: "#fff",
  },
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
    borderColor: "#fff",
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
  separator: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: verticalScale(20),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CDD1D0",
  },
  orText: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Bold",
    color: "#fff",
    marginHorizontal: horizontalScale(15),
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: 25,
    marginVertical: verticalScale(20),
    alignItems: "center",
  },
  buttonText: {
    color: "#000E08",
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  link: {
    marginTop: verticalScale(10),
  },
  linkText: {
    color: "#fff",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  loginText: {
    fontFamily: "Poppins-SemiBold",
  },
});

export default Onboarding;
