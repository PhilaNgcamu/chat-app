import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { horizontalScale, verticalScale } from "../../utils/scale";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.icon}>
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: verticalScale(61),
    left: horizontalScale(24),
    color: "#000E08",
  },
});

export default BackButton;
