import { Alert, Platform } from "react-native";
import { getDatabase, ref, get, update } from "firebase/database";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export const updateNotification = async (
  userId,
  chatId,
  messagesRead,
  chatType
) => {
  const db = getDatabase();
  let notifyUserRef;

  if (chatType === "group") {
    console.log("Error Group", chatId, userId);
    notifyUserRef = ref(db, `groups/${chatId}/notifications`);
  } else {
    console.log("Error Private", chatId);

    notifyUserRef = ref(db, `chats/${chatId}/${userId}/notifications`);
  }
  try {
    const snapshot = await get(notifyUserRef);
    let notificationsCount = 0;

    if (snapshot.exists()) {
      const data = snapshot.val();
      notificationsCount = data?.notificationsCount || 0;
    }
    const notifyUser = {
      userId: userId,
      notificationsCount: messagesRead ? 0 : notificationsCount + 1,
      unreadMessages: messagesRead ? false : true,
    };

    await update(notifyUserRef, notifyUser);
  } catch (error) {
    console.error("Error updating notification count:", error);
  }
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function sendPushNotification(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    return pushTokenString;
  }
}
