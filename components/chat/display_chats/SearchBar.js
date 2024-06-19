import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Image, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture, setSearchQuery } from "../../../redux/actions";
import { auth } from "../../../backend/firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useFonts } from "expo-font";

const SearchBar = () => {
  const dispatch = useDispatch();
  const profilePicture = useSelector((state) => state.profilePicture);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      const db = getDatabase();
      const userRef = ref(db, "users/" + auth.currentUser.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        dispatch(
          setProfilePicture(
            userData.photoUrl || "https://via.placeholder.com/150"
          )
        );
      }
    };

    if (auth.currentUser) {
      fetchUserProfilePicture();
    }
  }, [auth.currentUser]);

  return (
    <View style={styles.header}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchIcon}>
          <AntDesign name="search1" size={24} color="#fff" />
        </View>
      </View>
      <Text style={styles.homeText}>Home</Text>
      <Image source={{ uri: profilePicture }} style={styles.userProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 30,
  },
  searchWrapper: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
  },
  searchIcon: {
    borderColor: "#fff",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
  homeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Poppins-Regular",
  },
  userProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default SearchBar;
