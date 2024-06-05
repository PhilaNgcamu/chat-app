import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { getDatabase, ref, update, serverTimestamp } from "firebase/database";
import { auth } from "../../backend/firebaseConfig";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    const db = getDatabase();
    const userId = auth.currentUser.uid;
    const userStatusDatabaseRef = ref(db, `users/${userId}`);

    const isOfflineForDatabase = {
      online: false,
      lastChanged: serverTimestamp(),
    };

    try {
      await update(userStatusDatabaseRef, isOfflineForDatabase);
      await signOut(auth);
      navigation.navigate("UserLogin");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Chatbox</Text>

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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    marginBottom: 40,
    color: "#24786D",
  },
  button: {
    backgroundColor: "#24786D",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 12,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: "#FF5A5F",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 12,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default Home;
