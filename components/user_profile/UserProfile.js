import React, { useState, useEffect } from "react";
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
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const UserProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [statusMessage, setStatusMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(user.photoURL || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mediaShared, setMediaShared] = useState(0);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const db = getDatabase();
      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setStatusMessage(userData.statusMessage || "");
        setPhoneNumber(userData.phoneNumber || "");
        setMediaShared(userData.mediaShared || 0);
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: profilePicture,
      });

      await updateEmail(user, email);

      // Update user profile in Realtime Database
      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        name: name,
        email: email,
        statusMessage: statusMessage,
        phoneNumber: phoneNumber,
        mediaShared: mediaShared,
      });

      Alert.alert("Profile Updated Successfully");
      navigation.navigate("ChatList");
    } catch (error) {
      Alert.alert(error.message);
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
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      </TouchableOpacity>

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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Status Message</Text>
        <TextInput
          style={styles.input}
          value={statusMessage}
          onChangeText={setStatusMessage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Media Shared</Text>
        <Text style={styles.input}>{mediaShared}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
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
  title: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    borderBottomWidth: 1,
    borderBottomColor: "#24786D",
    paddingBottom: 8,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
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
