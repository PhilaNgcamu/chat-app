import { getDatabase, ref, update } from "firebase/database";

export const updateNotification = async (
  userId,
  chatId,
  notificationsCount
) => {
  console.log("updateNotificationCount: ", userId, chatId, notificationsCount);

  const db = getDatabase();
  const notifyUser = {
    [`users/${userId}/${chatId}/notifications`]: {
      notificationsCount: notificationsCount || 1,
      unreadMessages: notificationsCount ? true : false,
    },
  };

  try {
    await update(ref(db), notifyUser);
    console.log("Notifications count updated successfully");
  } catch (error) {
    console.error("Error updating notification count:", error);
  }
};
