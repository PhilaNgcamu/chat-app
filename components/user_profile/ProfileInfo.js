import React from "react";
import { View, Text, TextInput } from "react-native";
import { moderateScale } from "../../utils/scale";
import styles from "./UserProfileStyles";

const ProfileInfo = ({
  name,
  setName,
  email,
  setEmail,
  statusMessage,
  setStatusMessage,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#AAAAAA"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#AAAAAA"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          value={statusMessage}
          onChangeText={setStatusMessage}
          placeholder="Enter a status message"
          placeholderTextColor="#AAAAAA"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber
            .replace(/\D+/g, "")
            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
          placeholderTextColor="#AAAAAA"
        />
      </View>
    </>
  );
};

export default ProfileInfo;
