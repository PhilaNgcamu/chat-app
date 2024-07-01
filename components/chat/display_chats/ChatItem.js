import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import NotificationStatus from "./NotificationStatus";
import { useFonts } from "expo-font";
import NotificationsListener from "./NotificationsListener";

const ChatItem = ({ item, onPress }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  NotificationsListener;
  console.log(JSON.stringify(item, null, 2), "itemsss");
  const key = Object.keys(item).find((key) => key.includes("_"));

  console.log(item[key], key, "Item key");

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <NotificationsListener chatId={key} />
      <View style={styles.itemInfo}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.name || item.groupName}</Text>
          {(item[key]?.lastIndividualMessage || item.lastGroupMessage) && (
            <Text style={styles.itemLastMessage}>
              {item[key]?.lastIndividualMessage || item.lastGroupMessage}
            </Text>
          )}
        </View>
        <View style={styles.extraInfo}>
          <Text style={styles.lastTimeMessageSent}>2 min ago</Text>
          <NotificationStatus chatId={key} userId={item.id} />
        </View>
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
  extraInfo: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  lastTimeMessageSent: {
    position: "relative",
    color: "#797C7B",
  },
});

export default ChatItem;
