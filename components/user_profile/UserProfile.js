import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture } from "../../redux/actions";
import { useTabBarVisibility } from "../chat/custom_hook/useTabBarVisibilityContext";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import MediaShared from "./MediaShared";
import SaveButton from "./SaveButton";
import styles from "./UserProfileStyles";

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

  const { setTabBarVisible } = useTabBarVisibility();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [setTabBarVisible])
  );

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
      Alert.alert("Oops!", "A phone number must be a 10-digit number.");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: profilePicture,
      });

      await updateEmail(user, email);

      const db = getDatabase();
      await set(ref(db, "users/" + user.uid), {
        photoURL: profilePicture,
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
    const storage = getStorage();
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const fileName = imageUri.split("/").pop();
      const storeRef = storageRef(
        storage,
        `profile_pictures/${user.uid}/${fileName}`
      );

      try {
        await uploadBytes(storeRef, blob);
        const downloadUrl = await getDownloadURL(storeRef);
        dispatch(setProfilePicture(downloadUrl));
      } catch (e) {
        console.error("Upload failed: ", e);
      }
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
      style={styles.keyboardContainer}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProfileHeader
          navigation={navigation}
          profilePicture={profilePicture}
          name={name}
          pickImage={pickImage}
        />
      </ScrollView>
      <View style={styles.infoContainer}>
        <View style={styles.dragger} />
        <View style={styles.infoContent}>
          <ProfileInfo
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          <MediaShared profilePicture={profilePicture} />
          <SaveButton handleSave={handleSave} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserProfile;
