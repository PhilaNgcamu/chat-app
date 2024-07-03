import { getDatabase, ref, get, update } from "firebase/database";
import { auth } from "../backend/firebaseConfig";

export const updateNotification = async (
  userId,
  receiverId,
  chatId,
  lastIndividualMessage,
  messagesRead
) => {
  console.log("updateNotification: ", chatId);

  const db = getDatabase();
  const notifyUserRef = ref(db, `chats/${userId}/${chatId}/notifications`);

  try {
    const snapshot = await get(notifyUserRef);
    let notificationsCount = 0;

    if (snapshot.exists()) {
      const data = snapshot.val();
      notificationsCount = data?.notificationsCount || 0;
    }
    const notifyUser = {
      userId: auth.currentUser.uid !== receiverId && userId,
      lastIndividualMessage: lastIndividualMessage,
      notificationsCount: messagesRead ? notificationsCount + 1 : 0,
      unreadMessages: messagesRead ? true : false,
    };

    await update(notifyUserRef, notifyUser);
    console.log("Notifications count updated successfully");
  } catch (error) {
    console.error("Error updating notification count:", error);
  }
};
