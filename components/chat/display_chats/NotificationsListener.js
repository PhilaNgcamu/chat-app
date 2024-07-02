import { getDatabase, ref, onChildAdded, off } from "firebase/database";
import { useEffect } from "react";
import { auth } from "../../../backend/firebaseConfig";
import { updateNotification } from "../../../utils/notificationUtils";
import { useSelector } from "react-redux";

const NotificationsListener = () => {
  const chatId = useSelector((state) => state.chatId);

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `chats/${chatId}/messages`);

    const handleNewMessage = (snapshot) => {
      const message = snapshot.val();
      console.log("Message:", message);

      updateNotification(auth.currentUser.uid, chatId);
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
