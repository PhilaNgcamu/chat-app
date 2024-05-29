import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../backend/firebaseConfig";

const UserSignup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      setError(error.message);
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
        <Text style={styles.title}>Sign up with </Text>
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Email</Text>
          <View style={styles.stroke} />
        </View>
      </View>

      <Text style={styles.subtitle}>
        Get chatting with friends and family today by signing up for our chat
        app!
      </Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          keyboardType="default"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create an account</Text>
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
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  emailContainer: {
    position: "relative",
  },
  emailText: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    zIndex: 1,
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
  subtitle: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    fontSize: 16,
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
    borderBottomWidth: 1,
    borderBottomColor: "#24786D",
    paddingBottom: 8,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
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
  error: {
    color: "red",
    fontFamily: "Poppins-Regular",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default UserSignup;
