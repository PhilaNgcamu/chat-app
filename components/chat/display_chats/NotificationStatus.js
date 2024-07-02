import { getDatabase, off, onValue, ref } from "firebase/database";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increaseNotifications } from "../../../redux/actions";

const NotificationStatus = ({ notifications }) => {
  const dispatch = useDispatch();
  const notificationsCount = useSelector((state) => state.notificationsCount);
  const userId = useSelector((state) => state.userId);
  const receiverId = useSelector((state) => state.receiverId);
  const chatId = useSelector((state) => state.chatId);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${receiverId}/${chatId}/notifications`);

    const handleNotificationCount = (snapshot) => {
      const data = snapshot.val();
      console.log(data, "Datatatata");
      if (data && data.notificationsCount !== undefined) {
        console.log(
          "Notifications count updated from:",
          notificationsCount,
          "to:",
          data.notificationsCount
        );
        dispatch(increaseNotifications(data.notificationsCount));
      } else {
        console.log("No notifications count data available");
      }
    };

    onValue(userRef, handleNotificationCount);

    return () => {
      off(userRef, handleNotificationCount);
    };
  }, [userId, chatId, receiverId, dispatch]);

  console.log("Current notifications count:", notificationsCount);

  return (
    <Text style={notifications > 0 && styles.numberOfMessages}>
      {notifications}
    </Text>
  );
};

const styles = StyleSheet.create({
  numberOfMessages: {
    textAlign: "center",
    marginTop: 10,
    width: 21.81,
    height: 21.81,
    borderRadius: 10.3,
    backgroundColor: "red",
    color: "#FFF",
  },
});

export default NotificationStatus;
