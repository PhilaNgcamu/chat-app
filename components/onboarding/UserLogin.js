import firebase from "firebase/compat/app";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from "expo-font";

const facebookLogo = require("../../assets/facebook.png");
const googleLogo = require("../../assets/google.png");
const appleLogo = require("../../assets/apple.png");

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Log in</Text>
          <View style={styles.stroke} />
        </View>
        <Text style={styles.title}>to Chatbox</Text>
      </View>

      <Text style={styles.subtitle}>
        Welcome back! Sign in using your social account or email to continue
      </Text>

      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <Image source={facebookLogo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={googleLogo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={appleLogo} style={styles.logo} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: "#41B2A4",
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    textAlign: "center",
  },
  loginContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 16,
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    zIndex: 1,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  stroke: {
    position: "absolute",
    zIndex: 0,
    width: 60,
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: "#41B2A4",
  },
});

export default UserLogin;
