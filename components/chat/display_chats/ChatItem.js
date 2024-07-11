import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";
import { getDatabase, off, onValue, ref } from "firebase/database";
import NotificationStatus from "./NotificationStatus";
import { updateNotification } from "../../../utils/notificationUtils";
import { auth } from "../../../backend/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  displayLastMessage,
  displayNotifications,
  notifyTheRecipientId,
} from "../../../redux/chat_list/chatListActions";

const ChatItem = ({ item, onPress }) => {
  const chatId = useSelector((state) => state.chatScreen.chatId);
  const notifications = useSelector((state) => state.chatList.notifications);
  const notifyRecipient = useSelector(
    (state) => state.chatList.notifyTheRecipientId
  );
  const lastIndividualMessage = useSelector(
    (state) => state.chatList.lastMessage
  );

  console.log(JSON.stringify(item, null, 2), "itemzzs");

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const key = Object.keys(item).find((key) => key.includes("_"));
  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    const db = getDatabase();
    const privateNotifications = ref(db, `chats/${key}/notifications`);
    const lastIndividualMessageRef = ref(
      db,
      `chats/${key}/lastIndividualMessage`
    );
    const groupsNotificationsRef = ref(
      db,
      `groups/${item.groupId}/notifications`
    );

    const handlePrivateMessagesNotification = (snapshot) => {
      const data = snapshot.val();
      dispatch(displayNotifications(data?.notificationsCount || 0));
      dispatch(notifyTheRecipientId(data?.userId));
    };
    const handleGroupsNotifications = (snapshot) => {
      const data = snapshot.val();
      dispatch(displayNotifications(data?.notificationsCount || 0));
    };
    const handleLastMessage = (snapshot) => {
      const message = snapshot.val();
      dispatch(displayLastMessage(message));
    };

    onValue(privateNotifications, handlePrivateMessagesNotification);
    onValue(groupsNotificationsRef, handleGroupsNotifications);
    onValue(lastIndividualMessageRef, handleLastMessage);

    return () => {
      off(privateNotifications, handlePrivateMessagesNotification);
      off(groupsNotificationsRef, handleGroupsNotifications);
      off(lastIndividualMessageRef, handleLastMessage);
    };
  }, [key]);

  const handlePress = () => {
    if (auth.currentUser.uid !== notifyRecipient && chatId !== null) {
      updateNotification(
        currentUserId,
        item.chatType === "group" ? item.groupId : chatId,
        true,
        item.chatType || item.type
      );
    }
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
                notifications > 0 &&
                  currentUserId !== notifyRecipient && {
                    fontFamily: "Poppins-SemiBold",
                  },
              ]}
            >
              {lastIndividualMessage || item.lastGroupMessage}
            </Text>
          )}
        </View>
        <View style={styles.extraInfo}>
          <Text style={styles.lastTimeMessageSent}>2 min ago</Text>
          {(item.type === "group" ||
            (item.chatType === "private" &&
              currentUserId !== notifyRecipient)) &&
            notifications > 0 && (
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
    fontFamily: "Poppins-Regular",
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
