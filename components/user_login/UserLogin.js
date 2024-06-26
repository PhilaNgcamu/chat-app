import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../backend/firebaseConfig";

import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/scale";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setLoading, setPassword } from "../../redux/actions";

import BackButton from "./BackButton";
import InputField from "./InputField";
import RegisterLink from "./RegisterLink";
import SocialLoginButtons from "../onboarding/SocialLoginButtons";
import AppleBlackIcon from "../../utils/icons/AppleBlackIcon";
import Separator from "../onboarding/Separator";
import SignUpOrLoginButton from "../onboarding/SignUpLoginButton";
import SignUpOrLoginSubtitle from "./SignupOrLoginSubtitle";
import SignUpOrLoginTitle from "./SignUpOrLoginTitle";
import ExistingOrCreateAccountButton from "../user_sign_up/ExistingOrCreateAccountButton";

const UserLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Yay!", "Login Successful");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Oops!",
        "Please enter the correct email address or password"
      );
    } finally {
      dispatch(setLoading(false));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <BackButton onPress={() => navigation.goBack()} />
        <SignUpOrLoginTitle paragraphOne="Log in" paragraphTwo="to Chatbox" />
        <SignUpOrLoginSubtitle
          paragraphOne="Welcome back! Sign in using your"
          paragraphTwo="social account or email to continue with us"
        />
        <SocialLoginButtons
          AppleIcon={AppleBlackIcon}
          borderColor="#000000"
          backgroundColor="#FFFFFF"
        />
        <Separator color="#797C7B" />
        <InputField
          label="Your email"
          value={email}
          onChangeText={(text) => dispatch(setEmail(text))}
          keyboardType="email-address"
        />
        <InputField
          label="Your password"
          value={password}
          onChangeText={(text) => dispatch(setPassword(text))}
          secureTextEntry
        />
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        <View style={styles.chooseOptions}>
          <SignUpOrLoginButton
            onPress={handleLogin}
            text="Login"
            backgroundColor="#24786D"
            color="#FFFFFF"
          />
          <ExistingOrCreateAccountButton
            onPress={() => navigation.navigate("UserSignUp")}
            text="Create an account"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24786D",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: horizontalScale(16),
  },
  subtitle: {
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    fontSize: moderateScale(16),
    textAlign: "center",
    marginBottom: verticalScale(16),
  },
  forgotPasswordText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#075BC9",
    letterSpacing: 0.1,
  },
  chooseOptions: {
    position: "relative",
    top: verticalScale(60),
  },
});

export default UserLogin;
