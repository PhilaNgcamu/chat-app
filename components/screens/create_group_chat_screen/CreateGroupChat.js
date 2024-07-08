import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { getDatabase, ref, set, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth } from "../../../backend/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import {
  setGroupImage,
  setGroupName,
  setSelectedGroupContacts,
} from "../../../redux/group_chat/groupChatActions";

const CreateGroupChat = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const groupName = useSelector((state) => state.groupChat.groupName);
  const contacts = useSelector((state) => state.groupContacts.contacts);
  const selectedContacts = useSelector(
    (state) => state.selectedGroupContacts.selectedContacts
  );
  const groupImage = useSelector((state) => state.groupImage.groupImage);

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

        dispatch(setGroupContacts(filteredContacts));
      } else {
        dispatch(setGroupContacts([]));
      }
    };

    fetchContacts();
  }, []);

  const handleCreateGroup = async () => {
    if (groupName.trim() === "" || selectedContacts.length === 0) return;

    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const groupId = [userId, ...selectedContacts.map((contact) => contact.id)]
      .sort()
      .join("_");

    const newGroupData = {
      groupId,
      groupName,
      users: selectedContacts.reduce(
        (acc, contact) => {
          acc[contact.id] = true;
          return acc;
        },
        { [userId]: true }
      ),
      type: "group",
    };

    if (groupImage) {
      try {
        const storage = getStorage();
        const imageRef = storageRef(
          storage,
          `groupImages/${userId}/${Date.now()}`
        );
        const response = await fetch(groupImage);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imageRef);
        newGroupData.imageUrl = imageUrl;
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }

    const newGroupChatRef = ref(db, `groups/${groupId}`);
    await set(newGroupChatRef, newGroupData);
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setGroupImage(result.assets[0].uri));
    }
  };

  const toggleContactSelection = (contact) => {
    if (selectedContacts.some((c) => c.id === contact.id)) {
      dispatch(
        setSelectedGroupContacts(
          selectedContacts.filter((c) => c.id !== contact.id)
        )
      );
    } else {
      dispatch(setSelectedGroupContacts([...selectedContacts, contact]));
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.contactItem,
          selectedContacts.some((c) => c.id === item.id) &&
            styles.selectedContactItem,
        ]}
        onPress={() => toggleContactSelection(item)}
      >
        <Text style={styles.contactName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Group Chat</Text>
      </View>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={(text) => dispatch(setGroupName(text))}
        placeholder="Group Name"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {groupImage ? (
          <Image source={{ uri: groupImage }} style={styles.groupImage} />
        ) : (
          <Text style={styles.imagePickerText}>Pick a group image</Text>
        )}
      </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    marginTop: 30,
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
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePickerText: {
    color: "#888",
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
