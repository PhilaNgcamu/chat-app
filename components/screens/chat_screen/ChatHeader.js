import React, { useEffect } from "react";
import { getDatabase, off, onValue, ref } from "firebase/database";
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
import { updateNotification } from "../../../utils/notificationUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  displayNotifications,
  notifyTheRecipientId,
} from "../../../redux/chat_list/chatListActions";

const ChatHeader = ({
  contactAvatar,
  contactName,
  type,
  isOnline,
  navigation,
}) => {
  const userId = useSelector((state) => state.chatScreen.userId);
  const recipientId = useSelector((state) => state.chatScreen.recipientId);
  const notifyRecipientId = useSelector(
    (state) => state.chatList.notifyTheRecipientId
  );
  const chatId = useSelector((state) => state.chatScreen.chatId);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const db = getDatabase();
    const privateNotifications = ref(db, `chats/${chatId}/notifications`);
    const groupsNotificationsRef = ref(db, `groups/${chatId}/notifications`);

    const handlePrivateMessagesNotification = (snapshot) => {
      const data = snapshot.val();
      dispatch(displayNotifications(data?.notificationsCount || 0));
      dispatch(notifyTheRecipientId(data?.userId));
    };
    const handleGroupsNotifications = (snapshot) => {
      const data = snapshot.val();
      displayNotifications(data?.notificationsCount || 0);
    };

    onValue(privateNotifications, handlePrivateMessagesNotification);
    onValue(groupsNotificationsRef, handleGroupsNotifications);

    return () => {
      off(privateNotifications, handlePrivateMessagesNotification);
      off(groupsNotificationsRef, handleGroupsNotifications);
    };
  }, [chatId]);

  const isPrivate = type === "private";

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }
  console.log(chatId, userId, recipientId, type, "Chat header");
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={async () => {
          navigation.goBack();
          if (notifyRecipientId === userId) {
            return;
          }
          await updateNotification(userId, chatId, true, type);
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: contactAvatar }} style={styles.avatar} />
        <View style={styles.status} />
      </View>
      <View style={styles.headerContent}>
        <Text style={styles.chatName}>{contactName}</Text>
        {isPrivate && (
          <Text style={styles.statusText}>
            {isOnline ? "Active now" : "Offline"}
          </Text>
        )}
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
    fontWeight: "500",
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
