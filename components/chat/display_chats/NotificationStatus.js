import { getDatabase, off, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

const NotificationStatus = ({ userId, chatId }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/${chatId}/notificationsCount`);
    const handleNotificationCount = (snapshot) => {
      console.log(userRef, "userRef");
      console.log(snapshot, "snapshot");
      const data = snapshot.val();
      if (data.count !== null) {
        setNotificationCount(data.count);
      } else {
        setNotificationCount(0);
      }
    };

    onValue(userRef, handleNotificationCount);

    return () => {
      off(userRef, "value", handleNotificationCount);
    };
  }, [userId, chatId]);

  return (
    <Text style={styles.numberOfMessages}>
      {notificationCount > 0 ? notificationCount : null}
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
