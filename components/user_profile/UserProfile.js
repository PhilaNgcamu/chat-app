import React, { useEffect, useCallback } from "react";
import {
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getDatabase, ref, update, get } from "firebase/database";
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
import { useTabBarVisibility } from "../chat/custom_hook/useTabBarVisibilityContext";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import MediaShared from "./MediaShared";
import SaveButton from "./SaveButton";
import styles from "./UserProfileStyles";
import {
  setPhoneNumber,
  setProfilePicture,
  setStatusMessage,
  setUserEmail,
  setUserName,
} from "../../redux/user_profile_sign_up_and_login/userProfileSignupAndLoginActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const userName = useSelector((state) => state.userVerification.userName);
  const userEmail = useSelector((state) => state.userVerification.userEmail);
  const statusMessage = useSelector(
    (state) => state.userVerification.statusMessage
  );
  const phoneNumber = useSelector(
    (state) => state.userVerification.phoneNumber
  );
  const profilePicture = useSelector(
    (state) => state.userVerification.profilePicture
  );
  const { setTabBarVisible } = useTabBarVisibility();

  const handleUserName = (userName) => {
    dispatch(setUserName(userName));
  };

  const handleUserEmail = (userEmail) => {
    dispatch(setUserEmail(userEmail));
  };

  const handleStatusMessage = (statusMessage) => {
    dispatch(setStatusMessage(statusMessage));
  };

  const handlePhoneNumber = (phoneNumber) => {
    dispatch(setPhoneNumber(phoneNumber));
  };

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
        dispatch(setStatusMessage(userData.statusMessage || ""));
        dispatch(setPhoneNumber(userData.phoneNumber || ""));
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
    if (!userName || !userEmail || !statusMessage || !phoneNumber) {
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
        displayName: userName,
        photoURL: profilePicture,
      });

      const db = getDatabase();
      await update(ref(db, "users/" + user.uid), {
        photoURL: profilePicture,
        name: userName,
        email: userEmail,
        statusMessage: statusMessage,
        phoneNumber: phoneNumber,
      });

      await updateEmail(user, userEmail);

      Alert.alert("Success!", "Profile updated successfully.");

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Oops!", "Something went wrong. Please try again.");
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
      } catch (error) {
        Alert.alert("Oops!", "Something went wrong. Please try again.");
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
          name={userName}
          pickImage={pickImage}
        />
      </ScrollView>
      <View style={styles.infoContainer}>
        <View style={styles.dragger} />
        <View style={styles.infoContent}>
          <ProfileInfo
            name={userName}
            setName={handleUserName}
            email={userEmail}
            setEmail={handleUserEmail}
            statusMessage={statusMessage}
            setStatusMessage={handleStatusMessage}
            phoneNumber={phoneNumber}
            setPhoneNumber={handlePhoneNumber}
          />
          <MediaShared profilePicture={profilePicture} />
          <SaveButton handleSave={handleSave} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserProfile;
