import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./UserProfileStyles";

const MediaShared = ({ profilePicture }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Media Shared</Text>
      <Text style={styles.viewAllText}>View All</Text>
      <Image
        source={profilePicture ? { uri: profilePicture } : placeholderImage}
        style={styles.mediaShared}
      />
    </View>
  );
};

export default MediaShared;
