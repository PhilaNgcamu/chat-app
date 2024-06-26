import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../utils/scale";

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry = true,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={label === "Password" ? secureTextEntry : false}
        keyboardType={keyboardType}
        autoCapitalize={label === "Your email" ? "none" : "words"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#24786D",
    marginBottom: verticalScale(4),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#CDD1D0",
    paddingBottom: verticalScale(8),
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(16),
  },
});

export default InputField;
