import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MediaShared = ({ profilePicture }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Media Shared</Text>
      <Text style={styles.viewAllText}>View All</Text>
      <Image
        source={
          profilePicture
            ? { uri: profilePicture }
            : "https://via.placeholder.com/150"
        }
        alt="Media Shared"
        style={styles.mediaShared}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15,
    paddingLeft: 10,
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#797C7B",
  },
  mediaShared: {
    width: 92,
    height: 92,
    borderRadius: 16,
  },
  viewAllText: {
    position: "relative",
    bottom: 24,
    textAlign: "right",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#24786D",
  },
});

export default MediaShared;
