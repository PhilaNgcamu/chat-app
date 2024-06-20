import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { verticalScale } from "../../utils/scale";
import { StatusBar } from "expo-status-bar";
import placeholderImage from "../../assets/insert-image.png";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture } from "../../redux/actions";
import MessageIcon from "../../utils/icons/MessageIcon";
import MoreIcon from "../../utils/icons/MoreIcon";
import PhoneIcon from "../../utils/icons/PhoneIcon";

const UserProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [statusMessage, setStatusMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const profilePicture = useSelector((state) => state.profilePicture);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  useEffect(() => {
    const fetchUserProfile = async () => {
      const db = getDatabase();
      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setStatusMessage(userData.statusMessage || "");
        setPhoneNumber(userData.phoneNumber || "");
      }
    };
    fetchUserProfile();

    if (!profilePicture) {
      Alert.alert("Profile Picture Missing", "Please add a profile picture.", [
        {
          text: "Choose Picture",
          onPress: pickImage,
        },
      ]);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name || !email || !statusMessage || !phoneNumber || !profilePicture) {
      Alert.alert(
        "Oops!",
        "Please fill in all fields and add a profile picture before saving."
      );
      return;
    } else if (phoneNumber.length !== 10) {
      Alert.alert("Oops!", "A phone number must be 10-digit number.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: name,
        photoUrl: profilePicture,
      });

      await updateEmail(user, email);

      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        photoUrl: profilePicture,
        name: name,
        email: email,
        statusMessage: statusMessage,
        phoneNumber: phoneNumber,
      });

      Alert.alert("Profile Updated Successfully");

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Oops!", "Changing an email address is not allowed.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setProfilePicture(result.assets[0].uri));
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                profilePicture ? { uri: profilePicture } : placeholderImage
              }
              alt="Profile Picture"
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.hashtag}>
            {name && `@${name.toLowerCase().replace(/\s/g, "")}`}
          </Text>
          <View style={styles.iconContainer}>
            <View style={styles.iconGroup}>
              <MessageIcon color="#FFFFFF" />
            </View>
            <View style={styles.iconGroup}>
              <TouchableOpacity>
                <Feather name="video" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.iconGroup}>
              <PhoneIcon />
            </View>
            <View style={styles.iconGroup}>
              <MoreIcon />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.infoContainer}>
        <View style={styles.dragger} />
        <View style={styles.infoContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#AAAAAA"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor="#AAAAAA"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Status</Text>
            <TextInput
              style={styles.input}
              value={statusMessage}
              onChangeText={setStatusMessage}
              placeholder="Enter a status message"
              placeholderTextColor="#AAAAAA"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber
                .replace(/\D+/g, "")
                .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              placeholderTextColor="#AAAAAA"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
    alignItems: "center",
    top: verticalScale(40),
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 0,
  },
  profileName: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  hashtag: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#797C7B",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 25,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 44,
    marginTop: 10,
  },
  iconGroup: {
    backgroundColor: "#051D13",
    padding: 10,
    borderRadius: 50,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "red",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  dragger: {
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
    width: 30,
    height: 3,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  infoContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    paddingTop: 15,
    paddingLeft: 10,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: "#000",
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#797C7B",
    marginBottom: 4,
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
});

export default UserProfile;
