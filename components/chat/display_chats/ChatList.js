import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, onValue, off, update } from "firebase/database";
import { auth } from "../../../backend/firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import StatusList from "./StatusList";
import ChatItem from "./ChatItem";
import {
  displayContacts,
  displayGroups,
  displayStatuses,
} from "../../../redux/chat_list/chatListActions";

const ChatList = ({ navigation }) => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.chatList.contacts);
  const groups = useSelector((state) => state.chatList.groups);

  useEffect(() => {
    const db = getDatabase();
    const individualChatsRef = ref(db, "chats");
    const contactsRef = ref(db, "users");
    const groupsRef = ref(db, "groups");
    const currentUserID = auth.currentUser.uid;

    const fetchAllChats = () => {
      const individualChatsList = [];
      const contactsList = [];
      const groupChatsList = [];

      const fetchContacts = () => {
        return new Promise((resolve) => {
          onValue(contactsRef, (snapshot) => {
            contactsList.length = 0;
            if (snapshot.exists()) {
              Object.entries(snapshot?.val()).forEach(([id, data]) => {
                if (id !== currentUserID) {
                  contactsList.push({
                    id,
                    chatType: "private",
                    ...data,
                  });
                }
              });
              dispatch(displayStatuses(contactsList));
              dispatch(displayContacts([...contactsList]));
              resolve(contactsList);
            }
          });
        });
      };

      const fetchIndividualChats = () => {
        return new Promise((resolve) => {
          onValue(individualChatsRef, async (snapshot) => {
            if (snapshot.exists()) {
              individualChatsList.length = 0;

              const chatKeys = Object.keys(snapshot.val());

              for (const chatKey of chatKeys) {
                const messages = Object.values(
                  snapshot.val()[chatKey].messages
                );
                const lastMessage = messages.at(-1);

                if (lastMessage) {
                  const userId = lastMessage.userId;
                  const receiverId = lastMessage.receiverId;
                  const lastIndividualMessage = lastMessage.text;

                  const updatesOne = {
                    [`chats/${[userId, receiverId]
                      .sort()
                      .join("_")}/lastIndividualMessage`]:
                      lastIndividualMessage || "🖼️ Image",
                    [`users/${userId}/${[userId, receiverId]
                      .sort()
                      .join("_")}/lastIndividualMessage`]:
                      lastIndividualMessage || "🖼️ Image",
                  };

                  const updatesTwo = {
                    [`chats/${[userId, receiverId]
                      .sort()
                      .join("_")}/lastIndividualMessage`]:
                      lastIndividualMessage || "🖼️ Image",
                    [`users/${receiverId}/${[userId, receiverId]
                      .sort()
                      .join("_")}/lastIndividualMessage`]:
                      lastIndividualMessage || "🖼️ Image",
                  };

                  try {
                    await update(ref(db), updatesOne);
                    await update(ref(db), updatesTwo);
                    individualChatsList.push({
                      id: [userId, receiverId].sort().join("_"),
                      lastIndividualMessage: lastIndividualMessage,
                      unreadMessages: true,
                    });
                  } catch (error) {
                    Alert.alert(
                      "Oops!",
                      "The last message could not be sent. Please try again."
                    );
                  }
                }
              }
              dispatch(
                displayContacts([...individualChatsList, ...contactsList])
              );

              resolve(individualChatsList);
            }
          });
        });
      };

      const fetchGroups = () => {
        return new Promise((resolve) => {
          onValue(groupsRef, (snapshot) => {
            if (snapshot.exists()) {
              for (const childSnapshot of Object.values(snapshot.val())) {
                console.log(childSnapshot, "childSnapshot");
                groupChatsList.push({
                  ...childSnapshot,
                });
              }
              dispatch(displayGroups([...groupChatsList]));
              resolve(groupChatsList);
            }
          });
        });
      };

      Promise.all([fetchContacts(), fetchIndividualChats(), fetchGroups()]);

      return () => {
        off(individualChatsRef);
        off(contactsRef);
        off(groupsRef);
      };
    };

    fetchAllChats();
  }, [dispatch]);

  const handleItemPress = async (item) => {
    if (item.type === "group") {
      navigation.navigate("ChatScreen", {
        groupChatId: item.groupId,
        chatType: item.type,
        chatName: item.groupName,
        chatAvatar: item.photoURL || "https://via.placeholder.com/150",
      });
    } else {
      navigation.navigate("ChatScreen", {
        contactId: item.id,
        contactName: item.name,
        contactAvatar: item.photoURL,
        chatType: item.chatType,
      });
    }
  };

  const uniqueContactsMap = new Map();
  contacts.forEach((entry) => {
    uniqueContactsMap.set(entry.id, entry);
  });
  const listOfUniqueContacts = Array.from(uniqueContactsMap.values());
  const validContacts = listOfUniqueContacts.reduce((obj, item) => {
    return { ...obj, ...item };
  }, []);

  const uniqueGroupsMap = new Map();
  groups.forEach((entry) => {
    uniqueGroupsMap.set(entry.groupId, entry);
  });
  const listOfUniqueGroups = Array.from(uniqueGroupsMap.values());
  const validGroups = listOfUniqueGroups.reduce((obj, item) => {
    return { ...obj, ...item };
  }, {});

  const renderItem = ({ item }) => {
    return (
      <ChatItem
        key={item.id || item.groupId}
        item={item}
        onPress={() => {
          handleItemPress(item);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SearchBar />
      <StatusList />
      <View style={styles.listContainer}>
        <View style={styles.dragger}></View>
        {contacts.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <MaterialIcons name="chat-bubble-outline" size={80} color="#ddd" />
            <Text style={styles.emptyStateText}>
              No chats or contacts available
            </Text>
          </View>
        ) : (
          <FlatList
            data={
              Object.keys(validGroups).length > 0
                ? [validContacts, validGroups]
                : [validContacts]
            }
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            showsVerticalScrollIndicator={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  dragger: {
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
    width: 30,
    height: 3,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
});

export default ChatList;
