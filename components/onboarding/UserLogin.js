import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { signInWithEmailAndPassword } from "firebase/auth";

import * as WebBrowser from "expo-web-browser";
import { FIREBASE_AUTH } from "../../backend/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Successful");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
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

  logo: {
    width: 50,
    height: 50,
    borderColor: "#000E08",
    borderWidth: 1,
    borderRadius: 25,
    margin: 8,
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#24786D",
    padding: 12,
    borderRadius: 20,
    marginTop: 16,
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#24786D",
    marginBottom: 4,
  },
  input: {
    borderColor: "#CDD1D0",
    borderBottomWidth: 1,
    padding: 8,
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
