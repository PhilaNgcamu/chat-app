import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { horizontalScale, verticalScale } from "../../utils/scale";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "relative",
    bottom: verticalScale(61),
    left: horizontalScale(24),
  },
});

export default BackButton;
