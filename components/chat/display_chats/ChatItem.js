import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import { getDatabase, off, onValue, ref } from "firebase/database";
import NotificationStatus from "./NotificationStatus";
import { updateNotification } from "../../../utils/notificationUtils";
import { auth } from "../../../backend/firebaseConfig";

const ChatItem = ({ item, onPress }) => {
  const [notifications, setNotifications] = useState(0);

  const [lastIndividualMessage, setLastIndividualMessage] = useState("");

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const key = Object.keys(item).find((key) => key.includes("_"));
  const currentUserId = auth.currentUser.uid;
  console.log("Item key", currentUserId, item?.users?.[currentUserId]);

  useEffect(() => {
    const db = getDatabase();
    const privateNotifications = ref(
      db,
      `chats/${key}/${item.id}/notifications`
    );
    const lastMessageRef = ref(db, `chats/${key}/lastIndividualMessage`);
    const groupsNotificationsRef = ref(
      db,
      `groups/${item.groupId}/notifications`
    );

    const handlePrivateMessagesNotification = (snapshot) => {
      const data = snapshot.val();
      setNotifications(data?.notificationsCount || 0);
    };
    const handleGroupsNotifications = (snapshot) => {
      const data = snapshot.val();
      setNotifications(data?.notificationsCount || 0);
    };
    const handleLastMessage = (snapshot) => {
      const message = snapshot.val();
      setLastIndividualMessage(message);
    };

    onValue(privateNotifications, handlePrivateMessagesNotification);
    onValue(groupsNotificationsRef, handleGroupsNotifications);
    onValue(lastMessageRef, handleLastMessage);

    return () => {
      off(privateNotifications, handlePrivateMessagesNotification);
      off(groupsNotificationsRef, handleGroupsNotifications);
      off(lastMessageRef, handleLastMessage);
    };
  }, [key]);

  console.log("Notifications Groups", notifications);

  const handlePress = () => {
    updateNotification(
      currentUserId,
      item.groupId,
      true,
      item.chatType || item.type
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onPress();
        handlePress();
      }}
    >
      <View style={styles.itemInfo}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.name || item.groupName}</Text>
          {(lastIndividualMessage || item.lastGroupMessage) && (
            <Text
              style={[
                styles.itemLastMessage,
                notifications === 0 && { fontFamily: "Poppins-Regular" },
              ]}
            >
              {lastIndividualMessage || item.lastGroupMessage}
            </Text>
          )}
        </View>
        <View style={styles.extraInfo}>
          <Text style={styles.lastTimeMessageSent}>2 min ago</Text>
          {notifications > 0 && (
            <NotificationStatus notificationsCount={notifications} />
          )}
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
