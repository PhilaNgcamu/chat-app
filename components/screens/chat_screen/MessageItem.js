import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { format } from "date-fns";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { auth } from "../../../backend/firebaseConfig";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import { setImageToBeSent } from "../../../redux/chat_screen/chatScreenActions";

const MessageItem = ({ item, type }) => {
  const dispatch = useDispatch();

  const imageToBeSent = useSelector((state) => state.chatScreen.imageToBeSent);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    const db = getDatabase();
    const contactsRef = ref(db, "users");

    const fetchUserPhoto = () => {
      onValue(contactsRef, (snapshot) => {
        const usersData = snapshot.val();
        const user = usersData[item.userId];
        if (user?.photoURL) {
          dispatch(setImageToBeSent(user.photoURL));
        }
      });

      return () => {
        off(contactsRef);
      };
    };

    fetchUserPhoto();
  }, [item.userId]);

  if (!fontsLoaded) {
    return null;
  }

  const isGroup = type === "group";

  return (
    <View style={styles.inputContainer}>
      <View
        style={
          item.userId !== auth.currentUser.uid && styles.messageItemContainer
        }
      >
        {item.userId !== auth.currentUser.uid && imageToBeSent && (
          <Image source={{ uri: imageToBeSent }} style={styles.photoItem} />
        )}
        {isGroup ? (
          <View style={styles.groupMemberContainer}>
            <Text style={styles.groupMemberName}>
              {item.userId !== auth.currentUser.uid && item.senderName}
            </Text>
            <View
              style={[
                styles.messageItem,
                item.userId === auth.currentUser.uid
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <View style={styles.messageMeta}>
                <View>
                  {item.text && (
                    <Text
                      style={[
                        styles.messageText,
                        item.userId === auth.currentUser.uid
                          ? styles.myMessageText
                          : styles.otherMessageText,
                      ]}
                    >
                      {item.text.trim()}
                    </Text>
                  )}
                </View>
              </View>
              <Text
                style={[
                  styles.messageTimestamp,
                  item.userId === auth.currentUser.uid
                    ? styles.myMessageTimestamp
                    : styles.otherMemberMessageTimestamp,
                ]}
              >
                {format(new Date(item.createdAt), "HH:mm")} AM
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.messageItem,
              item.userId === auth.currentUser.uid
                ? styles.myMessage
                : styles.otherMessage,
            ]}
          >
            <View style={styles.messageMeta}>
              <View>
                {item.text && (
                  <Text
                    style={[
                      styles.messageText,
                      item.userId === auth.currentUser.uid
                        ? styles.myMessageText
                        : styles.otherMessageText,
                    ]}
                  >
                    {item.text.trim()}
                  </Text>
                )}
              </View>
            </View>
            <Text
              style={[
                styles.messageTimestamp,
                item.userId === auth.currentUser.uid
                  ? styles.myMessageTimestamp
                  : styles.otherMessageTimestamp,
              ]}
            >
              {format(new Date(item.createdAt), "HH:mm")} AM
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    marginBottom: 40,
    padding: 15,
  },
  messageItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  groupMemberContainer: {
    width: "100%",
  },
  photoItem: {
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "red",
  },
  messageItem: {
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 15,
    backgroundColor: "#F2F7FB",
    alignSelf: "flex-start",
    maxWidth: "55%",
  },
  myMessage: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#20A090",
    alignSelf: "flex-end",
  },
  otherMessage: {
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "#F2F7FB",
    alignSelf: "flex-start",
  },
  groupMemberName: {
    position: "relative",
    top: 0,
    fontSize: 14,
    color: "#000E08",
    fontFamily: "Poppins-Regular",
  },
  messageMeta: {
    position: "relative",
    top: 9,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    textAlign: "left",
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#000",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  messageTimestamp: {
    width: "100%",
    position: "relative",
    top: 28,
    fontSize: 12,
    color: "#797C7B",
    fontFamily: "Poppins-Bold",
  },
  myMessageTimestamp: {
    alignSelf: "flex-end",
    color: "#797C7B",
  },
  otherMessageTimestamp: {
    textAlign: "right",
    color: "#797C7B",
  },
  otherMemberMessageTimestamp: {
    alignSelf: "flex-end",
    position: "relative",
    left: 50,
    color: "#797C7B",
  },
});

export default MessageItem;
