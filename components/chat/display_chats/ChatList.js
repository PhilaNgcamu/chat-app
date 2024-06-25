import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, onValue, off } from "firebase/database";
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

  useEffect(() => {
    const db = getDatabase();
    const individualChats = ref(db, "chats");
    const contactsRef = ref(db, "users");
    const groupChats = ref(db, "groups");
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
        dispatch(setItems([...contactsList, ...individualChatsList]));
      });

      onValue(individualChats, (snapshot) => {
        individualChatsList.length = 0;

        snapshot.forEach((childSnapshot) => {
          const chatData = childSnapshot.val();
          const groupChats = childSnapshot;
          console.log("groupChats", JSON.stringify(groupChats, null, 2));

          // console.log(JSON.stringify(chatData, null, 2), "This is chat data");
          // const chats = Object.values(chatData);
          // const messages = chats[chats.length - 1];
          // const lastIndividualMessage =
          //   Object.values(messages)[Object.values(messages).length - 1].text;
          // individualChatsList.push({
          //   id: childSnapshot.key,
          //   lastIndividualMessage: lastIndividualMessage
          //     ? lastIndividualMessage
          //     : "No messages yet",
          //   ...chatData,
          // });
          // console.log(
          //   JSON.stringify(chatData, null, 2),
          //   "These are contacts and chats"
          // );

          // if (chatData.type === "group") {
          //   individualChatsList.push({
          //     id: childSnapshot.key,
          //     lastIndividualMessage: lastIndividualMessage
          //       ? lastIndividualMessage
          //       : "No messages yet",
          //     ...chatData,
          //   });
          // } else {
          //   individualChatsList.push({
          //     id: childSnapshot.key,
          //     lastIndividualMessage: lastIndividualMessage
          //       ? lastIndividualMessage
          //       : "No messages yet",
          //     ...chatData,
          //   });
          // }
          dispatch(setItems([...contactsList, ...individualChatsList]));
          console.log(
            JSON.stringify(chatData, null, 2),
            "These are contacts and chats"
          );
        });
      });

      onValue(groupChats, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          console.log(
            "groupChats",
            JSON.stringify(
              Object.values(Object.values(childSnapshot.val())[0])[0]?.text,
              null,
              2
            )
          );
          const lastGroupMessage = Object.values(
            Object.values(childSnapshot.val())[0]
          )[0]?.text;
          console.log(lastGroupMessage, "last message");

          groupChatsList.push({
            id: childSnapshot.key,
            lastGroupMessage: lastGroupMessage
              ? lastGroupMessage
              : "No messages yet",
            ...childSnapshot.val(),
          });
          dispatch(setItems([...groupChatsList]));
          console.log("These are items", JSON.stringify(items, null, 2));
        });
      });

      return () => {
        off(individualChats);
        off(contactsRef);
        off(groupChats);
      };
    };

    fetchItems();
  }, [dispatch]);

  const handleItemPress = (item) => {
    console.log("Item pressed:", JSON.stringify(item, null, 2));
    if (item.type === "group") {
      navigation.navigate("PrivateChat", {
        chatId: item.id,
        chatType: item.type,
        chatName: item.groupName,
        chatAvatar: item.photoURL || "https://via.placeholder.com/150",
      });
    } else {
      navigation.navigate("PrivateChat", {
        contactId: item.id,
        contactName: item.name,
        contactAvatar: item.photoURL,
      });
    }
  };

  const renderItem = ({ item }) => {
    const reItems = items.reduce((obj, value) => {
      return { ...obj, ...value };
    }, {});
    const groupItems = items.filter((item) => item.type !== "group");
    console.log(groupItems[0], "itemss");
    console.log(JSON.stringify(reItems, null, 2), "reItems");
    console.log(items, "groupItems");
    return (
      <ChatItem
        item={reItems}
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
