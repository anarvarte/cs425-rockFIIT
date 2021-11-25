import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Climbing from "./components/Climbing";
import Lifting from "./components/Lifting";
import Goals from "./components/Goals";

export default function App() {
  return (
    <View style={styles.screen}>
      <Text style={styles.logo}> rockFIIT </Text>
      <View />
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
  logo: {
    fontSize: 50,
    marginBottom: 80,
  },
  screen: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    padding: 100,
    //justifyContent: "center",
  },
  button: {
    //padding: 0,
    margin: 15,
    borderColor: "black",
    borderWidth: 2,
    width: "80%",
  },
});
