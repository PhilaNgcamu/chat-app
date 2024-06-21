import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import CallIcon from "../../../utils/icons/CallIcon";
import VideoIcon from "../../../utils/icons/VideoIcon";

const ChatHeader = ({ contactAvatar, contactName, isOnline, navigation }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: contactAvatar }} style={styles.avatar} />
        <View style={styles.status} />
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.chatName}>{contactName}</Text>
        <Text style={styles.statusText}>
          {isOnline ? "Active now" : "Offline"}
        </Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.headerIcon}>
          <CallIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <VideoIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    marginTop: 30,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  status: {
    position: "relative",
    top: 12,
    right: 8,
    borderRadius: 20,
    width: 8,
    height: 8,
    backgroundColor: "#4CD964",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "Poppins-SemiBold",
    color: "#000E08",
  },
  statusText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: "#797C7B",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 25,
  },
});

export default ChatHeader;
