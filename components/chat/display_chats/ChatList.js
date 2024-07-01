import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, onValue, off, update } from "firebase/database";
import { auth } from "../../../backend/firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setStatuses } from "../../../redux/actions";
import SearchBar from "./SearchBar";
import StatusList from "./StatusList";
import ChatItem from "./ChatItem";

const ChatList = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const privateMessages = useSelector((state) => state.privateMessages);

  useEffect(() => {
    const db = getDatabase();
    const individualChatsRef = ref(db, "chats");
    const contactsRef = ref(db, "users");
    const groupsRef = ref(db, "groups");
    const currentUserID = auth.currentUser.uid;

    const fetchItems = () => {
      const individualChatsList = [];
      const contactsList = [];
      const groupChatsList = [];

      const fetchContacts = () => {
        return new Promise((resolve) => {
          onValue(contactsRef, (snapshot) => {
            contactsList.length = 0;

            Object.entries(snapshot.val()).forEach(([id, data]) => {
              if (id !== currentUserID) {
                contactsList.push({
                  id,
                  chatType: "private",
                  ...data,
                });
              }
            });

            dispatch(setStatuses(contactsList));
            resolve(contactsList);
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
                    [`users/${userId}/${[userId, receiverId]
                      .sort()
                      .join("_")}/lastSentMessage`]: lastIndividualMessage,
                  };

                  const updatesTwo = {
                    [`users/${receiverId}/${[userId, receiverId]
                      .sort()
                      .join("_")}/lastReceivedMessage`]: lastIndividualMessage,
                  };

                  try {
                    await update(ref(db), updatesOne);
                    await update(ref(db), updatesTwo);
                    console.log("User last individual messages updated");
                  } catch (error) {
                    console.error(
                      "Error updating last individual messages",
                      error
                    );
                  }
                }
              }

              resolve(individualChatsList);
            }
          });
        });
      };

      const fetchGroups = () => {
        return new Promise((resolve) => {
          onValue(groupsRef, (snapshot) => {
            console.log("Groups:", JSON.stringify(snapshot, null, 2));
            // groupChatsList.push({
            //   groupName: "My Groups",
            // });

            // snapshot.forEach((childSnapshot) => {
            //   const groupData = childSnapshot.val();
            //   const messages = groupData.messages
            //     ? Object.values(groupData.messages)
            //     : [];
            //   const lastGroupMessage =
            //     messages.length > 0
            //       ? messages[messages.length - 1].text
            //       : "No messages yet";

            //   groupChatsList.push({
            //     id: childSnapshot.key,
            //     lastGroupMessage: lastGroupMessage,
            //     ...groupData,
            //   });
            // });

            // resolve(groupChatsList);
          });
        });
      };

      Promise.all([
        fetchContacts(),
        fetchIndividualChats(),
        // fetchGroups(),
      ]).then(([contacts, groups]) => {
        // console.log("Contactzs:", JSON.stringify(contacts, null, 2));
        dispatch(setItems([...contacts, ...groups]));
      });

      return () => {
        off(individualChatsRef);
        off(contactsRef);
        off(groupsRef);
      };
    };

    fetchItems();
  }, [privateMessages, dispatch]);

  const handleItemPress = (item) => {
    console.log("Item pressed:", JSON.stringify(item, null, 2));
    if (item.chatType === "group") {
      navigation.navigate("ChatScreen", {
        chatId: item.id,
        chatType: item.chatType,
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

  const uniqueEntries = new Map();
  items.forEach((entry) => {
    uniqueEntries.set(entry.id, entry);
  });
  const uniqueData = Array.from(uniqueEntries.values());

  const renderItem = ({ item }) => {
    return (
      <ChatItem
        key={item.id}
        item={item}
        onPress={() => {
          handleItemPress(item);
        }}
      />
    );
  };

  const filteredItems = items.filter((item) => item.groupName);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SearchBar />
      <StatusList />
      <View style={styles.listContainer}>
        <View style={styles.dragger}></View>
        {items.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <MaterialIcons name="chat-bubble-outline" size={80} color="#ddd" />
            <Text style={styles.emptyStateText}>
              No chats or contacts available
            </Text>
          </View>
        ) : (
          <FlatList
            data={uniqueData}
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
