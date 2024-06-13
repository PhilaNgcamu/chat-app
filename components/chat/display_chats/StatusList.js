import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { auth } from "../../../backend/firebaseConfig";

const StatusList = () => {
  const statuses = useSelector((state) => state.statuses);

  const renderStatusItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.statusItem}>
        <Image
          source={{ uri: item.photoUrl || "https://via.placeholder.com/150" }}
          style={styles.statusImage}
        />
        <Text style={styles.statusName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.statusContainer}>
      <View style={styles.addStatusContainer}>
        <Image
          source={{
            uri: auth.currentUser.photoURL || "https://via.placeholder.com/150",
          }}
          style={styles.addStatusImage}
        />
        <View style={styles.addStatusIconWrapper}>
          <MaterialIcons name="add" size={16} color="#362F34" />
        </View>
        <Text style={styles.myStatusText}>My Status</Text>
      </View>
      <FlatList
        data={statuses}
        horizontal
        renderItem={renderStatusItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  addStatusContainer: {
    position: "relative",
    alignItems: "center",
    marginRight: 10,
  },
  addStatusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addStatusIconWrapper: {
    position: "absolute",
    bottom: 15,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  myStatusText: {
    marginTop: 4,
    fontSize: 12,
    color: "#fff",
  },
  statusItem: {
    alignItems: "center",
    marginRight: 10,
  },
  statusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#24786D",
  },
  statusName: {
    fontSize: 12,
    marginTop: 4,
    color: "#fff",
  },
});

export default StatusList;
