import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../redux/actions";
import { auth } from "../../../backend/firebaseConfig";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);

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
      <Image
        source={{
          uri: auth.currentUser.photoURL || "https://via.placeholder.com/150",
        }}
        style={styles.userProfile}
      />
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
