import React, {useState} from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import styled from "styled-components";


import DateTime from '../components/DateTime';
import Workouts from '../components/workoutsHome';

import useDatabase from '../components/UseDatabase';
import {database} from '../components/Database';
import { LongPressGestureHandler } from "react-native-gesture-handler";

import PureChart from 'react-native-pure-chart';
import Calendar from "../components/Calendar";

const homeImg = require("../assets/homeImg.png");

const HomeScreen = ({ navigation }) => {
  const [item, setItem] = useState("");

  const [data, setData] = useState({});

  async function loadUser() {
    var result = await database.getExerciseValues();
    console.log("LOADUSER: " + result);
    //setItem(result);
  }

  let sampleData = [
    { x: "May", y: 215 },
    { x: "June", y: 245 },
    { x: "July", y: 265 },
    { x: "August", y: 300 },
    { x: "September", y: 315 },
    { x: "October", y: 330 }
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={homeImg} style={styles.image}>
        <DateTime current={data.current} timezone={data.timezone} />

        <View style={styles.graph}>
          <View>
            <TextItem> Back Squat Max (by month): </TextItem>
          </View>
          <PureChart data={sampleData} type="line" height={100} />
        </View>

        <View style={styles.calendar}>
          <Calendar />
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  subheading: {
    fontSize: 25,
    color: "black",
    fontWeight: "300",
    fontFamily: "Georgia"
  },
  graph: {
    flex: 0.5,
    justifyContent: "center",
    flexDirection: "column",
    height: 60,
    paddingBottom: 25
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