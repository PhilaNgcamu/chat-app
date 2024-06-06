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
import { MaterialIcons } from "@expo/vector-icons";
import { verticalScale } from "../../util/scale";
import { StatusBar } from "expo-status-bar";
import placeholderImage from "../../assets/insert-image.png";

const UserProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [statusMessage, setStatusMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(user.photoURL || "");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const db = getDatabase();
      const userRef = ref(db, "about/" + user.uid);
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
        photoURL: profilePicture,
      });

      await updateEmail(user, email);

      const db = getDatabase();
      await set(ref(db, "about/" + user.uid), {
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
      setProfilePicture(result.assets[0].uri);
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
      <View style={styles.container}>
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
              <TouchableOpacity>
                <MaterialIcons name="message" size={24} color="#24786D" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="videocam" size={24} color="#24786D" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="call" size={24} color="#24786D" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="more-vert" size={24} color="#24786D" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.infoContainer}>
          <View style={styles.dragger} />
          <View style={styles.infoContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#AAAAAA"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
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
              <Text style={styles.label}>Status Message</Text>
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
                value={phoneNumber}
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
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
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
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#FFFFFF",
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
    marginTop: 10,
  },
  infoContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: verticalScale(500),
    paddingTop: 20,
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
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Bold",
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
    color: "#000",
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
