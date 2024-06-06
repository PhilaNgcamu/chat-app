import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../util/scale";

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
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        name: name,
        email: email,
      });

      navigation.navigate("UserProfile", {
        userId: user.uid,
      });
    } catch (error) {
      console.error(error);
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="arrowleft"
          size={moderateScale(24)}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.content}>
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
            autoCapitalize="none"
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("UserLogin")}
          >
            <Text style={styles.loginButtonText}>
              Existing account? <Text style={styles.loginText}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: horizontalScale(16),
  },
  icon: {
    position: "absolute",
    top: verticalScale(61),
    left: horizontalScale(24),
    color: "#000E08",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(24),
  },
  emailContainer: {
    position: "relative",
  },
  emailText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(24),
    zIndex: 1,
  },
  stroke: {
    position: "absolute",
    zIndex: 0,
    width: horizontalScale(60),
    bottom: verticalScale(8),
    left: horizontalScale(-3),
    right: 0,
    height: verticalScale(10),
    backgroundColor: "#41B2A4",
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    fontSize: moderateScale(16),
    marginBottom: verticalScale(16),
  },
  inputContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#24786D",
    marginBottom: verticalScale(4),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#CDD1D0",
    paddingBottom: verticalScale(8),
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(16),
  },
  buttonContainer: {
    position: "position",
    top: verticalScale(70),
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#24786D",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(16),
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "transparent",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(16),
  },
  loginButtonText: {
    marginTop: verticalScale(20),
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#24786D",
  },
  loginText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#24786D",
  },
  error: {
    color: "red",
    fontFamily: "Poppins-Regular",
    marginBottom: verticalScale(16),
    textAlign: "center",
  },
});

export default UserSignup;
