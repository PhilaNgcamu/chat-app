import { getDatabase, ref, update } from "firebase/database";

export const updateNotificationCount = async (userId, chatId) => {
  const db = getDatabase();
  const userNotificationsRef = ref(
    db,
    `users/${userId}/${chatId}/notificationsCount`
  );

  try {
    await update(userNotificationsRef, {
      count: 16,
    });
    console.log("Notification count updated successfully");
  } catch (error) {
    console.error("Error updating notification count:", error);
  }
};
