import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { useFonts } from "expo-font";
import PaperclipIcon from "../../../utils/icons/PaperclipIcon";
import DocumentsOutlineIcon from "../../../utils/icons/DocumentsOutlineIcon";
import CameraIcon from "../../../utils/icons/CameraIcon";
import MicrophoneIcon from "../../../utils/icons/MicrophoneIcon";

const ChatInput = ({
  newMessage,
  handleTyping,
  handleSend,
  pickImage,
  image,
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
    <View>
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
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.selectedImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    height: 90,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 7,
  },
  input: {
    flex: 1,
    color: "#333",
    marginRight: 8,
    fontFamily: "Poppins-Bold",
  },
  iconButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
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
    alignItems: "center",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default ChatInput;
