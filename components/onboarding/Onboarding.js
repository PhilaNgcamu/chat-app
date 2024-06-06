import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import cLogo from "../../assets/c-logo.png";
import fbLogo from "../../assets/facebook.png";
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple.png";

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
    top: 88,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 25,
    color: "#fff",
    marginTop: 4,
  },
  subtitle: {
    position: "absolute",
    width: 338,
    top: 180,
    left: 30,
    marginBottom: 20,
  },
  connectText: {
    fontFamily: "Poppins-Regular",
    fontSize: 52,
    lineHeight: 60,
    color: "#fff",
  },
  friendsText: {
    fontFamily: "Poppins-Regular",
    fontSize: 52,
    lineHeight: 60,
    color: "#fff",
  },
  easilyText: {
    fontFamily: "Poppins-Bold",
    fontSize: 52,
    lineHeight: 60,
    color: "#fff",
  },
  quicklyText: {
    fontFamily: "Poppins-Bold",
    fontSize: 52,
    lineHeight: 60,
    color: "#fff",
  },
  content: {
    position: "absolute",
    top: 480,
    width: "100%",
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
  },
  socialLogos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  socialLogoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  socialLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CDD1D0",
  },
  orText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#000E08",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  loginText: {
    fontFamily: "Poppins-SemiBold",
  },
});

export default Onboarding;
