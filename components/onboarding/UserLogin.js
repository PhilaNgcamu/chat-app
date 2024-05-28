import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { FIREBASE_AUTH } from "../../backend/FirebaseConfig";

WebBrowser.maybeCompleteAuthSession();

const facebookLogo = require("../../assets/facebook.png");
const googleLogo = require("../../assets/google.png");
const appleLogo = require("../../assets/apple.png");

const UserLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "746597502071-jrpusr4bles8endof8oa2ihitg9sda2a.apps.googleusercontent.com",
  });

  const [facebookRequest, facebookResponse, facebookPromptAsync] =
    Facebook.useAuthRequest({
      clientId: "3843000872603631",
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

  const handleGoogleLogin = async () => {
    const result = await promptAsync();
    if (result.type === "success") {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      await signInWithCredential(auth, credential);
      Alert.alert("Google Login Successful");
      navigation.navigate("Home");
    }
  };

  const handleFacebookLogin = async () => {
    const result = await facebookPromptAsync();
    if (result.type === "success") {
      const { access_token } = result.params;
      const credential = FacebookAuthProvider.credential(access_token);
      await signInWithCredential(auth, credential);
      Alert.alert("Facebook Login Successful");
      navigation.navigate("Home");
    }
  };

  const handleAppleLogin = () => {};

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
        <TouchableOpacity onPress={handleFacebookLogin}>
          <Image source={facebookLogo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity disabled={!request} onPress={handleGoogleLogin}>
          <Image source={googleLogo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAppleLogin}>
          <Image source={appleLogo} style={styles.logo} />
        </TouchableOpacity>
      </View>

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
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
