import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmedPassword,
  setEmail,
  setError,
  setName,
  setPassword,
} from "../../redux/actions";

import BackButton from "./BackButton";
import InputField from "./InputField";
import SignUpButton from "./SignUpButton";
import ExistingAccountButton from "./ExistingAccountButton";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../util/scale";

const UserSignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const confirmedPassword = useSelector((state) => state.confirmedPassword);
  const error = useSelector((state) => state.error);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleSignup = async () => {
    console.log(password);
    console.log(confirmedPassword);

    if (password !== confirmedPassword) {
      dispatch(setError("Passwords do not match"));
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
        <ActivityIndicator style={styles.loading} />
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" style="light" />
      <BackButton onPress={() => navigation.goBack()} />
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
          secureTextEntry
        />

        <InputField
          label="Confirm Password"
          value={confirmedPassword}
          onChangeText={(text) => dispatch(setConfirmedPassword(text))}
          secureTextEntry
        />
        <View style={styles.chooseOptions}>
          <SignUpButton onPress={handleSignup} />

          <ExistingAccountButton
            onPress={() => navigation.navigate("UserLogin")}
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
    top: verticalScale(60),
  },
  error: {
    color: "red",
    fontFamily: "Poppins-Regular",
    marginBottom: verticalScale(16),
    textAlign: "center",
  },
});

export default UserSignUp;
