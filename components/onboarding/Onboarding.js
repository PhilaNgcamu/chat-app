import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import cLogo from "../../assets/c-logo.png";

const Onboarding = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Existing account? Log in</Text>
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
    width: 321,
    left: 10,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    color: "#24786D",
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
    textDecorationLine: "underline",
  },
});

export default Onboarding;
