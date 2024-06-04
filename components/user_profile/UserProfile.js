import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { verticalScale } from "../../util/scale";

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

  const { height } = useWindowDimensions();

  const infoContainerHeight = height * 0.7;

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
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: profilePicture }}
              style={styles.profilePicture}
            />
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
            />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    alignItems: "center",
    marginTop: 25,
    marginBottom: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 16,
  },
  infoContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: verticalScale(500),
  },
  dragger: {
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
    width: 40,
    height: 5,
    borderRadius: 5,
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
