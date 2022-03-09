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
      <ImageBackground source={homeImg} style={styles.image} >
        <DateTime current={data.current} timezone={data.timezone} />
        <Workouts workoutData={data.daily}/>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
