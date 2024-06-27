import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MessageIcon from "../../utils/icons/MessageIcon";
import MoreIcon from "../../utils/icons/MoreIcon";
import PhoneIcon from "../../utils/icons/PhoneIcon";
import VideoIcon from "../../utils/icons/VideoIcon";
import styles from "./UserProfileStyles";

const ProfileHeader = ({ navigation, profilePicture, name, pickImage }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            profilePicture
              ? { uri: profilePicture }
              : "https://via.placeholder.com/150"
          }
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.hashtag}>
        {name && `@${name.toLowerCase().replace(/\s/g, "")}`}
      </Text>
      <View style={styles.iconContainer}>
        <View style={styles.iconGroup}>
          <MessageIcon color="#FFFFFF" />
        </View>
        <View style={styles.iconGroup}>
          <VideoIcon color="#FFFFFF" />
        </View>
        <View style={styles.iconGroup}>
          <PhoneIcon />
        </View>
        <View style={styles.iconGroup}>
          <MoreIcon />
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
