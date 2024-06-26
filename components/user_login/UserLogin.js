import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../backend/firebaseConfig";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/scale";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setLoading, setPassword } from "../../redux/actions";

import BackButton from "./BackButton";
import Title from "./Title";
import Separator from "./Separator";
import InputField from "./InputField";
import LoginButton from "./LoginButton";
import RegisterLink from "./RegisterLink";
import LoginSubtitle from "./LoginSubtitle";
import SocialLoginButtons from "../onboarding/SocialLoginButtons";
import AppleBlackIcon from "../../utils/icons/AppleBlackIcon";

const UserLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const loading = useSelector((state) => state.loading);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleLogin = async () => {
    dispatch(setLoading(true));
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
      <StatusBar style="light" />
      <View style={styles.content}>
        <BackButton onPress={() => navigation.goBack()} />
        <Title />
        <LoginSubtitle />
        <SocialLoginButtons
          AppleIcon={AppleBlackIcon}
          borderColor="#000000"
          backgroundColor="#FFFFFF"
        />
        <Separator />
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
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.chooseOptions}>
          <LoginButton onPress={handleLogin} loading={loading} />
          <RegisterLink onPress={() => navigation.navigate("UserSignUp")} />
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
    fontFamily: "Poppins-SemiBold",
    color: "#075BC9",
  },
  chooseOptions: {
    position: "relative",
    top: verticalScale(60),
  },
});

export default UserLogin;
