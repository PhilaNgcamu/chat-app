import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSubmit = () => {
    console.log("Profile updated:", {
      name,
      statusMessage,
      email,
      phoneNumber,
      profilePicture,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
        ) : (
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePicturePlaceholderText}>
              Add Profile Picture
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Display Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Status</Text>
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
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
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
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  profileContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 10,
    padding: 16,
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
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#CDD1D0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  profilePicturePlaceholderText: {
    fontFamily: "Poppins-Regular",
    color: "#FFF",
  },
  button: {
    backgroundColor: "#24786D",
    padding: 12,
    borderRadius: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default UserProfile;
