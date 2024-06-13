import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture, setSearchQuery } from "../../../redux/actions";
import { auth } from "../../../backend/firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);
  const profilePicture = useSelector((state) => state.profilePicture);

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
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="#fff" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
        />
      </View>
      <Image source={{ uri: profilePicture }} style={styles.userProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 16,
    backgroundColor: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 16,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
  userProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default SearchBar;
