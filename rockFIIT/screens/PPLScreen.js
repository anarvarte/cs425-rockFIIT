import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Styles,
} from "react-native";

import styled from "styled-components";
import AddExercise from "../components/AddExercise";
import DefaultList from "../components/DefaultList";
import DefaultExercise from "../components/DefaultExercise";

const PPLScreen = ({ navigation }) => {
    const [isVisible, setisVisible] = useState(false);

  const [data, setData] = useState([]);
  const submitHandler = (value) => {
    setData((prevTodo) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };
  const deleteItem = (key) => {
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  
  const [exerciseObjectList, setExerciseObjectList] = useState([]);

  function getExercises(){
        fetch('http://172.27.32.199:5000/exercises').then(response => response.json().then(data => {
          setExerciseObjectList(data.data);
          for(var i = 0; i < data.data.length ; i++){
            exerciseObjectList[i] = data.data[i];
          }
        }))
  }

  useEffect(() => {
    getExercises();
  }, [])
  

  return (
    <ComponentContainer>
      <View style={styles.headerContainer}>
        <HeaderText style={styles.programHeader}>Push/Pull/Legs Split</HeaderText>
        <Text style={styles.exerciseGroup}>Push</Text>
        <DefaultExercise exerciseName={'Barbell Bench Press'} sets={exerciseObjectList[6][4]} reps={exerciseObjectList[6][5]}/>
        <DefaultExercise exerciseName={'DB Shoulder Press'} sets={4} reps={6} />
        <DefaultExercise exerciseName={'Incline DB Press'} sets={4} reps={8}/>
        <DefaultExercise exerciseName={'Tricep Overhead Press'} sets={4} reps={12} />
        <Text style={styles.exerciseGroup}>Pull</Text>
        <DefaultExercise exerciseName={'Bent-Over Rows'} sets={3} reps={8} />
        <DefaultExercise exerciseName={'Pull Ups'} sets={3} reps={6}/>
        <DefaultExercise exerciseName={'Barbell Shrugs'} sets={4} reps={8}/>
        <DefaultExercise exerciseName={'DB Bicep Curl'} sets={4} reps={10}/>
        {/*
        <Text style={styles.exerciseGroup}>Legs</Text>
        <DefaultExercise exerciseName={'Back Squats'} sets={3} reps={8} />
        <DefaultExercise exerciseName={'Leg Press'} sets={4} reps={8}/>
        <DefaultExercise exerciseName={'Weighted Calf Raises'} sets={4} reps={15}/>
        <DefaultExercise exerciseName={'Hanging Leg Raise'} sets={4} reps={10}/>
      */}
      </View>
      <View style={{ top: 250, right:25}}>
        <AddExercise navigation={navigation}/>
            </View>

      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({  }) => (
            <DefaultList item={'Bench Press'} deleteItem={deleteItem} navigation={navigation}/>
          )}
        />
        
        <AddExercise navigation={navigation}/>
          </View>
    </ComponentContainer>
  );
};

const HeaderText = styled.Text`
  color: white;
  
  font-size: 30px;
  margin-top: 50px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#097392",
  },
  headerContainer:{
    marginTop:250,
  },
  programHeader:{
    fontWeight:'bold',
    color:'black',
    marginTop:520,
    marginBottom:15,
  },
  exerciseGroup:{
    fontStyle:'italic',
    fontWeight: 'bold',
    color:'black',
    textDecorationLine: 'underline',
    fontSize:25,
    marginTop:20,
  },
});
const ComponentContainer = styled.View`
  background-color: #097392;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default PPLScreen;
