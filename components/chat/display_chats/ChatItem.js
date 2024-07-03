import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { shouldPressContact } from "../../../redux/actions";
import { getDatabase, off, onValue, ref } from "firebase/database";
import NotificationStatus from "./NotificationStatus";

const ChatItem = ({ item, onPress }) => {
  const dispatch = useDispatch();
  const notificationsCount = useSelector((state) => state.notificationsCount);
  const isContactPressed = useSelector((state) => state.isContactPressed);
  const userId = useSelector((state) => state.userId);
  const receiverId = useSelector((state) => state.receiverId);
  const chatId = useSelector((state) => state.chatId);
  const [notifications, setNotifications] = useState(0);
  const [lastIndividualMessage, setLastIndividualMessage] = useState("");

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const key = Object.keys(item).find((key) => key.includes("_"));

  useEffect(() => {
    const db = getDatabase();
    const notificationsRef = ref(db, `chats/${key}/notifications`);
    const handleNotifications = (snapshot) => {
      const data = snapshot.val();
      setNotifications(data?.notificationsCount || 0);
      setLastIndividualMessage(data?.lastIndividualMessage);
    };

    onValue(notificationsRef, handleNotifications);
    return () => {
      off(notificationsRef, handleNotifications);
    };
  }, [key]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onPress();
        dispatch(shouldPressContact(true));
      }}
    >
      <View style={styles.itemInfo}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.name || item.groupName}</Text>
          {(item[key]?.lastIndividualMessage || item.lastGroupMessage) && (
            <Text style={styles.itemLastMessage}>
              {lastIndividualMessage || item.lastGroupMessage}
            </Text>
          )}
        </View>
        <View style={styles.extraInfo}>
          <Text style={styles.lastTimeMessageSent}>2 min ago</Text>
          <NotificationStatus notificationsCount={notifications} />
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
