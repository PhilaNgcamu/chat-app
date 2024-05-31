import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "../../backend/firebaseConfig";

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const chatsRef = ref(db, "chats");
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const chatList = [];
      snapshot.forEach((childSnapshot) => {
        const chatData = childSnapshot.val();
        if (chatData.users && chatData.users[auth.currentUser.uid]) {
          chatList.push({ id: childSnapshot.key, ...chatData });
        }
      });
      setChats(chatList);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("ChatScreen", {
          chatId: item.id,
          chatName: item.name,
        })
      }
    >
      <View style={styles.chatInfo}>
        <Image
          source={{ uri: item.avatar || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <View style={styles.chatDetails}>
          <Text style={styles.chatTitle}>{item.name || "Chat"}</Text>
          <Text style={styles.chatLastMessage}>
            {item.lastMessage || "No messages yet..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {chats.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <MaterialIcons name="chat-bubble-outline" size={80} color="#ddd" />
          <Text style={styles.emptyStateText}>No chats available</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  chatInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatDetails: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chatLastMessage: {
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
