import React, {useState} from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";

import DateTime from '../components/DateTime'
import Workouts from '../components/workoutsHome'
const homeImg = require('../assets/homeImg.png')


const HomeScreen = ({ navigation }) => {

  const [data, setData] = useState({});

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
