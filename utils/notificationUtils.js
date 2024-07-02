import { getDatabase, ref, get, update } from "firebase/database";

export const updateNotification = async (userId, chatId) => {
  console.log("updateNotificationCount: ", userId, chatId);

  const db = getDatabase();
  const notifyUserRef = ref(db, `users/${userId}/${chatId}/notifications`);

  try {
    const snapshot = await get(notifyUserRef);
    let notificationsCount = 0;

    if (snapshot.exists()) {
      const data = snapshot.val();
      notificationsCount = data?.notificationsCount || 1;
    }

    const notifyUser = {
      notificationsCount: notificationsCount + 1,
      unreadMessages: true,
    };

    await update(notifyUserRef, notifyUser);
    console.log("Notifications count updated successfully");
  } catch (error) {
    console.error("Error updating notification count:", error);
  }
};
