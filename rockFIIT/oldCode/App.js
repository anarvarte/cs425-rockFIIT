import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Climbing from "./components/Climbing";
import Lifting from "./components/Lifting";
import Goals from "./components/Goals";

export default function App() {
  const [climbVis, setClimbVis] = useState(false);
  const [liftVis, setLiftVis] = useState(false);
  const [goalVis, setGoalVis] = useState(false);

  const backHandler = () => {
    setClimbVis(false);
    setLiftVis(false);
    setGoalVis(false);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.logo}> rockFIIT </Text>
      <View />
      <View style={styles.button}>
        <Button title="Climbing" onPress={() => setClimbVis(true)} />
        <Climbing vis={climbVis} onBack={backHandler} />
      </View>
      <View style={styles.button}>
        <Button title="Lifting" onPress={() => setLiftVis(true)} />
        <Lifting vis={liftVis} onBack={backHandler} />
      </View>
      <View style={styles.button}>
        <Button title="Goals" onPress={() => setGoalVis(true)} />
        <Goals vis={goalVis} onBack={backHandler} />
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
