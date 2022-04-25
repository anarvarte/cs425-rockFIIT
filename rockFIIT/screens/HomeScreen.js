import React, {useState} from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import styled from "styled-components";


import DateTime from '../components/DateTime';
import Workouts from '../components/workoutsHome';

import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';

import PureChart from 'react-native-pure-chart';
import { UserObject } from "../user_object/UserObject";

const homeImg = require("../assets/homeImg.png");

const HomeScreen = ({propName}) => {
  const [item, setItem] = useState("");
  const [data, setData] = useState({});

  var user = propName.currentUser;
  console.log('route.params are ' + user);
  var exerciseLogs = UserObject.exerciseLogTest;

  let graphData = [];
  let specificExercises = [];
  let dropDownExercises = [];

  function getSpecificExercise(exercise){
    for(var i = 0; i < exerciseLogs.length ; i++){
      if(exerciseLogs[i][2] == exercise){
        var obj = {};
        obj['exercise'] = UserObject.getExerciseFromId(exercise);
        obj['date'] = exerciseLogs[i][7];
        obj['weight'] = exerciseLogs[i][5];
        specificExercises.push(obj);
      }
    }
  }

  function loadGraphData(exercise){
    getSpecificExercise(exercise);
    for(var i = 0; i < specificExercises.length ; i++){
      var obj = {};
      obj['x'] = specificExercises[i]['date'];
      obj['y'] = specificExercises[i]['weight'];
      graphData.push(obj);
    }
  }

  loadGraphData(0);
  /*
  graphData = [
    { x: "May", y: 215 },
    { x: "June", y: 245 },
    { x: "July", y: 265 },
    { x: "August", y: 300 },
    { x: "September", y: 315 },
    { x: "October", y: 330 },
  ];
  */
  

  return (
    <View style={styles.container}>
      <ImageBackground source={homeImg} style={styles.image}>

        <View style={styles.header}>
            <View style={{marginTop: 40, marginLeft:10}}>
            <Text style={{color: 'grey', fontSize:20}}>Welcome,</Text>
            <Text style={{color: 'black', fontSize: 28, fontWeight: 'bold'}}>
              
            </Text>
          </View>
          <DateTime current={data.current} timezone={data.timezone} />
        </View>

        <View style={styles.graph}>
          <PureChart data={graphData} type="line" height={100} />
          <View>
            <TextItem style={{backgroundColor:'rgba(52, 52, 52, 0)', textAlign:'center', marginTop:10}}> Back Squat Max  </TextItem>
          </View>
        </View>

        <Workouts workoutData={data.daily} />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    fontFamily: 'Georgia',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  subheading: {
    fontSize: 25,
    color: "black",
    fontWeight: "300",
    fontFamily: "Georgia",
    marginBottom: 20,
  },
  graph: {
    flex: 0.5,
    justifyContent: "center",
    flexDirection: "column",
    height: 60,
    paddingBottom: 25,
  },
  calendar: {
    flex: 1.2,
    justifyContent: "center",
    flexDirection: "column",
    height: 70,
    paddingTop: 10
  }
});

const TextItem = styled.Text`
  color: black;
  width: 270px;
  height: auto;
  font-size: 20px;
  justify-content: center;
  background-color: white;
  width: 100%
  shadowColor: white;
  shadowRadius: 1000px;
  fontFamily: Georgia;
`;

const Logo = styled.Text`
  color: black;
  width: auto;
  height: auto;
  font-size: 50px;
  font-weight: bold;
  borderColor: yellow;
  justify-content: space-between;
  textShadowColor: rgb(255,255,255);
  textShadowRadius: 3px
  fontFamily: Georgia;
`