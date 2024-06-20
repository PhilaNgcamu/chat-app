import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import NotificationStatus from "./NotificationStatus";
import { useFonts } from "expo-font";

const ChatItem = ({ item, onPress }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemInfo}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.name || "Chat"}</Text>
          <Text style={styles.itemLastMessage}>
            Click here to see messages...
          </Text>
        </View>
        <Text styles={styles.lastTimeMessageSent}>2 min ago</Text>
        <NotificationStatus />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  itemLastMessage: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Poppins-SemiBold",
    marginTop: 4,
  },
  lastTimeMessageSent: {
    backgroundColor: "black",
    height: 60,
    width: 60,
    marginBottom: 25,
  },
});

export default ChatItem;
