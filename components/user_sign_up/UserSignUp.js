import React from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
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
import {
  confirmPassword,
  setUserEmail,
  setUserName,
  setUserPassword,
} from "../../redux/user_profile_sign_up_and_login/userProfileSignupAndLoginActions";

const UserSignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userVerification.userName);
  const userEmail = useSelector((state) => state.userVerification.userEmail);
  const userPassword = useSelector(
    (state) => state.userVerification.userPassword
  );
  const confirmUserPassword = useSelector(
    (state) => state.userVerification.confirmUserPassword
  );

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleUserName = (userName) => {
    dispatch(setUserName(userName));
  };

  const handleUserEmail = (userEmail) => {
    dispatch(setUserEmail(userEmail));
  };

  const handleUserPassword = (userPassword) => {
    dispatch(setUserPassword(userPassword));
  };

  const handleConfirmedUserPassword = (confirmUserPassword) => {
    dispatch(confirmPassword(confirmUserPassword));
  };

  const handleSignUp = async () => {
    if (userPassword !== confirmUserPassword) {
      Alert.alert("Oops!", "Password do not match. Please try again.");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userCredential.user;

      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        name: userName,
        email: userEmail,
      }).then((result) => {
        console.log(result, "This is response");
      });
      navigation.navigate("UserProfile", {
        userId: user.uid,
      });
    } catch (error) {
      Alert.alert("Oops!", "Something wrong happened.");
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
        <View style={styles.formContainer}>
          <InputField
            label="Your Name"
            value={userName}
            onChangeText={handleUserName}
            keyboardType="default"
          />
          <InputField
            label="Your email"
            value={userEmail}
            onChangeText={handleUserEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            label="Password"
            value={userPassword}
            onChangeText={handleUserPassword}
            secureTextEntry
          />
          <InputField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={handleConfirmedUserPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.chooseOptions}>
          <SignUpOrLoginButton
            onPress={handleSignUp}
            text="Create an account"
            backgroundColor="#24786D"
            color="#fff"
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
    position: "relative",
    top: verticalScale(4),
    padding: horizontalScale(16),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  formContainer: {
    position: "relative",
    top: verticalScale(24),
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
    top: verticalScale(57),
  },
  error: {
    color: "red",
    fontFamily: "Poppins-Regular",
    marginBottom: verticalScale(16),
    textAlign: "center",
  },
});

export default UserSignUp;
