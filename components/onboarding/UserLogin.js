import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../backend/firebaseConfig";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../util/scale";
import fbLogo from "../../assets/facebook.png";
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-black.png";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setLoading, setPassword } from "../../redux/actions";

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
      Alert.alert("Login Successful");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Oops!",
        "Please enter the correct email address or password"
      );
    } finally {
      dispatch(setLoading(false));
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
      <StatusBar backgroundColor="#000" style="light" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Log in </Text>
            <View style={styles.stroke} />
          </View>
          <Text style={styles.title}>to Chatbox</Text>
        </View>

        <Text style={styles.subtitle}>
          Welcome back! Sign in using your social account or email to continue
        </Text>

        <View style={styles.socialLogos}>
          <TouchableOpacity style={styles.socialLogoWrapper}>
            <Image source={fbLogo} style={styles.socialLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLogoWrapper}>
            <Image source={googleLogo} style={styles.socialLogo} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLogoWrapper}>
            <Image source={appleLogo} style={styles.socialLogo} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => dispatch(setEmail(text))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => dispatch(setPassword(text))}
            secureTextEntry
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.chooseOptions}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Log in"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("UserSignup")}
          >
            <Text style={styles.registerText}>Create an account</Text>
          </TouchableOpacity>
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
  subtitle: {
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    fontSize: moderateScale(16),
    textAlign: "center",
    marginBottom: verticalScale(16),
  },
  loginContainer: {
    position: "relative",
    marginBottom: verticalScale(16),
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(24),
    zIndex: 1,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(24),
    marginBottom: verticalScale(16),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#24786D",
    marginBottom: verticalScale(4),
  },
  input: {
    borderColor: "#CDD1D0",
    borderBottomWidth: 1,
    padding: verticalScale(8),
    borderRadius: moderateScale(4),
  },
  stroke: {
    position: "absolute",
    zIndex: 0,
    width: horizontalScale(70),
    top: verticalScale(21),
    right: horizontalScale(2),
    height: verticalScale(10),
    backgroundColor: "#58C3B6",
  },
  socialLogos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: verticalScale(20),
  },
  socialLogoWrapper: {
    width: horizontalScale(70),
    height: horizontalScale(70),
    borderRadius: horizontalScale(35),
    borderWidth: 1,
    borderColor: "#000E08",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: horizontalScale(10),
  },
  socialLogo: {
    width: horizontalScale(36),
    height: horizontalScale(36),
    borderRadius: horizontalScale(18),
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: verticalScale(20),
  },
  line: {
    flex: 1,
    height: verticalScale(1),
    backgroundColor: "#CDD1D0",
  },
  orText: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Bold",
    color: "#797C7B",
    marginHorizontal: horizontalScale(15),
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
  link: {
    marginTop: verticalScale(50),
  },
  linkText: {
    color: "#FFF",
    fontSize: moderateScale(16),
    textAlign: "center",
  },
  registerText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#24786D",
    fontFamily: "Poppins-Regular",
  },
});

export default UserLogin;
