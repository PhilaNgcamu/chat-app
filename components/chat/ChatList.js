import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { auth } from "../../backend/firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setStatuses, setSearchQuery } from "../../redux/actions";

const ChatList = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const statuses = useSelector((state) => state.statuses);
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

  const renderStatusItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.statusItem}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.statusImage}
        />
        <Text style={styles.statusName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <View style={styles.itemInfo}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.name || "Chat"}</Text>
          <Text style={styles.itemLastMessage}>
            {"Click here to see messages..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={24} color="#fff" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={(text) => dispatch(setSearchQuery(text))}
          />
        </View>

        <Image
          source={{
            uri: auth.currentUser.photoURL || "https://via.placeholder.com/150",
          }}
          style={styles.userProfile}
        />
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.addStatusContainer}>
          <Image
            source={{
              uri:
                auth.currentUser.photoURL || "https://via.placeholder.com/150",
            }}
            style={styles.addStatusImage}
          />
          <View style={styles.addStatusIconWrapper}>
            <MaterialIcons name="add" size={16} color="#362F34" />
          </View>
          <Text style={styles.myStatusText}>My Status</Text>
        </View>
        <FlatList
          data={statuses}
          horizontal
          renderItem={renderStatusItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 16,
    backgroundColor: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 16,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
  },
  userProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  addStatusContainer: {
    position: "relative",
    alignItems: "center",
    marginRight: 10,
  },
  addStatusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addStatusIconWrapper: {
    position: "absolute",
    bottom: 15,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  myStatusText: {
    marginTop: 4,
    fontSize: 12,
    color: "#fff",
  },
  statusItem: {
    alignItems: "center",
    marginRight: 10,
  },
  statusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#24786D",
  },
  statusName: {
    fontSize: 12,
    marginTop: 4,
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f9f9f9",
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
  list: {
    flex: 1,
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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemLastMessage: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#24786D",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default ChatList;
