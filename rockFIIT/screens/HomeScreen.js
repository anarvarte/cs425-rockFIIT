import React, {useState} from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';

const HomeScreen = ({ navigation }) => {

  const[item, setItem] = useState('');

  async function loadUser(){
    var result = await database.getExerciseValues();
    console.log('LOADUSER: ' + result);
    setItem(result);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Click" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
