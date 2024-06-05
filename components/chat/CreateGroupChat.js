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
import { useNavigation } from "@react-navigation/native";

const CreateGroupChat = () => {
  const [groupName, setGroupName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const navigation = useNavigation();

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Group Chat</Text>
      </View>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Group Name"
        placeholderTextColor="#888"
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#24786D",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    color: "#333",
  },
  contactList: {
    flex: 1,
    marginTop: 10,
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
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedContactItem: {
    backgroundColor: "#dcf8c6",
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contactName: {
    fontSize: 18,
    color: "#333",
  },
  createButton: {
    backgroundColor: "#24786D",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addContactButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateGroupChat;
