import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

const ChatHeader = ({ contactAvatar, contactName, isOnline, navigation }) => {
  console.log(contactAvatar);
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
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
          <Feather name="phone" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Feather name="video" size={24} color="#000" />
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  statusText: {
    fontSize: 14,
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 15,
  },
});

export default ChatHeader;
