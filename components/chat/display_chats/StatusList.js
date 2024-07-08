import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../backend/firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { setProfilePicture } from "../../../redux/actions";
import { displayStatuses } from "../../../redux/chat_list/chatListActions";

const PEXELS_API_KEY =
  "HOQhlLoeml32OchQuDRqmxSjfoRpbqBvwX8zpTVxnS65mKmPbXlZQl5s";

const StatusList = () => {
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.chatList.statuses);
  const filterForImages = statuses.filter((status) => status.photoURL !== null);
  const profilePicture = useSelector(
    (state) => state.userVerification.profilePicture
  );

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      const db = getDatabase();
      const userRef = ref(db, "users/" + auth.currentUser.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        dispatch(
          setProfilePicture(
            userData.photoURL || "https://via.placeholder.com/150"
          )
        );
      }
    };

    if (auth.currentUser) {
      fetchUserProfilePicture();
    }
  }, [auth.currentUser]);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=people&per_page=5`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();
      const photos = data.photos.map((photo) => ({
        id: photo.id.toString(),
        photoURL: photo.src.small,
        name: photo.photographer,
      }));
      dispatch(displayStatuses(photos));
    } catch (error) {
      console.error("Error fetching images from Pexels:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const displayFiveStatuses = [...filterForImages];

  const renderStatusItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.statusItem}>
        <Image
          source={{ uri: item.photoURL || "https://via.placeholder.com/150" }}
          style={styles.statusImage}
        />
        <Text style={styles.statusName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.statusContainer}>
      <View style={styles.addStatusContainer}>
        <Image source={{ uri: profilePicture }} style={styles.addStatusImage} />
        <View style={styles.addStatusIconWrapper}>
          <MaterialIcons name="add" size={16} color="#362F34" />
        </View>
        <Text style={styles.myStatusText}>My Status</Text>
      </View>
      <FlatList
        data={displayFiveStatuses}
        horizontal
        renderItem={renderStatusItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  addStatusContainer: {
    position: "relative",
    alignItems: "center",
    marginRight: 10,
  },
  addStatusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#24786D",
  },
  addStatusIconWrapper: {
    position: "absolute",
    bottom: 15,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  myStatusText: {
    marginTop: 4,
    fontSize: 12,
    color: "#fff",
  },
  statusItem: {
    alignItems: "center",
    marginRight: 10,
  },
  statusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#24786D",
  },
  statusName: {
    fontSize: 12,
    marginTop: 4,
    color: "#fff",
  },
});

export default StatusList;
