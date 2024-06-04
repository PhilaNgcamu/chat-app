import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../backend/firebaseConfig";

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

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

  const handleContactPress = (contact) => {
    navigation.navigate("ChatScreen", {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactPress(item)}
    >
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No contacts available</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ContactList;
