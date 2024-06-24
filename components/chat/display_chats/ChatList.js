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
    const chatsRef = ref(db, "chats");
    const contactsRef = ref(db, "users");
    const currentUserID = auth.currentUser.uid;

    const fetchItems = () => {
      const chatList = [];
      const contactsList = [];

      onValue(contactsRef, (snapshot) => {
        contactsList.length = 0;
        Object.entries(snapshot.val()).forEach(([id, data]) => {
          console.log(id, "This is id");
          if (id !== currentUserID) {
            contactsList.push({ id, ...data });
          }
        });

        dispatch(setStatuses(contactsList));
        dispatch(setItems([...contactsList, ...chatList]));
      });

      onValue(chatsRef, (snapshot) => {
        chatList.length = 0;

        snapshot.forEach((childSnapshot) => {
          const chatData = childSnapshot.val();

          console.log(chatData, "This is chat data");
          const chats = Object.values(chatData);
          const messages = chats[chats.length - 1];
          const lastMessage =
            Object.values(messages)[Object.values(messages).length - 1].text;
          if (
            Object.values(messages)[Object.values(messages).length - 1].userId
          ) {
            chatList.push({
              lastMessage: lastMessage ? lastMessage : "No messages yet",
            });
          } else {
            chatList.push({
              id: childSnapshot.key,
              name: chatData.name,
              type: chatData.type,
              lastMessage: lastMessage,
            });
          }
          dispatch(setItems([...contactsList, ...chatList]));
        });
      });

      return () => {
        off(chatsRef);
        off(contactsRef);
      };
    };

    fetchItems();
  }, [dispatch]);

  const handleItemPress = (item) => {
    console.log("Item pressed:", item);
    if (item.type === "group") {
      navigation.navigate("PrivateChat", {
        chatId: item.id,
        chatName: item.name,
        chatLastMessage: item.lastMessage,
      });
    } else {
      navigation.navigate("PrivateChat", {
        contactId: item.id,
        contactName: item.name,
        contactAvatar: item.photoURL,
        contactLastMessage: item.lastMessage,
      });
    }
  };

  const renderItem = ({ item }) => {
    const reItems = items.reduce((obj, value) => {
      return { ...obj, ...value };
    }, {});
    const groupItems = items.filter((item) => item.type !== "group");
    console.log(groupItems[0], "itemss");
    console.log(JSON.stringify(items, null, 2), "reItems");
    return (
      item.id && (
        <ChatItem
          item={reItems}
          onPress={() => {
            handleItemPress(reItems);
          }}
        />
      )
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
