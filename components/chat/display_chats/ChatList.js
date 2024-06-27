import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { auth, db } from "../../../backend/firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setStatuses } from "../../../redux/actions";
import SearchBar from "./SearchBar";
import StatusList from "./StatusList";
import ChatItem from "./ChatItem";

const ChatList = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  useEffect(() => {
    const db = getDatabase();
    const individualChats = ref(db, "chats");
    const contactsRef = ref(db, "users");
    const groupsRef = ref(db, "groups");
    const currentUserID = auth.currentUser.uid;

    const fetchItems = () => {
      const individualChatsList = [];
      const contactsList = [];
      const groupChatsList = [];

      onValue(contactsRef, (snapshot) => {
        contactsList.length = 0;
        Object.entries(snapshot.val()).forEach(([id, data]) => {
          console.log(id, "This is id");
          if (id !== currentUserID) {
            contactsList.push({ id, ...data });
          }
        });

        dispatch(setStatuses(contactsList));
        dispatch(
          setItems([...contactsList, ...individualChatsList, ...groupChatsList])
        );
      });

      onValue(individualChats, (snapshot) => {
        individualChatsList.length = 0;

        snapshot.forEach((childSnapshot) => {
          const chatData = childSnapshot.val();

          console.log(JSON.stringify(chatData, null, 2), "This is chat data");
          const chats = Object.values(chatData);
          const messages = chats[chats.length - 1];
          const lastIndividualMessage =
            Object.values(messages)[Object.values(messages).length - 1].text;

          console.log(
            JSON.stringify(snapshot, null, 2),
            "These are contacts and chats"
          );
          contactsList.forEach((contact, index) => {
            const chatId = contact.id;
            const name = contact.name;
            const photoURL = contact.photoURL;
            if (childSnapshot.key.includes(chatId)) {
              individualChatsList.push({
                id: chatId,
                name: name,
                photoURL: photoURL,
                chatType: "private",
                lastIndividualMessage: lastIndividualMessage,
              });
              dispatch(setItems([...individualChatsList, ...groupChatsList]));
            } else {
              dispatch(setItems([...contactsList, ...groupChatsList]));
            }
          });

          console.log(
            JSON.stringify(individualChatsList, null, 2),
            "These are contacts and chats"
          );
        });
      });

      onValue(groupsRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const groupData = childSnapshot.val();
          const messages = groupData.messages
            ? Object.values(groupData.messages)
            : [];
          const lastGroupMessage =
            messages.length > 0
              ? messages[messages.length - 1].text
              : "No messages yet";

          groupChatsList.push({
            id: childSnapshot.key,
            lastGroupMessage: lastGroupMessage,
            ...groupData,
          });
          dispatch(
            setItems([
              ...contactsList,
              ...individualChatsList,
              ...groupChatsList,
            ])
          );
        });
      });

      return () => {
        off(individualChats);
        off(contactsRef);
        off(groupsRef);
      };
    };

    fetchItems();
  }, [db]);

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
  // console.log("reItems", JSON.stringify(item, null, 2));
  // console.log("filteredItems", JSON.stringify(uniqueData, null, 2));

  const renderItem = ({ item }) => {
    const uniqueEntries = new Map();
    items.forEach((entry) => {
      uniqueEntries.set(entry.id, entry);
    });
    const uniqueData = Array.from(uniqueEntries.values());
    console.log("reItems", JSON.stringify(item, null, 2));
    console.log("filteredItems", JSON.stringify(uniqueData, null, 2));

    return (
      <ChatItem
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
