import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { verticalScale, moderateScale } from "../../util/scale";

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
    color: "#24786D",
    marginBottom: verticalScale(4),
  },
  input: {
    borderColor: "#CDD1D0",
    borderBottomWidth: 1,
    padding: verticalScale(8),
    borderRadius: moderateScale(4),
  },
});

export default InputField;
