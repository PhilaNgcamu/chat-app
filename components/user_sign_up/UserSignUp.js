import React from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmedPassword,
  setEmail,
  setName,
  setPassword,
} from "../../redux/actions";

import InputField from "./InputField";
import ExistingOrCreateAccountButton from "./ExistingOrCreateAccountButton";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/scale";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import BackButton from "../user_login/BackButton";
import SignUpOrLoginButton from "../onboarding/SignUpLoginButton";
import SignUpOrLoginSubtitle from "../user_login/SignupOrLoginSubtitle";
import SignupOrLoginTitle from "../user_login/SignUpOrLoginTitle";

const UserSignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const confirmedPassword = useSelector((state) => state.confirmedPassword);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleSignUp = async () => {
    if (password !== confirmedPassword) {
      Alert.alert("Oops!", "Password do not match. Please try again.");
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
      }).then((result) => {
        console.log(result, "This is response");
      });
      navigation.navigate("UserProfile", {
        userId: user.uid,
      });
    } catch (error) {
      Alert.alert("Oops!", "Something wrong happened.");
    } finally {
      dispatch(setName(""));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setConfirmedPassword(""));
    }
  };

  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator style={styles.loading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <BackButton onPress={() => navigation.goBack()} />
        <SignupOrLoginTitle paragraphOne="Sign up" paragraphTwo="with Email" />
        <SignUpOrLoginSubtitle
          paragraphOne="Get chatting with friends and family"
          paragraphTwo="today by signing up for our chat app!"
        />
        <InputField
          label="Your Name"
          value={name}
          onChangeText={(text) => dispatch(setName(text))}
          keyboardType="default"
        />
        <InputField
          label="Your Email"
          value={email}
          onChangeText={(text) => dispatch(setEmail(text))}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={(text) => dispatch(setPassword(text))}
          secureTextEntry={true}
        />
        <InputField
          label="Confirm Password"
          value={confirmedPassword}
          onChangeText={(text) => dispatch(setConfirmedPassword(text))}
          secureTextEntry={true}
        />
        <View style={styles.chooseOptions}>
          <SignUpOrLoginButton
            onPress={handleSignUp}
            text="Create an account"
            backgroundColor={"#24786D"}
            color={"#fff"}
          />
          <ExistingOrCreateAccountButton
            onPress={() => navigation.navigate("UserLogin")}
            text="Existing account?"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    backgroundColor: "#24786D",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(16),
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#FFFFFF",
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
  chooseOptions: {
    position: "relative",
    top: verticalScale(56),
  },
  error: {
    color: "red",
    fontFamily: "Poppins-Regular",
    marginBottom: verticalScale(16),
    textAlign: "center",
  },
});

export default UserSignUp;
