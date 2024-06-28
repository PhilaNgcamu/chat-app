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
  console.log(JSON.stringify(item, null, 2), "itemzzz");
  console.log(
    JSON.stringify(
      Object.keys(item).find((key) => key.includes("_")),
      null,
      2
    ),
    "itemsss"
  );
  const key = JSON.stringify(
    Object.keys(item).find((key) => key.includes("_"))
  );
  console.log(
    item["TEFtiN5d3TZbete3HBKWYc3d3ib2_olLnM4P01AhOj5gDG8ddhAg91E63"]
      ?.lastIndividualMessage,
    key,
    "keyyyy"
  );
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemInfo}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.name || item.groupName}</Text>
          {(item["TEFtiN5d3TZbete3HBKWYc3d3ib2_olLnM4P01AhOj5gDG8ddhAg91E63"]
            ?.lastIndividualMessage ||
            item.lastGroupMessage) && (
            <Text style={styles.itemLastMessage}>
              {item["TEFtiN5d3TZbete3HBKWYc3d3ib2_olLnM4P01AhOj5gDG8ddhAg91E63"]
                ?.lastIndividualMessage || item.lastGroupMessage}
            </Text>
          )}
        </View>
        <View style={styles.extraInfo}>
          <Text style={styles.lastTimeMessageSent}>2 min ago</Text>
          <NotificationStatus />
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
