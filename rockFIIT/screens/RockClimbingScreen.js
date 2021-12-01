import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const RockClimbingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Rock Climbing Screen</Text>
      <Button title="Click" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default RockClimbingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
