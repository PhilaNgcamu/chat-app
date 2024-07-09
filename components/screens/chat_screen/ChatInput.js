import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import PaperclipIcon from "../../../utils/icons/PaperclipIcon";
import DocumentsOutlineIcon from "../../../utils/icons/DocumentsOutlineIcon";
import CameraIcon from "../../../utils/icons/CameraIcon";
import MicrophoneIcon from "../../../utils/icons/MicrophoneIcon";
import { MaterialIcons } from "@expo/vector-icons";

const ChatInput = ({
  newMessage,
  handleTyping,
  handleSend,
  pickImage,
  removeImage,
  image,
  isLoading,
}) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {image !== null && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.selectedImage} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={removeImage}
          >
            <MaterialIcons name="cancel" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendImageButton}
            onPress={handleSend}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <MaterialIcons name="send" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <PaperclipIcon />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={handleTyping}
            placeholder="Write your message"
            placeholderTextColor="#888"
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.documentIcon}>
            <DocumentsOutlineIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.iconButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <CameraIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MicrophoneIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 7,
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    color: "#333",
    fontFamily: "Poppins-Bold",
  },
  iconButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  documentIcon: {
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#F2F7FB",
    borderRadius: 12,
    padding: 5,
  },
  sendImageButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#F2F7FB",
    borderRadius: 12,
    padding: 5,
  },
});

export default ChatInput;
