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
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { auth, db } from "../../backend/firebaseConfig";

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactList);
    };
    fetchContacts();
  }, []);

  const handleContactPress = async (contact) => {
    const chatId = await findOrCreateChat(contact.uid);
    navigation.navigate("ChatScreen", {
      chatId,
      chatName: contact.name,
    });
  };

  const findOrCreateChat = async (contactUid) => {
    const chatQuery = query(
      collection(db, "chats"),
      where("users", "array-contains", auth.currentUser.uid)
    );
    const chatSnapshot = await getDocs(chatQuery);

    for (const doc of chatSnapshot.docs) {
      const chatData = doc.data();
      if (chatData.users.includes(contactUid)) {
        return doc.id;
      }
    }

    const chatDoc = await addDoc(collection(db, "chats"), {
      users: [auth.currentUser.uid, contactUid],
      name: `${auth.currentUser.displayName}, ${contact.name}`,
      lastMessage: "",
      avatar: contact.avatar || "",
    });
    return chatDoc.id;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactPress(item)}
    >
      <View style={styles.contactInfo}>
        <Image
          source={{ uri: item.avatar || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <MaterialIcons name="contact-page" size={80} color="#ddd" />
          <Text style={styles.emptyStateText}>No contacts available</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("ChatList")}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
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
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#24786D",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default ContactList;
