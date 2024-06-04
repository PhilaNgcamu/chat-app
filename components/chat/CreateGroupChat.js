import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { getDatabase, ref, push, get, set } from "firebase/database";
import { auth } from "../../backend/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

const CreateGroupChat = ({ navigation }) => {
  const [groupName, setGroupName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const db = getDatabase();
      const contactsRef = ref(db, "users");

      const snapshot = await get(contactsRef);
      if (snapshot.exists()) {
        const currentUserID = auth.currentUser.uid;

        const contactsList = Object.entries(snapshot.val()).map(
          ([id, data]) => ({
            id,
            ...data,
          })
        );
        const filteredContacts = contactsList.filter(
          (contact) => contact.id !== currentUserID
        );

        setContacts(filteredContacts);
      } else {
        setContacts([]);
      }
    };

    fetchContacts();
  }, []);

  const handleCreateGroup = async () => {
    if (groupName.trim() === "" || selectedContacts.length === 0) return;
    const db = getDatabase();
    const newGroupChatRef = push(ref(db, "chats"));
    await set(newGroupChatRef, {
      name: groupName,
      users: selectedContacts.reduce(
        (acc, contact) => {
          acc[contact.id] = true;
          return acc;
        },
        { [auth.currentUser.uid]: true }
      ),
      type: "group",
    });
    navigation.navigate("Chat Screen", {
      chatId: newGroupChatRef.key,
      chatName: groupName,
    });
  };

  const toggleContactSelection = (contact) => {
    if (selectedContacts.some((c) => c.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.contactItem,
        selectedContacts.some((c) => c.id === item.id) &&
          styles.selectedContactItem,
      ]}
      onPress={() => toggleContactSelection(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.contactAvatar} />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Group Chat</Text>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Group Name"
      />
      {contacts.length === 0 ? (
        <View style={styles.noContactsContainer}>
          <MaterialIcons name="error-outline" size={50} color="#888" />
          <Text style={styles.noContactsText}>No contacts available</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.contactList}
        />
      )}
      <TouchableOpacity
        style={[
          styles.createButton,
          (groupName.trim() === "" || selectedContacts.length === 0) &&
            styles.createButtonDisabled,
        ]}
        onPress={handleCreateGroup}
        disabled={groupName.trim() === "" || selectedContacts.length === 0}
      >
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addContactButton}
        onPress={() => navigation.navigate("AddContact")}
      >
        <Text style={styles.addContactButtonText}>Add New Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  contactList: {
    flex: 1,
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContactsText: {
    fontSize: 18,
    color: "#888",
    marginTop: 10,
  },
  contactItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedContactItem: {
    backgroundColor: "#dcf8c6",
  },
  contactName: {
    fontSize: 18,
  },
  createButton: {
    backgroundColor: "#24786D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonDisabled: {
    backgroundColor: "#b2d8d8",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addContactButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addContactButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateGroupChat;
