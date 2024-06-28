import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, onValue, off, update } from "firebase/database";
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
            contactsList.push({
              id,
              chatType: "private",
              ...data,
            });
          }
        });

        dispatch(setStatuses(contactsList));
        dispatch(setItems([...contactsList, ...groupChatsList]));
        console.log(
          JSON.stringify(contactsList, null, 2),
          "This is contacts list"
        );
      });

      onValue(individualChats, (snapshot) => {
        if (snapshot.exists()) {
          // console.log(
          //   "information data2",
          //   JSON.stringify(
          //     Object.keys(snapshot.val())[0].slice(
          //       0,
          //       Object.keys(snapshot.val())[0].indexOf("_")
          //     ),
          //     null,
          //     2
          //   ),
          //   "children",
          //   JSON.stringify(
          //     Object.values(Object.values(snapshot.val())[0].messages).at(-1),
          //     null,
          //     2
          //   )
          // );
          // setItems([
          //   Object.values(Object.values(snapshot.val())[0].messages).at(-1)
          //     .text,
          // ]);
          individualChatsList.length = 0;

          console.log(
            "information data2",

            JSON.stringify(Object.keys(snapshot.val()), null, 2),
            "children",
            JSON.stringify(
              Object.values(Object.values(snapshot.val())[0].messages),
              null,
              2
            )
          );

          const userId = Object.values(
            Object.values(snapshot.val())[0].messages
          ).at(-1).userId;

          const receiverId = Object.values(
            Object.values(snapshot.val())[0].messages
          ).at(-1).receiverId;

          const contactName = Object.values(
            Object.values(snapshot.val())[0].messages
          ).at(-1).contactName;

          // individualChatsList.push({
          //   id: receiverId,
          //   name: auth.currentUser.displayName,
          //   photoURL: auth.currentUser.photoURL,
          //   chatType: "private",
          //   lastIndividualMessage: Object.values(
          //     Object.values(snapshot.val())[0].messages
          //   ).at(-1).text,
          // });
          const lastIndividualMessage = Object.values(
            Object.values(snapshot.val())[0].messages
          ).at(-1).text;

          update(
            ref(db, `users/${userId}/${[userId, receiverId].sort().join("_")}`),
            {
              lastIndividualMessage: lastIndividualMessage,
            }
          ).then(() => {
            console.log("User last individual messages updated");
          });
          update(
            ref(
              db,
              `users/${receiverId}/${[userId, receiverId].sort().join("_")}`
            ),
            {
              lastIndividualMessage: lastIndividualMessage,
            }
          ).then(() => {
            console.log("User last individual messages updated");
          });

          dispatch(setItems([...contactsList, ...groupChatsList]));
        }
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
          dispatch(setItems([...contactsList, ...groupChatsList]));
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

    console.log("contacts List", JSON.stringify(items, null, 2));
    // console.log(
    //   "filteredItems",
    //   auth.currentUser.uid,
    //   JSON.stringify(uniqueData, null, 2)
    //);

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
  console.log(
    JSON.stringify(items, null, 2),
    "These are all the chats and contacts"
  );
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
            data={items}
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
