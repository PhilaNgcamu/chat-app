import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

const stories = [
  { id: "1", name: "John Doe", image: "https://via.placeholder.com/100" },
  { id: "2", name: "Jane Smith", image: "https://via.placeholder.com/100" },
  { id: "3", name: "Alice Johnson", image: "https://via.placeholder.com/100" },
];

const conversations = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    status: "online",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Let's catch up tomorrow!",
    status: "offline",
  },
  {
    id: "3",
    name: "Alice Johnson",
    lastMessage: "Got the files, thanks!",
    status: "online",
  },
];

const Home = ({ navigation }) => {
  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationContainer}
      onPress={() =>
        navigation.navigate("Chat", {
          contactName: item.name,
          contactStatus: item.status,
        })
      }
    >
      <View style={styles.conversationContent}>
        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        style={styles.conversationsList}
      />
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate("UserProfile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  storiesList: {
    marginBottom: 20,
    marginRight: -10,
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 5,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#4CAF50",
    marginBottom: 5,
  },
  storyName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  conversationContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  conversationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});

export default Home;
