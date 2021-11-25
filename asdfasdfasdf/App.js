import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.button}>
        <Button title="Climbing" />
      </View>
      <View style={styles.button}>
        <Button title="Lifting" />
      </View>
      <View style={styles.button}>
        <Button title="Goals" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 0,
    margin: 15,
    borderColor: "black",
    borderWidth: 2,
    width: "50%",
  },
});
