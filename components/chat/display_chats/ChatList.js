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
  const searchQuery = useSelector((state) => state.searchQuery);

  useEffect(() => {
    const db = getDatabase();
    const chatsRef = ref(db, "chats");
    const contactsRef = ref(db, "users");
    const currentUserID = auth.currentUser.uid;

    const fetchItems = () => {
      const chatList = [];
      const contactsList = [];
      onValue(chatsRef, (snapshot) => {
        chatList.length = 0;
        snapshot.forEach((childSnapshot) => {
          const chatData = childSnapshot.val();
          if (chatData.users && chatData.users[currentUserID]) {
            chatList.push({ id: childSnapshot.key, ...chatData });
          }
        });

        dispatch(setItems([...chatList, ...contactsList]));
      });

      onValue(contactsRef, (snapshot) => {
        contactsList.length = 0;
        Object.entries(snapshot.val()).forEach(([id, data]) => {
          if (id !== currentUserID) {
            contactsList.push({ id, ...data });
          }
        });

        dispatch(setStatuses(contactsList));
        dispatch(setItems([...chatList, ...contactsList]));
      });

      return () => {
        off(chatsRef);
        off(contactsRef);
      };
    };

    fetchItems();
  }, [dispatch]);

  const handleItemPress = (item) => {
    if (item.type === "group") {
      navigation.navigate("ChatScreen", {
        chatId: item.id,
        chatName: item.name,
        chatLastMessage: item.lastMessage,
      });
    } else {
      navigation.navigate("PrivateChat", {
        contactId: item.id,
        contactName: item.name,
        contactAvatar: item.photoUrl,
      });
    }
  };

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SearchBar />
      <StatusList />
      <View style={styles.listContainer}>
        <View style={styles.dragger}></View>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <MaterialIcons name="chat-bubble-outline" size={80} color="#ddd" />
            <Text style={styles.emptyStateText}>
              No chats or contacts available
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => (
              <ChatItem item={item} onPress={() => handleItemPress(item)} />
            )}
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
