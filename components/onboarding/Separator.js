import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../../utils/scale";

const Separator = () => {
  return (
    <View style={styles.separator}>
      <View style={styles.line} />
      <Text style={styles.orText}>OR</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: verticalScale(20),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#CDD1D0",
  },
  orText: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Bold",
    color: "#D6E4E0",
    marginHorizontal: horizontalScale(15),
  },
});

export default Separator;
