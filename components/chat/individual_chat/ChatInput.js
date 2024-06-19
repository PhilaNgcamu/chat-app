import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

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
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
        <FontAwesome6 name="paperclip" size={24} color="#000E08" />
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
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginBottom: 10,
    height: 90,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
    padding: 7,
    justifyContent: "space-between",
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
  selectedImage: {
    width: 200,
    height: 200,
    margin: 16,
    alignSelf: "center",
  },
});

export default ChatInput;
