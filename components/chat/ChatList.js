import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../backend/firebaseConfig";

const ChatList = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const q = query(
        collection(db, "chats"),
        where("users", "array-contains", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const chatList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatList);
    };
    fetchChats();
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
      <Button
        title="Start a New Chat"
        onPress={() => navigation.navigate("Contact List")}
      />
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
});

export default ChatList;
