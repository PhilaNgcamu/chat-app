import { getDatabase, off, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increaseNotifications } from "../../../redux/actions";

const NotificationStatus = ({ userId, chatId }) => {
  const dispatch = useDispatch();
  const notificationsCount = useSelector((state) => state.notificationsCount);

  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/${chatId}/notificationsCount`);
    const handleNotificationCount = (snapshot) => {
      console.log(userRef, "userRef");
      console.log(snapshot, "snapshot");
      const data = snapshot.val();

      dispatch(increaseNotifications(6));
    };

    onValue(userRef, handleNotificationCount);

    return () => {
      off(userRef, "value", handleNotificationCount);
    };
  }, [userId, chatId]);

  return (
    <Text style={notificationsCount && styles.numberOfMessages}>
      {notificationsCount > 0 && notificationsCount}
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
