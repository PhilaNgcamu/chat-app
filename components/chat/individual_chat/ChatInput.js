import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

const ChatInput = ({
  newMessage,
  handleTyping,
  handleSend,
  pickImage,
  image,
}) => (
  <View style={styles.inputContainer}>
    <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
      <Feather name="paperclip" size={24} color="#000E08" />
    </TouchableOpacity>
    <View style={styles.inputWrapper}>
    <TextInput
      value={newMessage}
      onChangeText={handleTyping}
      placeholder="Write your message"
      placeholderTextColor="#888"
      onSubmitEditing={handleSend}
      returnKeyType="send"
    />
    <TouchableOpacity style={styles.documentIcon}>
    <Ionicons name="documents-outline" size={24} color="black" />
    </TouchableOpacity>
   </View>
    <TouchableOpacity style={styles.iconButton}>
      <Feather name="camera" size={24} color="#000E08" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconButton}>
      <MaterialIcons name="keyboard-voice" size={24} color="#000E08" />
    </TouchableOpacity>
    
    {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#FFFFFF",
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
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 7,
    justifyContent: "space-between",
  },
  iconButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
  },
  documentIcon: {
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  selectedImage: {
    width: 200,
    height: 200,
    margin: 16,
    alignSelf: "center",
  },
});

export default ChatInput;
