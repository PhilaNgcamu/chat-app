import { getDatabase, ref, get, update } from "firebase/database";

export const updateNotification = async (userId, chatId, messagesRead) => {
  const db = getDatabase();
  const notifyUserRef = ref(db, `chats/${chatId}/${userId}/notifications`);
  console.log("updateNotification: ", notifyUserRef);

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
    console.log("Notifications count updated successfully");
  } catch (error) {
    console.error("Error updating notification count:", error);
  }
};
