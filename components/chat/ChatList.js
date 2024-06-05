import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../backend/firebaseConfig";

const CombinedChatList = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    // Fetching chats and contacts
    const fetchItems = async () => {
      const chatsRef = ref(db, "chats");
      const contactsRef = ref(db, "users");

      const chatsSnapshot = await get(chatsRef);
      const contactsSnapshot = await get(contactsRef);

      const currentUserID = auth.currentUser.uid;
      const chatList = [];
      const contactsList = [];

      if (chatsSnapshot.exists()) {
        chatsSnapshot.forEach((childSnapshot) => {
          const chatData = childSnapshot.val();
          if (chatData.users && chatData.users[currentUserID]) {
            chatList.push({ id: childSnapshot.key, ...chatData });
          }
        });
      }

      if (contactsSnapshot.exists()) {
        Object.entries(contactsSnapshot.val()).forEach(([id, data]) => {
          if (id !== currentUserID) {
            contactsList.push({ id, ...data });
          }
        });
      }

      const combinedList = [...chatList, ...contactsList];
      setItems(combinedList);
      setStatuses(contactsList); // Assuming statuses are derived from contacts
    };

    fetchItems();
  }, []);

  const handleItemPress = (item) => {
    if (item.chatLastMessage) {
      navigation.navigate("Chat Screen", {
        chatId: item.id,
        chatName: item.name,
        chatLastMessage: item.lastMessage,
      });
    } else {
      navigation.navigate("PrivateChat", {
        contactId: item.id,
        contactName: item.name,
      });
    }
  };

  const renderStatusItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}} style={styles.statusItem}>
      <Image
        source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
        style={styles.statusImage}
      />
      <Text style={styles.statusName}>{item.name}</Text>
    </TouchableOpacity>
  );

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
            {item.lastMessage || "No messages yet..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="ios-search" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity style={styles.iconWrapper}>
          <FontAwesome name="user-circle" size={24} color="black" />
        </TouchableOpacity>
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
            <MaterialIcons name="add" size={16} color="#fff" />
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
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateGroupChat")}
      >
        <MaterialIcons name="group-add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  iconWrapper: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
    backgroundColor: "#24786D",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  myStatusText: {
    marginTop: 4,
    fontSize: 12,
  },
  statusItem: {
    alignItems: "center",
    marginRight: 10,
  },
  statusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusName: {
    fontSize: 12,
    marginTop: 4,
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

export default CombinedChatList;
