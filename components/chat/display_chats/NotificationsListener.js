import { getDatabase, ref, onChildAdded, off } from "firebase/database";
import { useEffect } from "react";
import { auth } from "../../../backend/firebaseConfig";
import { updateNotificationCount } from "../../../utils/notificationUtils";

const NotificationsListener = ({ chatId }) => {
  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${chatId}/messages`);

    const handleNewMessage = (snapshot) => {
      const message = snapshot.val();
      console.log("Message:", message);

      updateNotificationCount(auth.currentUser.uid, chatId);
    };

    const unsubscribe = onChildAdded(messagesRef, handleNewMessage);

    return () => {
      off(messagesRef, "child_added", handleNewMessage);
      unsubscribe();
    };
  }, [chatId]);

  return null;
};

export default NotificationsListener;
