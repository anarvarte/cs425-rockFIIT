import React from "react";
import { View, Text, Button, StyleSheet, Route } from "react-native";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.accountHeader}>User Account</Text>
      <Text>User Name: Test User~{"\n"}</Text>
      <Text>Email: testuser@gmail.com~{"\n"}</Text>
      <Button title="Change Password" onPress={() => alert("Password Change Request Email Sent!")} />
      <Text>{"\n"}{"\n"}</Text>
      <Button title="Log Out" onPress={() => alert("You have now been logged out!")} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },

  accountHeader: {
      fontSize: '14px',
      fontWeight: 'bold',
  }
});