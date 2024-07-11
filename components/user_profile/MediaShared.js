import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import styles from "./UserProfileStyles";

const MediaShared = ({ userId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storage = getStorage();
        const imagesRef = ref(storage, `chatImages/${userId}`);
        const result = await listAll(imagesRef);
        const urlPromises = result.items.map((itemRef) =>
          getDownloadURL(itemRef)
        );
        const urls = await Promise.all(urlPromises);
        setImages(urls);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, [userId]);

  const renderItem = ({ item, index }) => {
    if (index === 2 && images.length > 3) {
      return (
        <View style={styles.overlayContainer}>
          <Image source={{ uri: item }} style={styles.mediaShared} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>+{images.length - 3} more</Text>
          </View>
        </View>
      );
    }
    return <Image source={{ uri: item }} style={styles.mediaShared} />;
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Media Shared</Text>
      <TouchableOpacity>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
      <FlatList
        data={images.slice(0, 3)}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageList}
      />
    </View>
  );
};

export default MediaShared;
