import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { horizontalScale, moderateScale } from "../../utils/scale";

const Description = () => {
  return (
    <View>
      <Text style={styles.description}>
        Our chat app is the perfect way to stay
      </Text>
      <Text style={styles.description}>connected with friends and family.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(10),
    color: "#FFFFFF",
  },
});

export default Description;
