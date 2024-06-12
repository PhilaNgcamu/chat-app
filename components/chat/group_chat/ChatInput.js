import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setImage, addGroupMessage, setIsTyping } from "../../../redux/actions";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../../../backend/firebaseConfig";
import {
  getDatabase,
  ref,
  push,
  update,
  serverTimestamp,
} from "firebase/database";

const ChatInput = ({ chatId }) => {
  const dispatch = useDispatch();
  const newMessage = useSelector((state) => state.newMessage);
  const isTyping = useSelector((state) => state.isTyping);
  const image = useSelector((state) => state.image);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setImage(result.assets[0].uri));
    }
  };

  const handleSend = async () => {
    if (newMessage.trim() === "" && !image) return;
    const db = getDatabase();
    const userId = auth.currentUser.uid;

    if (newMessage.trim() !== "") {
      await push(ref(db, `groups/${chatId}/messages`), {
        text: newMessage,
        createdAt: serverTimestamp(),
        userId,
        readBy: { [userId]: true },
        senderName: auth.currentUser.displayName,
      });
      dispatch(addGroupMessage(""));
    }
    dispatch(setIsTyping(false));
    await updateTypingStatus(false);
    if (image) {
      const storage = getStorage();
      const imageRef = storageRef(
        storage,
        `chatImages/${chatId}/${Date.now()}`
      );
      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      await push(ref(db, `groups/${chatId}/messages`), {
        imageUrl: downloadURL,
        createdAt: serverTimestamp(),
        userId,
        readBy: { [userId]: true },
        senderName: auth.currentUser.displayName,
      });

      dispatch(setImage(null));
    }

    dispatch(setIsTyping(false));
    await updateTypingStatus(false);
  };

  const handleTyping = (text) => {
    dispatch(addGroupMessage(text));
    if (text.trim() !== "" && !isTyping) {
      dispatch(setIsTyping(true));
      updateTypingStatus(true);
    } else if (text.trim() === "" && isTyping) {
      dispatch(setIsTyping(false));
      updateTypingStatus(false);
    }
  };

  const updateTypingStatus = async (status) => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    await update(ref(db, `groups/${chatId}/typingStatus/${userId}`), {
      isTyping: status,
    });
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
        <Feather name="paperclip" size={24} color="#000E08" />
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
      <TouchableOpacity onPress={handleSend} style={styles.iconButton}>
        <Ionicons name="send" size={24} color="#000E08" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Feather name="camera" size={24} color="#000E08" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons name="keyboard-voice" size={24} color="#000E08" />
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
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
  selectedImage: {
    width: 200,
    height: 200,
    margin: 16,
    alignSelf: "center",
  },
});

export default ChatInput;
