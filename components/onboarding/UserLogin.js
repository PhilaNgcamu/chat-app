//User registration and authentication
import firebase from "firebase/compat/app";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.loginContainer}>
          <View>
            <Text style={styles.loginText}>Log in </Text>
            <View style={styles.stroke} />
          </View>
        </Text>

        <Text style={styles.title}>to Chatbox</Text>
      </View>

      <Text style={styles.subtitle}>
        Welcome back! Sign in using your social account or email to continue us
      </Text>

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
    bottom: 8,
    left: -3,
    right: 0,
    height: 10,
    backgroundColor: "#41B2A4",
  },
});

export default UserLogin;
