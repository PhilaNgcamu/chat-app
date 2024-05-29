import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const conversations = [
  { id: "1", name: "John Doe", lastMessage: "Hey, how are you?" },
  { id: "2", name: "Jane Smith", lastMessage: "Let's catch up tomorrow!" },
  { id: "3", name: "Alice Johnson", lastMessage: "Got the files, thanks!" },
  // Add more conversations as needed
];

const Home = ({ navigation }) => {
  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversation}
      onPress={() => navigation.navigate("Chat", { userName: item.name })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  conversation: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: "#555",
  },
});

export default Home;
