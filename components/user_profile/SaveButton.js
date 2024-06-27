import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const SaveButton = ({ handleSave }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleSave}>
      <Text style={styles.buttonText}>Save Changes</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
