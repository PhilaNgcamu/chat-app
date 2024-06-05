import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  serverTimestamp,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { auth } from "../../backend/firebaseConfig";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { useTabBarVisibility } from "../screens/useTabBarVisibilityContext";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const PrivateChatScreen = ({ route, navigation }) => {
  const { contactId, contactName, contactAvatar } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const { setTabBarVisible } = useTabBarVisibility();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [])
  );

  useEffect(() => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const chatId = [userId, contactId].sort().join("_");
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const typingRef = ref(db, `chats/${chatId}/typingStatus/${contactId}`);
    const userRef = ref(db, `users/${contactId}`);

    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((childSnapshot) => {
        messageList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setMessages(messageList);
      markMessagesAsRead(messageList, chatId);
    });

    const unsubscribeTyping = onValue(typingRef, (snapshot) => {
      if (snapshot.exists()) {
        setOtherUserTyping(snapshot.val().isTyping);
      }
    });

    const unsubscribeUser = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setOtherUserName(userData.name);
        setIsOnline(userData.online);
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeTyping();
      unsubscribeUser();
    };
  }, [contactId]);

  const markMessagesAsRead = async (messages, chatId) => {
    const db = getDatabase();
    const updates = {};
    messages.forEach((message) => {
      if (!message.read && message.userId !== auth.currentUser.uid) {
        updates[`chats/${chatId}/messages/${message.id}/read`] = true;
      }
    });
    await update(ref(db), updates);
  };

  const handleSend = async () => {
    if (newMessage.trim() === "" && !image) {
      return;
    }

    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const chatId = [userId, contactId].sort().join("_");

    // Sending text message
    if (newMessage.trim() !== "") {
      await push(ref(db, `chats/${chatId}/messages`), {
        text: newMessage,
        createdAt: serverTimestamp(),
        userId,
        read: false,
        senderName: auth.currentUser.displayName,
      });
      setNewMessage("");
    }

    // Sending image message
    if (image) {
      const storage = getStorage();
      const imageRef = storageRef(
        storage,
        `chatImages/${chatId}/${Date.now()}`
      );
      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      await push(ref(db, `chats/${chatId}/messages`), {
        imageUrl,
        createdAt: serverTimestamp(),
        userId,
        read: false,
        senderName: auth.currentUser.displayName,
      });
      setImage(null);
    }

    setIsTyping(false);
    await updateTypingStatus(false, chatId);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateTypingStatus = async (status, chatId) => {
    const db = getDatabase();
    await update(
      ref(db, `chats/${chatId}/typingStatus/${auth.currentUser.uid}`),
      {
        isTyping: status,
      }
    );
  };

  const handleTyping = (text) => {
    const userId = auth.currentUser.uid;
    const chatId = [userId, contactId].sort().join("_");
    setNewMessage(text);
    if (text.trim() !== "" && !isTyping) {
      setIsTyping(true);
      updateTypingStatus(true, chatId);
    } else if (text.trim() === "" && isTyping) {
      setIsTyping(false);
      updateTypingStatus(false, chatId);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageItem,
        item.userId === auth.currentUser.uid && styles.myMessage,
      ]}
    >
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl || "https://via.placeholder.com/150" }}
          style={styles.image}
        />
      )}
      <View style={styles.messageMeta}>
        <Text style={styles.senderName}>
          {item.userId === auth.currentUser.uid ? "You" : item.senderName}
        </Text>
        <Text style={styles.messageTimestamp}>
          {format(new Date(item.createdAt), "HH:mm")}
        </Text>
        {item.read && item.userId === auth.currentUser.uid && (
          <MaterialIcons name="done-all" size={16} color="#4CAF50" />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image source={{ uri: contactAvatar }} style={styles.avatar} />
        <View style={styles.headerContent}>
          <Text style={styles.chatName}>{contactName}</Text>
          <Text style={styles.statusText}>
            {isOnline ? "Active Now" : "Offline"}
          </Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Feather name="phone" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Feather name="video" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        ref={inputRef}
        onContentSizeChange={() =>
          inputRef.current.scrollToEnd({ animated: true })
        }
      />
      {otherUserTyping && (
        <Text style={styles.typingIndicator}>{otherUserName} is typing...</Text>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <Feather name="paperclip" size={24} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={handleTyping}
          placeholder="Write your message"
          placeholderTextColor="#888"
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="documents-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="camera" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="sound" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#fff",
    marginTop: 30,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  statusText: {
    fontSize: 14,
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 15,
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: "flex-start",
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  myMessage: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  messageMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  senderName: {
    fontSize: 12,
    color: "#888",
    marginRight: 4,
  },
  messageTimestamp: {
    fontSize: 12,
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 10,
    paddingLeft: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
    backgroundColor: "#f9f9f9",
    marginRight: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
  typingIndicator: {
    paddingHorizontal: 16,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 5,
    textAlign: "center",
  },
  selectedImage: {
    width: 200,
    height: 200,
    margin: 16,
    alignSelf: "center",
  },
});

export default PrivateChatScreen;
