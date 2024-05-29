import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import auth from "../../backend/firebaseConfig";

const Home = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("UserLogin");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Chatbox</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChatList")}
      >
        <Text style={styles.buttonText}>Chats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#24786D",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#FF5A5F",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
});

export default Home;
