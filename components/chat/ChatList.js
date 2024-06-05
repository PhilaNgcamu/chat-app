import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../backend/firebaseConfig";
import { StatusBar } from "expo-status-bar";

const CombinedChatList = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const db = getDatabase();

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
      setStatuses(contactsList);
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
        contactAvatar: item.photoURL || "https://via.placeholder.com/150",
      });
    }
  };

  const renderStatusItem = ({ item }) => (
    <TouchableOpacity style={styles.statusItem}>
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
          <AntDesign name="search1" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
          <Image
            source={{
              uri:
                auth.currentUser.photoURL || "https://via.placeholder.com/150",
            }}
            style={styles.userProfile}
          />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 16,
    backgroundColor: "#000",
  },
  iconWrapper: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
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

export default CombinedChatList;
